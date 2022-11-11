import * as axios from 'axios';
import { AxiosInstance, AxiosResponse } from 'axios';
import * as AxiosLogger from 'axios-logger';
import { getLD, getRD, getVersion, login } from './actions';
import { encodeAD, encodeLoginHash } from './encode';
import { MC801ActionsLogger } from './logger';
import { ZTEMC801Action, ZTEMC801RouterExecutor } from './mc801-model';
import { asStringParameters } from './utils';

const assertActionType = (action: ZTEMC801Action) => {
  if (['get', 'set'].includes(action.type)) {
    return;
  }

  throw new Error('Unspecified action type');
};

export const createActionExecutor = (
  host: string,
  isTest = true,
  logger?: MC801ActionsLogger
): ZTEMC801RouterExecutor => new ZTEMC801Executor(host, isTest, logger);

class ZTEMC801Executor implements ZTEMC801RouterExecutor {
  readonly #instance: AxiosInstance;
  readonly #isTest: boolean = true;
  readonly #logger: MC801ActionsLogger | undefined;

  #cookie = '';
  #version = '';

  constructor(host: string, isTest: boolean, logger?: MC801ActionsLogger) {
    const baseURL = `http://${host}`;
    this.#isTest = isTest;
    this.#logger = logger;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.#instance = axios.create({
      baseURL,
      headers: { Referer: `${baseURL}/`, Host: host },
    });

    this.#instance.interceptors.request.use((request) =>
      AxiosLogger.requestLogger(request, {
        prefixText: 'your prefix',
        dateFormat: 'HH:MM:ss',
        headers: true,
      })
    );
  }

  async connect(password: string): Promise<ZTEMC801RouterExecutor> {
    const ld = await this.execute<string>(getLD());
    this.#cookie = await this.execute(
      login({
        password: encodeLoginHash(password, ld),
      })
    );
    this.#version = await this.execute(getVersion());

    return this;
  }

  async execute<T>(action: ZTEMC801Action): Promise<T> {
    assertActionType(action);

    const config = {
      ...(action.config || {}),
      headers: { cookie: this.#cookie },
    };

    const response: AxiosResponse = await {
      set: () =>
        this.#executePOSTRequest(
          {
            goformId: action.name,
            ...(action.parameters || {}),
          },
          config
        ),
      get: () =>
        this.#executeGETRequest(
          {
            cmd: action.name,
            ...(action.parameters || {}),
          },
          { config }
        ),
    }[action.type]();

    this.#log(response);

    return action.responseMapper ? action.responseMapper(response) : response;
  }

  async #executePOSTRequest(
    actionParameters: any,
    config = {}
  ): Promise<AxiosResponse> {
    const RD = await this.execute<string>(getRD());

    return this.#instance.post(
      '/goform/goform_set_cmd_process',
      asStringParameters({
        isTest: this.#isTest,
        AD: encodeAD(this.#version, RD),
        ...actionParameters,
      }),
      config
    );
  }

  #executeGETRequest(
    actionParameters: any,
    config = {}
  ): Promise<AxiosResponse> {
    return this.#instance.get(
      `/goform/goform_get_cmd_process?${asStringParameters({
        isTest: this.#isTest,
        ...actionParameters,
      })}`,
      config
    );
  }

  #log(response: AxiosResponse) {
    if (this.#logger?.log && response) {
      this.#logger.log(response);
    }
  }
}

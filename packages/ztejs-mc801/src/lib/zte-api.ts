import { changeToLTE, changeToWCDMA, disconnectNetwork } from './actions';
import { ZTEMC801RouterExecutor, ZTESetAction } from './mc801-model';

export class ZteApi {
  readonly #executor: ZTEMC801RouterExecutor;

  private constructor(executor: ZTEMC801RouterExecutor) {
    this.#executor = executor;
  }

  async disconnectNetwork() {
    const action: ZTESetAction = disconnectNetwork();
    await this.#executor.execute(action);

    return this;
  }

  async changeWCDMA() {
    const action = changeToWCDMA();
    await this.#executor.execute(action);

    return this;
  }

  async changeLTE() {
    const action: ZTESetAction = changeToLTE();
    await this.#executor.execute(action);

    return this;
  }

  static async initiateApi(executor: ZTEMC801RouterExecutor, password: string) {
    return new ZteApi(await executor.connect(password));
  }
}

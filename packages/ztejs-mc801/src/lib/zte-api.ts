import {
  connectNetwork,
  disconnectNetwork,
  set5GNonStandaloneNetwork,
  set5GStandaloneNetwork,
  setAllNetworks,
  setOnlyLTENetwork,
  setOnlyWCDMANetwork,
} from './actions';

import { ZTEMC801RouterExecutor } from './mc801-model';

export class ZteApi {
  readonly #executor: ZTEMC801RouterExecutor;

  private constructor(executor: ZTEMC801RouterExecutor) {
    this.#executor = executor;
  }

  /*
   * MC801 Connect actions
   *
   * */

  async connectNetwork() {
    await this.#executor.execute(connectNetwork());

    return this;
  }

  async disconnectNetwork(): Promise<ZteApi> {
    await this.#executor.execute(disconnectNetwork());

    return this;
  }

  /*
   * MC801 Bearer Network actions
   *
   * */

  async setOnlyWCDMANetwork(): Promise<ZteApi> {
    await this.#executor.execute(setOnlyWCDMANetwork());

    return this;
  }

  async setOnlyLTENetwork(): Promise<ZteApi> {
    await this.#executor.execute(setOnlyLTENetwork());

    return this;
  }

  async set5GStandaloneNetwork(): Promise<ZteApi> {
    await this.#executor.execute(set5GStandaloneNetwork());

    return this;
  }

  async set5GNonStandaloneNetwork(): Promise<ZteApi> {
    await this.#executor.execute(set5GNonStandaloneNetwork());

    return this;
  }

  async setAllNetworks(): Promise<ZteApi> {
    await this.#executor.execute(setAllNetworks());

    return this;
  }

  static async initiateApi(executor: ZTEMC801RouterExecutor, password: string) {
    return new ZteApi(await executor.connect(password));
  }
}

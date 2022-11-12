import {
  createActionExecutor,
  ZteApi,
  ZTEMC801RouterExecutor,
} from '@ztejs/mc801';

const HOST = process.env.ZTE_ROUTER_HOST;

const executor: ZTEMC801RouterExecutor = createActionExecutor(HOST, true, {
  log: (response) => console.info(response.data),
});

const start = async () => {
  const api = await ZteApi.initiateApi(
    executor,
    process.env.ZTE_ROUTER_PASSWORD || ''
  );

  await api.setAllNetworks()
};

start().catch((error) => console.error(error));

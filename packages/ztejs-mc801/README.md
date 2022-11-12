# Light JS API for Router Huawei MC801

It provides to execute commands on MC801 through HTTP transport

```
const executor: ZTEMC801RouterExecutor = createActionExecutor(HOST);
const api = await ZteApi.initiateApi(executor, PASSWORD);

// Disconnect network
api.disconnectNetwork();

// Connect network
api.connectNetwork()

// For automatically LTE Only Mode
api.setOnlyLTENetwork();

// For automatically WCDM Only Mode
api.setOnlyWCDMANetwork();

// For automatically 5G Standalone Mode
api.set5GStandaloneNetwork();

```

For the time being it's only PoC for private purpose, but if you have some question or want to participate in, please do not hesitate.

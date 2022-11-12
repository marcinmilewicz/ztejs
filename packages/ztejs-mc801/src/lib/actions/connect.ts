import { ZTESetAction } from './../mc801-model';

export const connectNetwork = (): ZTESetAction => ({
  name: 'CONNECT_NETWORK',
  type: 'set',
  parameters: { notCallback: true },
});

export const disconnectNetwork = (): ZTESetAction => ({
  name: 'DISCONNECT_NETWORK',
  type: 'set',
  parameters: { notCallback: true },
});

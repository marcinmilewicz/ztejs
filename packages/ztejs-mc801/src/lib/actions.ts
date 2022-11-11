import { ZTEGetAction, ZTESetAction } from '@ztejs/mc801';

export const changeToWCDMA = (): ZTESetAction => ({
  name: 'SET_BEARER_PREFERENCE',
  type: 'set',
  parameters: {
    notCallback: true,
    BearerPreference: 'Only_WCDMA',
  },
});
export const changeToLTE = (): ZTESetAction => ({
  name: 'SET_BEARER_PREFERENCE',
  type: 'set',
  parameters: {
    notCallback: true,
    BearerPreference: 'Only_LTE',
  },
});

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

export const login = (parameters: any): ZTESetAction => ({
  name: 'LOGIN',
  type: 'set',
  parameters,
  responseMapper: (response: any) => response.headers['set-cookie']?.[0],
});

export const getRD = (): ZTEGetAction => ({
  name: 'RD',
  type: 'get',
  responseMapper: (response: any) => response.data.RD,
});

export const getVersion = (): ZTEGetAction => ({
  name: 'wa_inner_version',
  type: 'get',
  responseMapper: (response: any) => response.data.wa_inner_version,
});

export const getLD = (): ZTEGetAction => ({
  name: 'LD',
  type: 'get',
  responseMapper: (response: any) => response.data.LD,
});

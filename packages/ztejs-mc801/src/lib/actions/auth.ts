import { ZTEGetAction, ZTESetAction } from './../mc801-model';

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

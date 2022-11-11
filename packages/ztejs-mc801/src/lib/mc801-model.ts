import { ZTERouterExecutor } from '@ztejs/core';
import { AxiosResponse } from 'axios';

export type ZTEMC801Action = ZTEGetAction | ZTESetAction;
export type ZTEGetAction = ZTEAction<'get'>;
export type ZTESetAction = ZTEAction<'set'>;
type WithdrawActionName<ActionType> = ActionType extends 'get'
  ? ZTEMC801GetActionName
  : ActionType extends 'set'
  ? ZTEMC801SetActionName
  : never;

export type ZTEAction<ActionType> = {
  type: ActionType;
  name: WithdrawActionName<ActionType>;
  parameters?: any;
  config?: any;
  responseMapper?: any;
};

export type ZTEMC801RouterExecutor = ZTERouterExecutor<
  ZTEAction<'get' | 'set'>,
  AxiosResponse
>;
export type ZTEMC801GetActionName = 'wa_inner_version' | 'LD' | 'RD';
export type ZTEMC801SetActionName =
  | 'CONNECT_NETWORK'
  | 'DISCONNECT_NETWORK'
  | 'LOGIN'
  | 'SET_BEARER_PREFERENCE';

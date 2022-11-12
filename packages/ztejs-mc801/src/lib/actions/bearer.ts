import { ZTESetAction } from './../mc801-model';

const createBearerAction = (parameters: any) => (): ZTESetAction => ({
  name: 'SET_BEARER_PREFERENCE',
  type: 'set',
  parameters: {
    ...parameters,
    notCallback: true,
  },
});

export const setOnlyWCDMANetwork: () => ZTESetAction = createBearerAction({
  BearerPreference: 'Only_WCDMA',
});

export const setOnlyLTENetwork: () => ZTESetAction = createBearerAction({
  BearerPreference: 'Only_LTE',
});

export const set5GStandaloneNetwork: () => ZTESetAction = createBearerAction({
  BearerPreference: 'Only_5G',
});

export const set5GNonStandaloneNetwork: () => ZTESetAction = createBearerAction({
  BearerPreference: 'LTE_AND_5G',
});

export const setAllNetworks: () => ZTESetAction = createBearerAction({
  BearerPreference: 'WL_AND_5G',
});

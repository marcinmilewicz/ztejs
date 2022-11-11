import { AxiosResponse } from 'axios';

export interface MC801ActionsLogger {
  log(input: AxiosResponse): void;
}

import type {ILogger} from 'yeelight-awesome/lib/models/logger';

export const logger: ILogger = {
  debug: console.debug,
  error: console.error,
  info:  console.info,
  log:  console.log,
};

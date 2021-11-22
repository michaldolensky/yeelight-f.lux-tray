import type {IDevice} from 'yeelight-awesome';
import {Discover, Yeelight} from 'yeelight-awesome';
import type {ILogger} from 'yeelight-awesome/lib/models/logger';

export const logger: ILogger = {
  debug: console.debug,
  error: console.error,
  info:  console.info,
  log:  console.log,
};


export const getYeelightDevices = async () => {
  const discover = new Discover({debug: true, timeout: 5000}, logger);
  const devices: IDevice[] = await discover.start();

  const yeelightArray: Yeelight[] = devices.map((device) => {
    return new Yeelight({lightIp: device.host, lightPort: device.port});
  });
  return {yeelights: yeelightArray, discover: discover};
};

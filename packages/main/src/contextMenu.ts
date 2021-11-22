import {app, Menu, nativeImage} from 'electron';
import {CtScene} from 'yeelight-awesome';
import {yeelightArray} from '/@/index';

import toggleIcon from '../assets/icons/IEC5010_On_Off_Symbol.png';
import turnOffIcon from '../assets/icons/IEC5009_Standby_Symbol.png';
import moonIcon from '../assets/icons/moon.png';
import sunriseIcon from '../assets/icons/sunrise_1f305.png';

const iconSize = 48;


export const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Toggle',
    icon: nativeImage.createFromDataURL(toggleIcon).resize({height: iconSize}),
    click: async () => {
      try {
        for (const yeelight of yeelightArray) {
          await yeelight.connect();
          await yeelight.toggle();
          await yeelight.disconnect();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  {
    label: 'Day',
    icon: nativeImage.createFromDataURL(sunriseIcon).resize({height: iconSize}),
    click: async () => {
      try {
        for (const yeelight of yeelightArray) {
          await yeelight.connect();
          await yeelight.setScene(new CtScene(6500, 100));
          await yeelight.setPower(true, 'smooth');
          await yeelight.disconnect();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  {
    label: 'Night',
    icon: nativeImage.createFromDataURL(moonIcon).resize({height: iconSize}),
    click: async () => {
      try {
        for (const yeelight of yeelightArray) {
          await yeelight.connect();
          await yeelight.setScene(new CtScene(1700, 20));
          await yeelight.setPower(true, 'smooth');
          await yeelight.disconnect();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  {
    label: 'Exit',
    icon: nativeImage.createFromDataURL(turnOffIcon).resize({height: iconSize}),
    click: () => {
      app.quit();
    },
  },
]);

import {app, Menu} from 'electron';
import {CtScene} from 'yeelight-awesome';
import {yeelightArray} from '/@/index';
import {getMenuIcon} from '/@/utils/getIcons';

export const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Toggle',
    icon: getMenuIcon('IEC5010_On_Off_Symbol.png'),
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
    icon: getMenuIcon('sunrise_1f305.ico'),
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
    icon: getMenuIcon('moon.ico'),
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
    icon: getMenuIcon('IEC5009_Standby_Symbol.png'),
    click: () => {
      app.quit();
    },
  },
]);

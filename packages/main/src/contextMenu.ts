import {app, Menu, nativeImage} from 'electron';
import {getYeelightDevices} from '/@/getYeelightDevices';
import {CtScene} from 'yeelight-awesome';

const iconSize = 45;

export const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Toggle',
    icon: nativeImage.createFromPath(process.resourcesPath + '/icons/IEC5010_On_Off_Symbol.png').resize({height: iconSize}),
    click: async () => {
      try {
        const YeelightDevices = await getYeelightDevices();
        const {yeelights, discover} = YeelightDevices;

        for (const yeelight of yeelights) {
          await yeelight.connect();
          await yeelight.toggle();
          await yeelight.disconnect();
          await discover.destroy();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  {
    label: 'Day',
    icon: nativeImage.createFromPath('./resources/icons/sunrise_1f305.ico').resize({height: iconSize}),
    click: async () => {
      try {
        const YeelightDevices = await getYeelightDevices();
        const {yeelights, discover} = YeelightDevices;
        for (const yeelight of yeelights) {
          await yeelight.connect();
          await yeelight.setScene(new CtScene(6500, 100));
          await yeelight.setPower(true, 'smooth');
          await yeelight.disconnect();
          await discover.destroy();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  {
    label: 'Night',
    icon: nativeImage.createFromPath('./resources/icons/moon.ico').resize({height: iconSize}),
    click: async () => {
      const YeelightDevices = await getYeelightDevices();
      const {yeelights, discover} = YeelightDevices;
      for (const yeelight of yeelights) {
        await yeelight.connect();
        await yeelight.setScene(new CtScene(1700, 20));
        await yeelight.setPower(true, 'smooth');
        await yeelight.disconnect();
        await discover.destroy();
      }
    },
  },
  {
    label: 'Exit',
    icon: nativeImage.createFromPath('./resources/icons/IEC5009_Standby_Symbol.png').resize({height: iconSize}),
    click: () => {
      app.quit();
    },
  },
]);

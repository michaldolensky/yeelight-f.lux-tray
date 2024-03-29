import {app, nativeImage, Tray} from 'electron';
import {contextMenu} from '/@/contextMenu';
import {Discover, Yeelight} from 'yeelight-awesome';
import {logger} from '/@/Logger';

import appIcon from '../assets/icons/icon.png';


const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

export let yeelightArray: Yeelight[] = [];

const discover = new Discover({debug: import.meta.env.DEV, timeout: 1000}, logger);

discover
  .start()
  .then((devices) => {
    logger.info('found devices: ', devices);

    yeelightArray = devices.map((device) => {
      return new Yeelight({lightIp: device.host, lightPort: device.port});
    });
  })
  .catch((e) => {
    logger.error(e);
    discover.destroy();
  });

let tray: Tray | null = null;
const initTray = async () => {
  tray = new Tray(nativeImage.createFromDataURL(appIcon));
  tray.setContextMenu(contextMenu);
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  void discover.destroy();
});

app.whenReady()
  .then(initTray)
  .catch((e) => console.error('Failed create tray:', e));

// Auto-updates
if (import.meta.env.PROD) {
  app.whenReady()
    .then(() => import('electron-updater'))
    .then(({autoUpdater}) => {
      autoUpdater.on('update-downloaded',() => {
        autoUpdater.quitAndInstall();
      });
      return autoUpdater.checkForUpdatesAndNotify();
    })
    .catch((e) => console.error('Failed check updates:', e));
}


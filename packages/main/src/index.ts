import {app, Tray} from 'electron';
import {contextMenu} from '/@/contextMenu';
import {Discover, Yeelight} from 'yeelight-awesome';
import {logger} from '/@/Logger';
import {getMenuIcon} from '/@/utils/getIcons';

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

export let yeelightArray: Yeelight[] = [];

const discover = new Discover({debug: import.meta.env.DEV, timeout: 5000}, logger);

discover
  .start()
  .then((devices) => {
    logger.info('found device: ', devices);

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
  tray = new Tray(getMenuIcon('icon.png'));
  tray.setContextMenu(contextMenu);
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady()
  .then(initTray)
  .catch((e) => console.error('Failed create tray:', e));

// Auto-updates
if (import.meta.env.PROD) {
  app.whenReady()
    .then(() => import('electron-updater'))
    .then(({autoUpdater}) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error('Failed check updates:', e));
}


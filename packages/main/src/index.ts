import {app, nativeImage, Tray} from 'electron';
import {contextMenu} from '/@/contextMenu';

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

let tray: Tray | null = null;
const initTray = async () => {
  tray = new Tray(nativeImage.createFromPath('./resources/icons/icon.png'));
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


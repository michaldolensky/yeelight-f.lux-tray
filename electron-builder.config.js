if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date;
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  'productName': 'Yeelight f.lux tray',
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: [
    // 'packages/**/dist/**',
    'packages/main/dist/**',
  ],
  extraResources:[
    {
      'from': 'assets/icons/',
      'to': 'icons/',
      'filter': ['*.*', '!*.svg'],
    },
  ],
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
  },
};

module.exports = config;

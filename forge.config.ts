import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: `default-src *  data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval'; connect-src * data: blob: 'unsafe-inline';`,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './electron/renderer/main_window/index.html',
            js: './src/index.tsx',
            name: 'main_window',
            preload: {
              js: './electron/renderer/main_window/preload.ts',
            },
          },
          {
            html: './electron/renderer/oauth/index.html',
            js: '/electron/renderer/oauth/script.ts',
            name: 'oauth',
          },
        ],
      },
    }),
  ],
};

export default config;

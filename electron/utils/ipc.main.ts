import { ipcMain } from 'electron';

// webpack entry points
// https://www.electronforge.io/config/plugins/webpack#main-process-code
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const OAUTH_WEBPACK_ENTRY: string;

export const registerGetEntryIpc = () => {
  ipcMain.on('getEntry', (event) => {
    event.returnValue = {
      main_window: MAIN_WINDOW_WEBPACK_ENTRY,
      oauth: OAUTH_WEBPACK_ENTRY,
    };
  });
};

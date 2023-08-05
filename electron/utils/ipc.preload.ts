import { contextBridge, ipcRenderer } from 'electron';

const exposedGetEntryApi = {
  getEntry: () =>
    ipcRenderer.sendSync('getEntry') as {
      main_window: string;
      oauth: string;
    },
};

export type GetEntryExposedApi = typeof exposedGetEntryApi;

export const exposeGetEntryIpc = () => {
  contextBridge.exposeInMainWorld('electron', exposedGetEntryApi);
};

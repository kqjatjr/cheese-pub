import type { GetEntryExposedApi } from '$electron/utils/ipc.preload';

declare global {
  interface Window {
    electron: GetEntryExposedApi;
  }
  interface Instance {
    id: string;
    type: ServiceType;
    url: string;
    accessToken: string;
  }
  interface IAccount extends Entity.Account {
    instanceId: string;
  }
}

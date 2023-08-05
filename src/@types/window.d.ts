import type { GetEntryExposedApi } from '$electron/utils/ipc.preload';

declare global {
  interface Window {
    electron: GetEntryExposedApi;
  }
}

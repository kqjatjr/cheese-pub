import { RoutePaths } from 'src/routes/paths';

window.location.href = `${window.electron.getEntry().main_window}#${RoutePaths.SIGN_IN.CALLBACK}${
  window.location.search
}`;

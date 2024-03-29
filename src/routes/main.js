import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

const ThemeRoutesMain = () => {
  return useRoutes([MainRoutes, AuthenticationRoutes]);
};

export default ThemeRoutesMain;

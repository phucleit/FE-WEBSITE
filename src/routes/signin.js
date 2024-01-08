import { useRoutes } from 'react-router-dom';
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

const ThemeAuthenticationRoutes = () => {
  return useRoutes([AuthenticationRoutes, MainRoutes]);
};

export default ThemeAuthenticationRoutes;

import { useRoutes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

const ThemeRoutes = () => {
  const token = Cookies.get('token');
  const routes = token ? [MainRoutes] : [AuthenticationRoutes];

  return useRoutes([
    ...routes,
    { path: '/', element: token ? <Navigate to="/dashboard" /> : <Navigate to="/login" /> },
    { path: '*', element: <Navigate to="/" /> }
  ]);
};

export default ThemeRoutes;

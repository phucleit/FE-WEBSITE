import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';

const ThemeRoutesMain = () => {
  return useRoutes([MainRoutes]);
};

export default ThemeRoutesMain;
// import { useRoutes } from 'react-router-dom';

// // routes
// import MainRoutes from './MainRoutes';
// import AuthenticationRoutes from './AuthenticationRoutes';

// // ==============================|| ROUTING RENDER ||============================== //

// export default function ThemeRoutes() {
//   return useRoutes([MainRoutes, AuthenticationRoutes]);
// }

import { useRoutes } from 'react-router-dom';
import AuthenticationRoutes from './AuthenticationRoutes';

const ThemeRoutesSignin = () => {
  return useRoutes([AuthenticationRoutes]);
};

export default ThemeRoutesSignin;

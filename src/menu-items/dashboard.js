// assets
import { IconLayoutBoardSplit } from '@tabler/icons';

// constant
const icons = { IconLayoutBoardSplit };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Tổng quát',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconLayoutBoardSplit,
      breadcrumbs: false
    },
    {
      id: 'qrcode',
      title: 'QRCode',
      type: 'item',
      url: '/dashboard/qrcode',
      icon: icons.IconLayoutBoardSplit,
      breadcrumbs: false
    }
  ]
};

export default dashboard;

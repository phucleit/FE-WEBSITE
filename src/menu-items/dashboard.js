// assets
import { IconLayoutBoardSplit } from '@tabler/icons';

// constant
const icons = { IconLayoutBoardSplit };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'trang-chu',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Tổng quát',
      type: 'item',
      url: '/trang-chu',
      icon: icons.IconLayoutBoardSplit,
      breadcrumbs: false
    }
  ]
};

export default dashboard;

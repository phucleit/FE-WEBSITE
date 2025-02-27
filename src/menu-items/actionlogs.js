// assets
import { IconBellRinging } from '@tabler/icons';

// constant
const icons = { IconBellRinging };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const actionlogs = {
  id: 'actionlogs-scloud',
  type: 'group',
  children: [
    {
      id: 'lich-su-thao-tac',
      title: 'Lịch sử thao tác',
      type: 'item',
      url: '/trang-chu/lich-su-thao-tac/danh-sach',
      icon: icons.IconBellRinging,
      breadcrumbs: false
    }
  ]
};

export default actionlogs;

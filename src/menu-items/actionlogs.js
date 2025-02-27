// assets
import { IconBellRinging } from '@tabler/icons';

// constant
const icons = { IconBellRinging };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const actionlogs = {
  id: 'actionlogs-scloud',
  title: 'Lịch Sử Thao Tác - Scloud',
  type: 'group',
  children: [
    {
      id: 'danh-sach-lich-su-thao-tac',
      title: 'Lịch sử thao tác',
      type: 'item',
      url: '/trang-chu/danh-sach-lich-su-thao-tac',
      icon: icons.IconBellRinging,
      breadcrumbs: false
    }
  ]
};

export default actionlogs;

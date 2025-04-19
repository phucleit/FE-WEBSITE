// assets
import { IconDatabaseExport } from '@tabler/icons';

// constant
const icons = { IconDatabaseExport };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const backups = {
  id: 'backups-scloud',
  type: 'group',
  children: [
    {
      id: 'sao-luu-du-lieu',
      title: 'Sao lưu dữ liệu',
      type: 'item',
      url: '/trang-chu/sao-luu-du-lieu/danh-sach',
      icon: icons.IconDatabaseExport,
      breadcrumbs: false
    }
  ]
};

export default backups;

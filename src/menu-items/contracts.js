// assets
import { IconDatabaseImport } from '@tabler/icons';

// constant
const icons = {
  IconDatabaseImport
};

const contracts = {
  id: 'contracts-scloud',
  title: 'Hợp đồng - Scloud',
  type: 'group',
  children: [
    {
      // id: 'contracts',
      id: 'authentication',
      title: 'Hợp đồng',
      type: 'collapse',
      icon: icons.IconDatabaseImport,
      children: [
        {
          id: 'danh-sach-hop-dong',
          title: 'Danh sách',
          type: 'item',
          url: '/trang-chu/hop-dong/danh-sach-hop-dong',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default contracts;

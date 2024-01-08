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
      id: 'contracts',
      title: 'Hợp đồng',
      type: 'collapse',
      icon: icons.IconDatabaseImport,
      children: [
        {
          id: 'list-contracts',
          title: 'Danh sách',
          type: 'item',
          url: '/dashboard/contracts/list-contracts',
          breadcrumbs: false
        },
        {
          id: 'add-contracts',
          title: 'Thêm mới',
          type: 'item',
          url: '/dashboard/contracts/add-contracts',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default contracts;

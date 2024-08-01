// assets
import { IconBusinessplan } from '@tabler/icons';

// constant
const icons = {
  IconBusinessplan
};

const suppliers = {
  id: 'suppliers-scloud',
  title: 'Nhà cung cấp - Scloud',
  type: 'group',
  children: [
    {
      // id: 'suppliers',
      id: 'authentication',
      title: 'Nhà cung cấp',
      type: 'collapse',
      icon: icons.IconBusinessplan,
      children: [
        {
          id: 'list-suppliers',
          title: 'Danh sách nhà cung cấp',
          type: 'item',
          url: '/dashboard/suppliers/list-suppliers',
          breadcrumbs: false
        },
        {
          id: 'list-mobile-network',
          title: 'Danh sách nhà mạng',
          type: 'item',
          url: '/dashboard/suppliers/mobile-network/list-mobile-network',
          breadcrumbs: false
        },
        {
          id: 'list-server',
          title: 'Danh sách server',
          type: 'item',
          url: '/dashboard/suppliers/server/list-server',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default suppliers;

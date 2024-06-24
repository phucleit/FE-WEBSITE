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
      id: 'suppliers',
      title: 'Nhà cung cấp',
      type: 'collapse',
      icon: icons.IconBusinessplan,
      children: [
        {
          id: 'list-suppliers',
          title: 'Danh sách',
          type: 'item',
          url: '/dashboard/suppliers/list-suppliers',
          breadcrumbs: false
        },
        {
          id: 'add-suppliers',
          title: 'Thêm mới',
          type: 'item',
          url: '/dashboard/suppliers/add-suppliers',
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
          id: 'add-mobile-network',
          title: 'Thêm mới nhà mạng',
          type: 'item',
          url: '/dashboard/suppliers/mobile-network/add-mobile-network',
          breadcrumbs: false
        },
        {
          id: 'list-server',
          title: 'Danh sách server',
          type: 'item',
          url: '/dashboard/suppliers/server/list-server',
          breadcrumbs: false
        },
        {
          id: 'add-server',
          title: 'Thêm mới server',
          type: 'item',
          url: '/dashboard/suppliers/server/add-server',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default suppliers;

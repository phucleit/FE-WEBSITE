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
          url: '/suppliers/list-suppliers',
          breadcrumbs: false
        },
        {
          id: 'add-suppliers',
          title: 'Thêm mới',
          type: 'item',
          url: '/suppliers/add-suppliers',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default suppliers;

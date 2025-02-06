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
          id: 'danh-sach-nha-cung-cap',
          title: 'Danh sách nhà cung cấp',
          type: 'item',
          url: '/trang-chu/nha-cung-cap/danh-sach-nha-cung-cap',
          breadcrumbs: false
        },
        {
          id: 'danh-sach-nha-mang',
          title: 'Danh sách nhà mạng',
          type: 'item',
          url: '/trang-chu/nha-cung-cap/nha-mang/danh-sach-nha-mang',
          breadcrumbs: false
        },
        {
          id: 'dah-sach-server',
          title: 'Danh sách server',
          type: 'item',
          url: '/trang-chu/nha-cung-cap/server/danh-sach-server',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default suppliers;

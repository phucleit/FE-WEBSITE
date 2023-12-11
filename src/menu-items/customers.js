// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

const customers = {
  id: 'customers',
  title: 'Khách hàng - Scloud',
  type: 'group',
  children: [
    {
      id: 'khach-hang',
      title: 'Khách hàng',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'danh-sach',
          title: 'Danh sách',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'them-moi',
          title: 'Thêm mới',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default customers;

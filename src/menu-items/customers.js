// assets
import { IconUsers } from '@tabler/icons';

// constant
const icons = {
  IconUsers
};

const customers = {
  id: 'customers-scloud',
  title: 'Khách hàng - Scloud',
  type: 'group',
  children: [
    {
      // id: 'customers',
      id: 'authentication',
      title: 'Khách hàng',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: 'danh-sach-khach-hang',
          title: 'Danh sách',
          type: 'item',
          url: '/trang-chu/khach-hang/danh-sach-khach-hang',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default customers;

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
      id: 'customers',
      title: 'Khách hàng',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: 'list-customers',
          title: 'Danh sách',
          type: 'item',
          url: '/dashboard/customers/list-customers',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default customers;

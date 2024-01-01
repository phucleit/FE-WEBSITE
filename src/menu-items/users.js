// assets
import { IconUserCircle } from '@tabler/icons';

// constant
const icons = {
  IconUserCircle
};

const users = {
  id: 'users-scloud',
  title: 'Tài khoản - Scloud',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Tài khoản',
      type: 'collapse',
      icon: icons.IconUserCircle,
      children: [
        {
          id: 'list-users',
          title: 'Danh sách',
          type: 'item',
          url: '/users/list-users',
          breadcrumbs: false
        },
        {
          id: 'add-users',
          title: 'Thêm mới',
          type: 'item',
          url: '/users/add-users',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default users;

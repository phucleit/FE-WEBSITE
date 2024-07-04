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
          title: 'Danh sách tài khoản',
          type: 'item',
          url: '/dashboard/users/list-users',
          breadcrumbs: false
        },
        {
          id: 'list-group-users',
          title: 'Nhóm người dùng',
          type: 'item',
          url: '/dashboard/users/list-group-users',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default users;

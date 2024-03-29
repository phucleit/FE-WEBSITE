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
          url: '/dashboard/users/list-users',
          breadcrumbs: false
        },
        {
          id: 'add-users',
          title: 'Thêm mới',
          type: 'item',
          url: '/dashboard/users/add-users',
          breadcrumbs: false
        },
        {
          id: 'list-group-users',
          title: 'Nhóm người dùng',
          type: 'item',
          url: '/dashboard/users/list-group-users',
          breadcrumbs: false
        },
        {
          id: 'add-group-users',
          title: 'Thêm nhóm người dùng',
          type: 'item',
          url: '/dashboard/users/add-group-users',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default users;

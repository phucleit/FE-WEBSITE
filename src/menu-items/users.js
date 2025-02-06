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
      // id: 'users',
      id: 'authentication',
      title: 'Tài khoản',
      type: 'collapse',
      icon: icons.IconUserCircle,
      children: [
        {
          id: 'danh-sach-tai-khoan',
          title: 'Danh sách tài khoản',
          type: 'item',
          url: '/trang-chu/tai-khoan/danh-sach-tai-khoan',
          breadcrumbs: false
        },
        {
          id: 'danh-sach-nhom',
          title: 'Nhóm người dùng',
          type: 'item',
          url: '/trang-chu/tai-khoan/danh-sach-nhom',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default users;

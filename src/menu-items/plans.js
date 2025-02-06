// assets
import { IconPlaylistAdd } from '@tabler/icons';

// constant
const icons = {
  IconPlaylistAdd
};

const plans = {
  id: 'plans-scloud',
  title: 'Đăng ký gói dịch vụ - Scloud',
  type: 'group',
  children: [
    {
      // id: 'plans',
      id: 'authentication',
      title: 'Gói dịch vụ',
      type: 'collapse',
      icon: icons.IconPlaylistAdd,
      children: [
        {
          id: 'ten-mien',
          title: 'Tên miền',
          type: 'item',
          url: '/trang-chu/goi-dich-vu/danh-sach-ten-mien',
          breadcrumbs: false
        },
        {
          id: 'hosting',
          title: 'Hosting',
          type: 'item',
          url: '/trang-chu/goi-dich-vu/danh-sach-hosting',
          breadcrumbs: false
        },
        {
          id: 'email',
          title: 'Email',
          type: 'item',
          url: '/trang-chu/goi-dich-vu/danh-sach-email',
          breadcrumbs: false
        },
        {
          id: 'ssl',
          title: 'SSL',
          type: 'item',
          url: '/trang-chu/goi-dich-vu/danh-sach-ssl',
          breadcrumbs: false
        },
        {
          id: 'content',
          title: 'Viết bài Content & PR',
          type: 'item',
          url: '/trang-chu/goi-dich-vu/danh-sach-content',
          breadcrumbs: false
        },
        {
          id: 'bao-tri',
          title: 'Bảo trì',
          type: 'item',
          url: '/trang-chu/goi-dich-vu/danh-sach-bao-tri',
          breadcrumbs: false
        },
        {
          id: 'server',
          title: 'Server',
          type: 'item',
          url: '/trang-chu/goi-dich-vu/danh-sach-server',
          breadcrumbs: false
        },
        {
          id: 'nha-mang',
          title: 'Nhà mạng',
          type: 'item',
          url: '/trang-chu/goi-dich-vu/danh-sach-nha-mang',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default plans;

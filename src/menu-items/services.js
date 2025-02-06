// assets
import { IconServerBolt } from '@tabler/icons';

// constant
const icons = {
  IconServerBolt
};

const services = {
  id: 'services-scloud',
  title: 'Dịch vụ - Scloud',
  type: 'group',
  children: [
    {
      // id: 'services',
      id: 'authentication',
      title: 'Dịch vụ',
      type: 'collapse',
      icon: icons.IconServerBolt,
      children: [
        {
          id: 'ten-mien',
          title: 'Tên miền',
          type: 'item',
          url: '/trang-chu/dich-vu/danh-sach-ten-mien',
          breadcrumbs: false
        },
        {
          id: 'hosting',
          title: 'Hostings',
          type: 'item',
          url: '/trang-chu/dich-vu/danh-sach-hosting',
          breadcrumbs: false
        },
        {
          id: 'email',
          title: 'Email',
          type: 'item',
          url: '/trang-chu/dich-vu/danh-sach-email',
          breadcrumbs: false
        },
        {
          id: 'ssl',
          title: 'SSL',
          type: 'item',
          url: '/trang-chu/dich-vu/danh-sach-ssl',
          breadcrumbs: false
        },
        {
          id: 'website',
          title: 'Thiết kế website',
          type: 'item',
          url: '/trang-chu/dich-vu/danh-sach-website',
          breadcrumbs: false
        },
        {
          id: 'content',
          title: 'Viết bài Content & PR',
          type: 'item',
          url: '/trang-chu/dich-vu/danh-sach-content',
          breadcrumbs: false
        },
        {
          id: 'toplist-',
          title: 'Toplist Vũng Tàu',
          type: 'item',
          url: '/trang-chu/dich-vu/danh-sach-toplist',
          breadcrumbs: false
        },
        {
          id: 'bao-tri',
          title: 'Bảo trì',
          type: 'item',
          url: '/trang-chu/dich-vu/danh-sach-bao-tri',
          breadcrumbs: false
        },
        {
          id: 'nha-mang',
          title: 'Nhà mạng',
          type: 'item',
          url: '/trang-chu/dich-vu/danh-sach-nha-mang',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default services;

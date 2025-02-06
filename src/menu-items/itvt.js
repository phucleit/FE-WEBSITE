// assets
import { IconBrandCodepen } from '@tabler/icons';

// constant
const icons = {
  IconBrandCodepen
};

const itvt = {
  id: 'itvt',
  title: 'Công ty IT Vũng Tàu',
  type: 'group',
  children: [
    {
      // id: 'customers',
      id: 'authentication',
      title: 'Thông tin',
      type: 'collapse',
      icon: icons.IconBrandCodepen,
      children: [
        {
          id: 'danh-sach-ten-mien-itvt',
          title: 'Tên miền',
          type: 'item',
          url: '/trang-chu/itvt/danh-sach-ten-mien-itvt',
          breadcrumbs: false
        },
        {
          id: 'danh-sach-ssl-itvt',
          title: 'SSL',
          type: 'item',
          url: '/trang-chu/itvt/danh-sach-ssl-itvt',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default itvt;

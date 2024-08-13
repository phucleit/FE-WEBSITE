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
          id: 'list-domain-itvt',
          title: 'Tên miền',
          type: 'item',
          url: '/dashboard/itvt/list-domain-itvt',
          breadcrumbs: false
        },
        {
          id: 'list-ssl-itvt',
          title: 'SSL',
          type: 'item',
          url: '/dashboard/itvt/list-ssl-itvt',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default itvt;

// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

const services = {
  id: 'services',
  title: 'Dịch vụ - Scloud',
  type: 'group',
  children: [
    {
      id: 'dich-vu',
      title: 'Dịch vụ',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'domain',
          title: 'Tên miền',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'hosting',
          title: 'Hostings',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'email',
          title: 'Email',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'ssl',
          title: 'SSL',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default services;

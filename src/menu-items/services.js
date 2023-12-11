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
      id: 'services',
      title: 'Dịch vụ',
      type: 'collapse',
      icon: icons.IconServerBolt,
      children: [
        {
          id: 'domain-services',
          title: 'Tên miền',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'hosting-services',
          title: 'Hostings',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'email-services',
          title: 'Email',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'ssl-services',
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

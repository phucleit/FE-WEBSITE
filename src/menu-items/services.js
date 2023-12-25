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
          url: '/services/list-domain',
          breadcrumbs: false
        },
        {
          id: 'hosting-services',
          title: 'Hostings',
          type: 'item',
          url: '/services/list-hosting',
          breadcrumbs: false
        },
        {
          id: 'email-services',
          title: 'Email',
          type: 'item',
          url: '/services/list-email',
          breadcrumbs: false
        },
        {
          id: 'ssl-services',
          title: 'SSL',
          type: 'item',
          url: '/services/list-ssl',
          breadcrumbs: false
        },
        {
          id: 'website-services',
          title: 'Thiết kế website',
          type: 'item',
          url: '/services/list-website',
          breadcrumbs: false
        },
        {
          id: 'content-services',
          title: 'Viết bài Content & PR',
          type: 'item',
          url: '/services/list-content',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default services;

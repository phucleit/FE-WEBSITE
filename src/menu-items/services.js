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
          url: '/dashboard/services/list-domain',
          breadcrumbs: false
        },
        {
          id: 'hosting-services',
          title: 'Hostings',
          type: 'item',
          url: '/dashboard/services/list-hosting',
          breadcrumbs: false
        },
        {
          id: 'email-services',
          title: 'Email',
          type: 'item',
          url: '/dashboard/services/list-email',
          breadcrumbs: false
        },
        {
          id: 'ssl-services',
          title: 'SSL',
          type: 'item',
          url: '/dashboard/services/list-ssl',
          breadcrumbs: false
        },
        {
          id: 'website-services',
          title: 'Thiết kế website',
          type: 'item',
          url: '/dashboard/services/list-website',
          breadcrumbs: false
        },
        {
          id: 'content-services',
          title: 'Viết bài Content & PR',
          type: 'item',
          url: '/dashboard/services/list-content',
          breadcrumbs: false
        },
        {
          id: 'toplist-services',
          title: 'Toplist Vũng Tàu',
          type: 'item',
          url: '/dashboard/services/list-toplist',
          breadcrumbs: false
        },
        {
          id: 'maintenance-services',
          title: 'Bảo trì',
          type: 'item',
          url: '/dashboard/services/list-maintenance',
          breadcrumbs: false
        },
        {
          id: 'mobile-network-services',
          title: 'Nhà mạng',
          type: 'item',
          url: '/dashboard/services/list-mobile-network',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default services;

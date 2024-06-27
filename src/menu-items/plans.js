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
      id: 'plans',
      title: 'Gói dịch vụ',
      type: 'collapse',
      icon: icons.IconPlaylistAdd,
      children: [
        {
          id: 'domain-plans',
          title: 'Tên miền',
          type: 'item',
          url: '/dashboard/plans/list-domain',
          breadcrumbs: false
        },
        {
          id: 'hosting-plans',
          title: 'Hosting',
          type: 'item',
          url: '/dashboard/plans/list-hosting',
          breadcrumbs: false
        },
        {
          id: 'email-plans',
          title: 'Email',
          type: 'item',
          url: '/dashboard/plans/list-email',
          breadcrumbs: false
        },
        {
          id: 'ssl-plans',
          title: 'SSL',
          type: 'item',
          url: '/dashboard/plans/list-ssl',
          breadcrumbs: false
        },
        {
          id: 'content-plans',
          title: 'Viết bài Content & PR',
          type: 'item',
          url: '/dashboard/plans/list-content',
          breadcrumbs: false
        },
        {
          id: 'maintenance-plans',
          title: 'Bảo trì',
          type: 'item',
          url: '/dashboard/plans/list-maintenance',
          breadcrumbs: false
        },
        {
          id: 'server-plans',
          title: 'Server',
          type: 'item',
          url: '/dashboard/plans/list-server',
          breadcrumbs: false
        },
        {
          id: 'mobile-network-plans',
          title: 'Sim 4G',
          type: 'item',
          url: '/dashboard/plans/list-mobile-network',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default plans;

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
          url: '/plans/list-domain',
          breadcrumbs: false
        },
        {
          id: 'hosting-plans',
          title: 'Hosting',
          type: 'item',
          url: '/plans/list-hosting',
          breadcrumbs: false
        },
        {
          id: 'email-plans',
          title: 'Email',
          type: 'item',
          url: '/plans/list-email',
          breadcrumbs: false
        },
        {
          id: 'ssl-plans',
          title: 'SSL',
          type: 'item',
          url: '/plans/list-ssl',
          breadcrumbs: false
        },
        {
          id: 'content-plans',
          title: 'Viết bài Content & PR',
          type: 'item',
          url: '/plans/list-content',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default plans;

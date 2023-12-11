// assets
import { IconPlaylistAdd } from '@tabler/icons';

// constant
const icons = {
  IconPlaylistAdd
};

const plans = {
  id: 'plans-scloud',
  title: 'Đăng ký dịch vụ - Scloud',
  type: 'group',
  children: [
    {
      id: 'plans',
      title: 'Đăng ký mới',
      type: 'collapse',
      icon: icons.IconPlaylistAdd,
      children: [
        {
          id: 'domain-plans',
          title: 'Tên miền',
          type: 'item',
          url: '/plans/list-domain-plans',
          breadcrumbs: false
        },
        {
          id: 'hosting-plans',
          title: 'Hosting',
          type: 'item',
          url: '/plans/list-hosting-plans',
          breadcrumbs: false
        },
        {
          id: 'email-plans',
          title: 'Email',
          type: 'item',
          url: '/plans/list-email-plans',
          breadcrumbs: false
        },
        {
          id: 'ssl-plans',
          title: 'SSL',
          type: 'item',
          url: '/plans/list-ssl-plans',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default plans;

// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

const plans = {
  id: 'plans',
  title: 'Đăng ký dịch vụ - Scloud',
  type: 'group',
  children: [
    {
      id: 'dang-ky',
      title: 'Đăng ký mới',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'domain-plans',
          title: 'Tên miền',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'hosting-plans',
          title: 'Hostings',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'email-plans',
          title: 'Email',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'ssl-plans',
          title: 'SSL',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default plans;

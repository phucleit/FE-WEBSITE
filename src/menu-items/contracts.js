// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

const contracts = {
  id: 'contracts',
  title: 'Hợp đồng - Scloud',
  type: 'group',
  children: [
    {
      id: 'hop-dong',
      title: 'Hợp đồng',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'danh-sach',
          title: 'Danh sách',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'them-moi',
          title: 'Thêm mới',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default contracts;

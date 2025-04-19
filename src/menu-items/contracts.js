// assets
import { IconGrave } from '@tabler/icons';

// constant
const icons = {
  IconGrave
};

const contracts = {
  id: 'contracts-scloud',
  title: 'Hợp đồng - Scloud',
  type: 'group',
  children: [
    {
      // id: 'contracts',
      id: 'authentication',
      title: 'Hợp đồng',
      type: 'collapse',
      icon: icons.IconGrave,
      children: [
        {
          id: 'danh-sach-hop-dong',
          title: 'Danh sách',
          type: 'item',
          url: '/trang-chu/hop-dong/danh-sach-hop-dong',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default contracts;

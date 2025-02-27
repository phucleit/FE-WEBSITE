import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

/***** supplier *****/
// supplier
const ListSuppliers = Loadable(lazy(() => import('views/suppliers/ListSuppliers')));
const AddSuppliers = Loadable(lazy(() => import('views/suppliers/AddSuppliers')));
const UpdateSuppliers = Loadable(lazy(() => import('views/suppliers/UpdateSuppliers')));

// mobile network
const ListMobileNetwork = Loadable(lazy(() => import('views/suppliers/mobile-network/ListMobileNetwork')));
const AddMobileNetwork = Loadable(lazy(() => import('views/suppliers/mobile-network/AddMobileNetwork')));
const UpdateMobileNetwork = Loadable(lazy(() => import('views/suppliers/mobile-network/UpdateMobileNetwork')));

// server
const ListServer = Loadable(lazy(() => import('views/suppliers/server/ListServer')));
const AddServer = Loadable(lazy(() => import('views/suppliers/server/AddServer')));
const UpdateServer = Loadable(lazy(() => import('views/suppliers/server/UpdateServer')));

/***** plans *****/
// domain plans
const ListDomainPlans = Loadable(lazy(() => import('views/plans-scloud/domain-plans/ListDomainPlans')));
const AddDomainPlans = Loadable(lazy(() => import('views/plans-scloud/domain-plans/AddDomainPlans')));
const UpdateDomainPlans = Loadable(lazy(() => import('views/plans-scloud/domain-plans/UpdateDomainPlans')));

// email plans
const ListEmailPlans = Loadable(lazy(() => import('views/plans-scloud/email-plans/ListEmailPlans')));
const AddEmailPlans = Loadable(lazy(() => import('views/plans-scloud/email-plans/AddEmailPlans')));
const UpdateEmailPlans = Loadable(lazy(() => import('views/plans-scloud/email-plans/UpdateEmailPlans')));

// hosting plans
const ListHostingPlans = Loadable(lazy(() => import('views/plans-scloud/hosting-plans/ListHostingPlans')));
const AddHostingPlans = Loadable(lazy(() => import('views/plans-scloud/hosting-plans/AddHostingPlans')));
const UpdateHostingPlans = Loadable(lazy(() => import('views/plans-scloud/hosting-plans/UpdateHostingPlans')));

// ssl plans
const ListSslPlans = Loadable(lazy(() => import('views/plans-scloud/ssl-plans/ListSslPlans')));
const AddSslPlans = Loadable(lazy(() => import('views/plans-scloud/ssl-plans/AddSslPlans')));
const UpdateSslPlans = Loadable(lazy(() => import('views/plans-scloud/ssl-plans/UpdateSslPlans')));

// content plans
const ListContentPlans = Loadable(lazy(() => import('views/plans-scloud/content-plans/ListContentPlans')));
const AddContentPlans = Loadable(lazy(() => import('views/plans-scloud/content-plans/AddContentPlans')));
const UpdateContentPlans = Loadable(lazy(() => import('views/plans-scloud/content-plans/UpdateContentPlans')));

// maintenance plans
const ListMaintenancePlans = Loadable(lazy(() => import('views/plans-scloud/maintenance-plans/ListMaintenancePlans')));
const AddMaintenancePlans = Loadable(lazy(() => import('views/plans-scloud/maintenance-plans/AddMaintenancePlans')));
const UpdateMaintenancePlans = Loadable(lazy(() => import('views/plans-scloud/maintenance-plans/UpdateMaintenancePlans')));

// mobile network plans
const ListMobileNetworkPlans = Loadable(lazy(() => import('views/plans-scloud/mobile-network-plans/ListMobileNetworkPlans')));
const AddMobileNetworkPlans = Loadable(lazy(() => import('views/plans-scloud/mobile-network-plans/AddMobileNetworkPlans')));
const UpdateMobileNetworkPlans = Loadable(lazy(() => import('views/plans-scloud/mobile-network-plans/UpdateMobileNetworkPlans')));

// server plans
const ListServerPlans = Loadable(lazy(() => import('views/plans-scloud/server-plans/ListServerPlans')));
const AddServerPlans = Loadable(lazy(() => import('views/plans-scloud/server-plans/AddServerPlans')));
const UpdateServerPlans = Loadable(lazy(() => import('views/plans-scloud/server-plans/UpdateServerPlans')));

/***** customers *****/
const ListCustomers = Loadable(lazy(() => import('views/customers/ListCustomers')));
const AddCustomers = Loadable(lazy(() => import('views/customers/AddCustomers')));
const UpdateCustomers = Loadable(lazy(() => import('views/customers/UpdateCustomers')));

/***** services *****/
// domain serices
const ListDomainServices = Loadable(lazy(() => import('views/services-scloud/domain-services/ListDomainServices')));
const AddDomainServices = Loadable(lazy(() => import('views/services-scloud/domain-services/AddDomainServices')));
const UpdateDomainServices = Loadable(lazy(() => import('views/services-scloud/domain-services/UpdateDomainServices')));

// hosting serices
const ListHostingServices = Loadable(lazy(() => import('views/services-scloud/hosting-services/ListHostingServices')));
const AddHostingServices = Loadable(lazy(() => import('views/services-scloud/hosting-services/AddHostingServices')));
const UpdateHostingServices = Loadable(lazy(() => import('views/services-scloud/hosting-services/UpdateHostingServices')));

// email serices
const ListEmailServices = Loadable(lazy(() => import('views/services-scloud/email-services/ListEmailServices')));
const AddEmailServices = Loadable(lazy(() => import('views/services-scloud/email-services/AddEmailServices')));
const UpdateEmailServices = Loadable(lazy(() => import('views/services-scloud/email-services/UpdateEmailServices')));

// ssl serices
const ListSslServices = Loadable(lazy(() => import('views/services-scloud/ssl-services/ListSslServices')));
const AddSslServices = Loadable(lazy(() => import('views/services-scloud/ssl-services/AddSslServices')));
const UpdateSslServices = Loadable(lazy(() => import('views/services-scloud/ssl-services/UpdateSslServices')));

// content serices
const ListContentServices = Loadable(lazy(() => import('views/services-scloud/content-services/ListContentServices')));
const AddContentServices = Loadable(lazy(() => import('views/services-scloud/content-services/AddContentServices')));
const UpdateContentServices = Loadable(lazy(() => import('views/services-scloud/content-services/UpdateContentServices')));

// website serices
const ListWebsiteServices = Loadable(lazy(() => import('views/services-scloud/website-services/ListWebsiteServices')));
const AddWebsiteServices = Loadable(lazy(() => import('views/services-scloud/website-services/AddWebsiteServices')));
const UpdateWebsiteServices = Loadable(lazy(() => import('views/services-scloud/website-services/UpdateWebsiteServices')));

// toplist serices
const ListToplistServices = Loadable(lazy(() => import('views/services-scloud/toplist-services/ListToplistServices')));
const AddToplistServices = Loadable(lazy(() => import('views/services-scloud/toplist-services/AddToplistServices')));
const UpdateToplistServices = Loadable(lazy(() => import('views/services-scloud/toplist-services/UpdateToplistServices')));

// maintenance serices
const ListMaintenanceServices = Loadable(lazy(() => import('views/services-scloud/maintenance-services/ListMaintenanceServices')));
const AddMaintenanceServices = Loadable(lazy(() => import('views/services-scloud/maintenance-services/AddMaintenanceServices')));
const UpdateMaintenanceServices = Loadable(lazy(() => import('views/services-scloud/maintenance-services/UpdateMaintenanceServices')));

// mobile network serices
const ListMobileNetworkServices = Loadable(lazy(() => import('views/services-scloud/mobile-network-services/ListMobileNetworkServices')));
const AddMobileNetworkServices = Loadable(lazy(() => import('views/services-scloud/mobile-network-services/AddMobileNetworkServices')));
const UpdateMobileNetworkServices = Loadable(
  lazy(() => import('views/services-scloud/mobile-network-services/UpdateMobileNetworkServices'))
);

// contracts
const ListContracts = Loadable(lazy(() => import('views/contracts/ListContracts')));
const UpdateContracts = Loadable(lazy(() => import('views/contracts/UpdateContracts')));

// users
const ListUser = Loadable(lazy(() => import('views/users/ListUser')));
const AddUser = Loadable(lazy(() => import('views/users/AddUser')));
const UpdateUser = Loadable(lazy(() => import('views/users/UpdateUser')));

// group users
const ListGroupUser = Loadable(lazy(() => import('views/group-users/ListGroupUser')));
const AddGroupUser = Loadable(lazy(() => import('views/group-users/AddGroupUser')));
const UpdateGroupUser = Loadable(lazy(() => import('views/group-users/UpdateGroupUser')));

/***** itvt *****/
// domain
const ListDomainITVT = Loadable(lazy(() => import('views/itvt/domain-itvt/ListDomainITVT')));
const AddDomainITVT = Loadable(lazy(() => import('views/itvt/domain-itvt/AddDomainITVT')));
const UpdateDomainITVT = Loadable(lazy(() => import('views/itvt/domain-itvt/UpdateDomainITVT')));

// ssl
const ListSslITVT = Loadable(lazy(() => import('views/itvt/ssl-itvt/ListSslITVT')));
const AddSslITVT = Loadable(lazy(() => import('views/itvt/ssl-itvt/AddSslITVT')));
const UpdateSslITVT = Loadable(lazy(() => import('views/itvt/ssl-itvt/UpdateSslITVT')));

// action logs
const ListActionLogs = Loadable(lazy(() => import('views/action-logs/ListActionLogs')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/trang-chu',
  element: <MainLayout />,
  children: [
    {
      path: '/trang-chu',
      element: <DashboardDefault />
    },
    {
      path: 'tai-khoan',
      children: [
        {
          path: 'danh-sach-tai-khoan',
          element: <ListUser />
        },
        {
          path: 'them-tai-khoan',
          element: <AddUser />
        },
        {
          path: 'cap-nhat-tai-khoan/:id',
          element: <UpdateUser />
        },
        {
          path: 'danh-sach-nhom',
          element: <ListGroupUser />
        },
        {
          path: 'them-nhom',
          element: <AddGroupUser />
        },
        {
          path: 'cap-nhat-nhom/:id',
          element: <UpdateGroupUser />
        }
      ]
    },
    {
      path: 'nha-cung-cap',
      children: [
        {
          path: 'danh-sach-nha-cung-cap',
          element: <ListSuppliers />
        },
        {
          path: 'them-nha-cung-cap',
          element: <AddSuppliers />
        },
        {
          path: 'cap-nhat-nha-cung-cap/:id',
          element: <UpdateSuppliers />
        },
        {
          path: 'nha-mang/danh-sach-nha-mang',
          element: <ListMobileNetwork />
        },
        {
          path: 'nha-mang/them-nha-mang',
          element: <AddMobileNetwork />
        },
        {
          path: 'nha-mang/cap-nhat-nha-mang/:id',
          element: <UpdateMobileNetwork />
        },
        {
          path: 'server/danh-sach-server',
          element: <ListServer />
        },
        {
          path: 'server/them-server',
          element: <AddServer />
        },
        {
          path: 'server/cap-nhat-server/:id',
          element: <UpdateServer />
        }
      ]
    },
    {
      path: 'itvt',
      children: [
        {
          path: 'danh-sach-ten-mien-itvt',
          element: <ListDomainITVT />
        },
        {
          path: 'them-ten-mien-itvt',
          element: <AddDomainITVT />
        },
        {
          path: 'cap-nhat-ten-mien-itvt/:id',
          element: <UpdateDomainITVT />
        },
        {
          path: 'danh-sach-ssl-itvt',
          element: <ListSslITVT />
        },
        {
          path: 'them-ssl-itvt',
          element: <AddSslITVT />
        },
        {
          path: 'cap-nhat-ssl-itvt/:id',
          element: <UpdateSslITVT />
        }
      ]
    },
    {
      path: 'khach-hang',
      children: [
        {
          path: 'danh-sach-khach-hang',
          element: <ListCustomers />
        },
        {
          path: 'them-khach-hang',
          element: <AddCustomers />
        },
        {
          path: 'cap-nhat-khach-hang/:id',
          element: <UpdateCustomers />
        }
      ]
    },
    {
      path: 'goi-dich-vu',
      children: [
        {
          path: 'danh-sach-ten-mien',
          element: <ListDomainPlans />
        },
        {
          path: 'them-ten-mien',
          element: <AddDomainPlans />
        },
        {
          path: 'cap-nhat-ten-mien/:id',
          element: <UpdateDomainPlans />
        },
        {
          path: 'danh-sach-email',
          element: <ListEmailPlans />
        },
        {
          path: 'them-email',
          element: <AddEmailPlans />
        },
        {
          path: 'cap-nhat-email/:id',
          element: <UpdateEmailPlans />
        },
        {
          path: 'danh-sach-hosting',
          element: <ListHostingPlans />
        },
        {
          path: 'them-hosting',
          element: <AddHostingPlans />
        },
        {
          path: 'cap-nhat-hosting/:id',
          element: <UpdateHostingPlans />
        },
        {
          path: 'danh-sach-ssl',
          element: <ListSslPlans />
        },
        {
          path: 'them-ssl',
          element: <AddSslPlans />
        },
        {
          path: 'cap-nhat-ssl/:id',
          element: <UpdateSslPlans />
        },
        {
          path: 'danh-sach-content',
          element: <ListContentPlans />
        },
        {
          path: 'them-content',
          element: <AddContentPlans />
        },
        {
          path: 'cap-nhat-content/:id',
          element: <UpdateContentPlans />
        },
        {
          path: 'danh-sach-bao-tri',
          element: <ListMaintenancePlans />
        },
        {
          path: 'them-bao-tri',
          element: <AddMaintenancePlans />
        },
        {
          path: 'cap-nhat-bao-tri/:id',
          element: <UpdateMaintenancePlans />
        },
        {
          path: 'danh-sach-server',
          element: <ListServerPlans />
        },
        {
          path: 'them-server',
          element: <AddServerPlans />
        },
        {
          path: 'cap-nhat-server/:id',
          element: <UpdateServerPlans />
        },
        {
          path: 'danh-sach-nha-mang',
          element: <ListMobileNetworkPlans />
        },
        {
          path: 'them-nha-mang',
          element: <AddMobileNetworkPlans />
        },
        {
          path: 'cap-nhat-nha-mang/:id',
          element: <UpdateMobileNetworkPlans />
        }
      ]
    },
    {
      path: 'dich-vu',
      children: [
        {
          path: 'danh-sach-ten-mien',
          element: <ListDomainServices />
        },
        {
          path: 'them-ten-mien',
          element: <AddDomainServices />
        },
        {
          path: 'cap-nhat-ten-mien/:id',
          element: <UpdateDomainServices />
        },
        {
          path: 'danh-sach-hosting',
          element: <ListHostingServices />
        },
        {
          path: 'them-hosting',
          element: <AddHostingServices />
        },
        {
          path: 'cap-nhat-hosting/:id',
          element: <UpdateHostingServices />
        },
        {
          path: 'danh-sach-email',
          element: <ListEmailServices />
        },
        {
          path: 'them-email',
          element: <AddEmailServices />
        },
        {
          path: 'cap-nhat-email/:id',
          element: <UpdateEmailServices />
        },
        {
          path: 'danh-sach-ssl',
          element: <ListSslServices />
        },
        {
          path: 'them-ssl',
          element: <AddSslServices />
        },
        {
          path: 'cap-nhat-ssl/:id',
          element: <UpdateSslServices />
        },
        {
          path: 'danh-sach-website',
          element: <ListWebsiteServices />
        },
        {
          path: 'them-website',
          element: <AddWebsiteServices />
        },
        {
          path: 'cap-nhat-website/:id',
          element: <UpdateWebsiteServices />
        },
        {
          path: 'danh-sach-content',
          element: <ListContentServices />
        },
        {
          path: 'them-content',
          element: <AddContentServices />
        },
        {
          path: 'cap-nhat-content/:id',
          element: <UpdateContentServices />
        },
        {
          path: 'danh-sach-toplist',
          element: <ListToplistServices />
        },
        {
          path: 'them-toplist',
          element: <AddToplistServices />
        },
        {
          path: 'cap-nhat-toplist/:id',
          element: <UpdateToplistServices />
        },
        {
          path: 'danh-sach-bao-tri',
          element: <ListMaintenanceServices />
        },
        {
          path: 'them-bao-tri',
          element: <AddMaintenanceServices />
        },
        {
          path: 'cap-nhat-bao-tri/:id',
          element: <UpdateMaintenanceServices />
        },
        {
          path: 'danh-sach-nha-mang',
          element: <ListMobileNetworkServices />
        },
        {
          path: 'them-nha-mang',
          element: <AddMobileNetworkServices />
        },
        {
          path: 'cap-nhat-nha-mang/:id',
          element: <UpdateMobileNetworkServices />
        }
      ]
    },
    {
      path: 'hop-dong',
      children: [
        {
          path: 'danh-sach-hop-dong',
          element: <ListContracts />
        },
        {
          path: 'cap-nhat-hop-dong/:id',
          element: <UpdateContracts />
        }
      ]
    },
    {
      path: 'lich-su-thao-tac',
      children: [
        {
          path: 'danh-sach',
          element: <ListActionLogs />
        }
      ]
    }
  ]
};

export default MainRoutes;

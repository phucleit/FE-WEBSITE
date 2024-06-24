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
const AddContracts = Loadable(lazy(() => import('views/contracts/AddContracts')));
const UpdateContracts = Loadable(lazy(() => import('views/contracts/UpdateContracts')));

// users
const ListUser = Loadable(lazy(() => import('views/users/ListUser')));
const AddUser = Loadable(lazy(() => import('views/users/AddUser')));
const UpdateUser = Loadable(lazy(() => import('views/users/UpdateUser')));

// group users
const ListGroupUser = Loadable(lazy(() => import('views/group-users/ListGroupUser')));
const AddGroupUser = Loadable(lazy(() => import('views/group-users/AddGroupUser')));
const UpdateGroupUser = Loadable(lazy(() => import('views/group-users/UpdateGroupUser')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/dashboard',
  element: <MainLayout />,
  children: [
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'users',
      children: [
        {
          path: 'list-users',
          element: <ListUser />
        },
        {
          path: 'add-users',
          element: <AddUser />
        },
        {
          path: 'update-users/:id',
          element: <UpdateUser />
        },
        {
          path: 'list-group-users',
          element: <ListGroupUser />
        },
        {
          path: 'add-group-users',
          element: <AddGroupUser />
        },
        {
          path: 'update-group-users/:id',
          element: <UpdateGroupUser />
        }
      ]
    },
    {
      path: 'suppliers',
      children: [
        {
          path: 'list-suppliers',
          element: <ListSuppliers />
        },
        {
          path: 'add-suppliers',
          element: <AddSuppliers />
        },
        {
          path: 'update-suppliers/:id',
          element: <UpdateSuppliers />
        },
        {
          path: 'mobile-network/list-mobile-network',
          element: <ListMobileNetwork />
        },
        {
          path: 'mobile-network/add-mobile-network',
          element: <AddMobileNetwork />
        },
        {
          path: 'mobile-network/update-mobile-network/:id',
          element: <UpdateMobileNetwork />
        },
        {
          path: 'server/list-server',
          element: <ListServer />
        },
        {
          path: 'server/add-server',
          element: <AddServer />
        },
        {
          path: 'server/update-server/:id',
          element: <UpdateServer />
        }
      ]
    },
    {
      path: 'plans',
      children: [
        {
          path: 'list-domain',
          element: <ListDomainPlans />
        },
        {
          path: 'add-domain',
          element: <AddDomainPlans />
        },
        {
          path: 'update-domain/:id',
          element: <UpdateDomainPlans />
        },
        {
          path: 'list-email',
          element: <ListEmailPlans />
        },
        {
          path: 'add-email',
          element: <AddEmailPlans />
        },
        {
          path: 'update-email/:id',
          element: <UpdateEmailPlans />
        },
        {
          path: 'list-hosting',
          element: <ListHostingPlans />
        },
        {
          path: 'add-hosting',
          element: <AddHostingPlans />
        },
        {
          path: 'update-hosting/:id',
          element: <UpdateHostingPlans />
        },
        {
          path: 'list-ssl',
          element: <ListSslPlans />
        },
        {
          path: 'add-ssl',
          element: <AddSslPlans />
        },
        {
          path: 'update-ssl/:id',
          element: <UpdateSslPlans />
        },
        {
          path: 'list-content',
          element: <ListContentPlans />
        },
        {
          path: 'add-content',
          element: <AddContentPlans />
        },
        {
          path: 'update-content/:id',
          element: <UpdateContentPlans />
        },
        {
          path: 'list-maintenance',
          element: <ListMaintenancePlans />
        },
        {
          path: 'add-maintenance',
          element: <AddMaintenancePlans />
        },
        {
          path: 'update-maintenance/:id',
          element: <UpdateMaintenancePlans />
        },
        {
          path: 'list-mobile-network',
          element: <ListMobileNetworkPlans />
        },
        {
          path: 'add-mobile-network',
          element: <AddMobileNetworkPlans />
        },
        {
          path: 'update-mobile-network/:id',
          element: <UpdateMobileNetworkPlans />
        }
      ]
    },
    {
      path: 'customers',
      children: [
        {
          path: 'list-customers',
          element: <ListCustomers />
        },
        {
          path: 'add-customers',
          element: <AddCustomers />
        },
        {
          path: 'update-customers/:id',
          element: <UpdateCustomers />
        }
      ]
    },
    {
      path: 'services',
      children: [
        {
          path: 'list-domain',
          element: <ListDomainServices />
        },
        {
          path: 'add-domain',
          element: <AddDomainServices />
        },
        {
          path: 'update-domain/:id',
          element: <UpdateDomainServices />
        },
        {
          path: 'list-hosting',
          element: <ListHostingServices />
        },
        {
          path: 'add-hosting',
          element: <AddHostingServices />
        },
        {
          path: 'update-hosting/:id',
          element: <UpdateHostingServices />
        },
        {
          path: 'list-email',
          element: <ListEmailServices />
        },
        {
          path: 'add-email',
          element: <AddEmailServices />
        },
        {
          path: 'update-email/:id',
          element: <UpdateEmailServices />
        },
        {
          path: 'list-ssl',
          element: <ListSslServices />
        },
        {
          path: 'add-ssl',
          element: <AddSslServices />
        },
        {
          path: 'update-ssl/:id',
          element: <UpdateSslServices />
        },
        {
          path: 'list-website',
          element: <ListWebsiteServices />
        },
        {
          path: 'add-website',
          element: <AddWebsiteServices />
        },
        {
          path: 'update-website/:id',
          element: <UpdateWebsiteServices />
        },
        {
          path: 'list-content',
          element: <ListContentServices />
        },
        {
          path: 'add-content',
          element: <AddContentServices />
        },
        {
          path: 'update-content/:id',
          element: <UpdateContentServices />
        },
        {
          path: 'list-toplist',
          element: <ListToplistServices />
        },
        {
          path: 'add-toplist',
          element: <AddToplistServices />
        },
        {
          path: 'update-toplist/:id',
          element: <UpdateToplistServices />
        },
        {
          path: 'list-maintenance',
          element: <ListMaintenanceServices />
        },
        {
          path: 'add-maintenance',
          element: <AddMaintenanceServices />
        },
        {
          path: 'update-maintenance/:id',
          element: <UpdateMaintenanceServices />
        },
        {
          path: 'list-mobile-network',
          element: <ListMobileNetworkServices />
        },
        {
          path: 'add-mobile-network',
          element: <AddMobileNetworkServices />
        },
        {
          path: 'update-mobile-network/:id',
          element: <UpdateMobileNetworkServices />
        }
      ]
    },
    {
      path: 'contracts',
      children: [
        {
          path: 'list-contracts',
          element: <ListContracts />
        },
        {
          path: 'add-contracts',
          element: <AddContracts />
        },
        {
          path: 'update-contracts/:id',
          element: <UpdateContracts />
        }
      ]
    }
  ]
};

export default MainRoutes;

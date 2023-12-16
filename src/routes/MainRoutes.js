import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// supplier
const ListSuppliers = Loadable(lazy(() => import('views/suppliers/ListSuppliers')));
const AddSuppliers = Loadable(lazy(() => import('views/suppliers/AddSuppliers')));
const UpdateSuppliers = Loadable(lazy(() => import('views/suppliers/UpdateSuppliers')));

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

// customers
const ListCustomers = Loadable(lazy(() => import('views/customers/ListCustomers')));
const AddCustomers = Loadable(lazy(() => import('views/customers/AddCustomers')));
const UpdateCustomers = Loadable(lazy(() => import('views/customers/UpdateCustomers')));

/***** services *****/
// domain serices
const ListDomainServices = Loadable(lazy(() => import('views/services-scloud/domain-services/ListDomainServices')));
const AddDomainServices = Loadable(lazy(() => import('views/services-scloud/domain-services/AddDomainServices')));
const UpdateDomainServices = Loadable(lazy(() => import('views/services-scloud/domain-services/UpdateDomainServices')));

// contracts
const ListContracts = Loadable(lazy(() => import('views/contracts/ListContracts')));
const AddContracts = Loadable(lazy(() => import('views/contracts/AddContracts')));
const UpdateContracts = Loadable(lazy(() => import('views/contracts/UpdateContracts')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
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

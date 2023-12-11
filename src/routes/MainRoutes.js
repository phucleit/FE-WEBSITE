import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// plans routing
const ListDomainPlans = Loadable(lazy(() => import('views/plans-scloud/domain-plans/ListDomainPlans')));
const AddDomainPlans = Loadable(lazy(() => import('views/plans-scloud/domain-plans/AddDomainPlans')));
const UpdateDomainPlans = Loadable(lazy(() => import('views/plans-scloud/domain-plans/UpdateDomainPlans')));

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
      path: 'plans',
      children: [
        {
          path: 'list-domain-plans',
          element: <ListDomainPlans />
        }
      ]
    },
    {
      path: 'plans',
      children: [
        {
          path: 'add-domain-plans',
          element: <AddDomainPlans />
        }
      ]
    },
    {
      path: 'plans',
      children: [
        {
          path: 'update-domain-plans/:id',
          element: <UpdateDomainPlans />
        }
      ]
    }
  ]
};

export default MainRoutes;

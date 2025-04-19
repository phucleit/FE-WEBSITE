import dashboard from './dashboard';
import suppliers from './suppliers';
import plans from './plans';
import services from './services';
import customers from './customers';
import contracts from './contracts';
import users from './users';
import itvt from './itvt';
import actionlogs from './actionlogs';
import backups from './backups';

const menuItems = {
  items: [dashboard, actionlogs, users, suppliers, plans, itvt, customers, services, contracts, backups]
};

export default menuItems;

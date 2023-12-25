import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

import CardServices from './card-services';
import ListCustomers from '../customers/ListCustomers';
import ListServices from './list-services';
import ListContracts from 'views/contracts/ListContracts';

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CardServices />
      </Grid>
      <Grid item xs={12}>
        <ListContracts />
      </Grid>
      <Grid item xs={12}>
        <ListCustomers />
      </Grid>
      <Grid item xs={12}>
        <ListServices />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

import CardServices from './card-services';
import ListCustomers from '../customers/ListCustomers';

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CardServices />
      </Grid>
      <Grid item xs={12}>
        <ListCustomers />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

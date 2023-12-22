import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

import CardServices from './card-services';

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CardServices />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

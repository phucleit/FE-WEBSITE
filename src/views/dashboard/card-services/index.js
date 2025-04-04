import React, { useState } from 'react';

import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';

import CardList from './CardList';
import Statistical2 from './Statistical2';
import TotalPriceServices from '../total-price-services';
import RemainingContracts from '../contracts';
import ListActionLogs from '../action-logs';

export default function CardServices() {
  const [valueTab, setValueTab] = useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <Paper square sx={{ borderRadius: '12px' }}>
              <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChangeTab}>
                    <Tab label="Danh sách dịch vụ" value="1" />
                    <Tab label="Thống kê dịch vụ" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <CardList />
                </TabPanel>
                <TabPanel value="2">
                  <Statistical2 />
                </TabPanel>
              </TabContext>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <ListActionLogs />
            <TotalPriceServices />
            <RemainingContracts />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

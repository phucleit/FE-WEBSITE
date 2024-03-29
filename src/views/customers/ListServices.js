import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import MainCard from 'ui-component/cards/MainCard';

import ListDomainById from './services/ListDomainById';
import ListHostingById from './services/ListHostingById';
import ListEmailById from './services/ListEmailById';
import ListSslById from './services/ListSslById';
import ListWebsiteById from './services/ListWebsiteById';
import ListContentById from './services/ListContentById';
import ListToplistById from './services/ListToplistById';
import ListMaintenanceById from './services/ListMaintenanceById';

export default function ListServices() {
  const [valueTab, setValueTab] = useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <>
      <MainCard title="Danh sách dịch vụ" sx={{ marginTop: '15px' }}>
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <TabContext value={valueTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeTab}>
                <Tab label="Dịch vụ tên miền" value="1" />
                <Tab label="Dịch vụ Hosting" value="2" />
                <Tab label="Dịch vụ Email" value="3" />
                <Tab label="Dịch vụ SSL" value="4" />
                <Tab label="Dịch vụ Thiết kế Website" value="5" />
                <Tab label="Dịch vụ Content" value="6" />
                <Tab label="Dịch vụ Toplist Vũng Tàu" value="7" />
                <Tab label="Dịch vụ Bảo trì" value="8" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ListDomainById />
            </TabPanel>
            <TabPanel value="2">
              <ListHostingById />
            </TabPanel>
            <TabPanel value="3">
              <ListEmailById />
            </TabPanel>
            <TabPanel value="4">
              <ListSslById />
            </TabPanel>
            <TabPanel value="5">
              <ListWebsiteById />
            </TabPanel>
            <TabPanel value="6">
              <ListContentById />
            </TabPanel>
            <TabPanel value="7">
              <ListToplistById />
            </TabPanel>
            <TabPanel value="8">
              <ListMaintenanceById />
            </TabPanel>
          </TabContext>
        </Box>
      </MainCard>
    </>
  );
}

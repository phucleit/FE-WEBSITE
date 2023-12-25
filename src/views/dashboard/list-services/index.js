import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import MainCard from 'ui-component/cards/MainCard';

import ListDomainServices from '../../services-scloud/domain-services/ListDomainServices';
import ListHostingServices from '../../services-scloud/hosting-services/ListHostingServices';
import ListEmailServices from '../../services-scloud/email-services/ListEmailServices';
import ListSslServices from '../../services-scloud/ssl-services/ListSslServices';
import ListWebsiteServices from '../../services-scloud/website-services/ListWebsiteServices';
import ListContentServices from '../../services-scloud/content-services/ListContentServices';

export default function ListServices() {
  const [valueTab, setValueTab] = useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <>
      <MainCard>
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
              </TabList>
            </Box>
            <TabPanel value="1">
              <ListDomainServices />
            </TabPanel>
            <TabPanel value="2">
              <ListHostingServices />
            </TabPanel>
            <TabPanel value="3">
              <ListEmailServices />
            </TabPanel>
            <TabPanel value="4">
              <ListSslServices />
            </TabPanel>
            <TabPanel value="5">
              <ListWebsiteServices />
            </TabPanel>
            <TabPanel value="6">
              <ListContentServices />
            </TabPanel>
          </TabContext>
        </Box>
      </MainCard>
    </>
  );
}

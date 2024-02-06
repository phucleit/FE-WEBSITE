import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { IconWorldDownload, IconServer, IconMailOpened, IconAlignBoxBottomCenter, IconLockAccess } from '@tabler/icons';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import TotalPriceServices from '../total-price-services';
import RemainingContracts from '../contracts';

import config from '../../../config';

const LIST_DOMAIN_SERVICES = `${config.API_URL}/services/domain`;
const LIST_HOSTING_SERVICES = `${config.API_URL}/services/hosting`;
const LIST_SSL_SERVICES = `${config.API_URL}/services/ssl`;
const LIST_EMAIL_SERVICES = `${config.API_URL}/services/email`;
const LIST_WEBSITE_SERVICES = `${config.API_URL}/services/website`;
const LIST_CONTENT_SERVICES = `${config.API_URL}/services/content`;
const LIST_TOPLIST_SERVICES = `${config.API_URL}/services/toplist`;
const LIST_MAINTENANCE_SERVICES = `${config.API_URL}/services/maintenance`;

export default function CardServices() {
  const [dataDomainServices, setDataDomainServices] = useState([]);
  const [countDomainServices, setCountDomainServices] = useState('');
  const [countDomainExpiringServices, setCountDomainExpiringServices] = useState('');
  const [countDomainExpiredServices, setCountDomainExpiredServices] = useState('');

  const [dataHostingServices, setDataHostingServices] = useState([]);
  const [countHostingServices, setCountHostingServices] = useState('');
  const [countHostingExpiringServices, setCountHostingExpiringServices] = useState('');
  const [countHostingExpiredServices, setCountHostingExpiredServices] = useState('');

  const [dataSslServices, setDataSslServices] = useState([]);
  const [countSslServices, setCountSslServices] = useState('');
  const [countSslExpiringServices, setCountSslExpiringServices] = useState('');
  const [countSslExpiredServices, setCountSslExpiredServices] = useState('');

  const [dataEmailServices, setDataEmailServices] = useState('');
  const [countEmailServices, setCountEmailServices] = useState('');
  const [countEmailExpiringServices, setCountEmailExpiringServices] = useState('');
  const [countEmailExpiredServices, setCountEmailExpiredServices] = useState('');

  const [dataWebsiteServices, setDataWebsiteServices] = useState('');
  const [countWebsiteServices, setCountWebsiteServices] = useState('');
  const [countWebsiteClosedServices, setCountWebsiteClosedServices] = useState('');

  const [dataContentServices, setDataContentServices] = useState('');
  const [countContentServices, setCountContentServices] = useState('');
  const [countContentExpiringServices, setCountContentExpiringServices] = useState('');
  const [countContentExpiredServices, setCountContentExpiredServices] = useState('');

  const [dataToplistServices, setDataToplistServices] = useState('');
  const [countToplistServices, setCountToplistServices] = useState('');
  const [countToplistExpiringServices, setCountToplistExpiringServices] = useState('');
  const [countToplistExpiredServices, setCountToplistExpiredServices] = useState('');

  const [dataMaintenanceServices, setDataMaintenanceServices] = useState('');
  const [countMaintenanceServices, setCountMaintenanceServices] = useState('');
  const [countMaintenanceExpiringServices, setCountMaintenanceExpiringServices] = useState('');
  const [countMaintenanceExpiredServices, setCountMaintenanceExpiredServices] = useState('');

  // chi phí nhập
  let totalImportPriceDomainServices = 0;
  let totalImportPriceHostingServices = 0;
  let totalImportPriceSslServices = 0;
  let totalImportPriceEmailServices = 0;

  // chi phí bán ra
  let totalPriceDomainServices = 0;
  let totalPriceHostingServices = 0;
  let totalPriceSslServices = 0;
  let totalPriceEmailServices = 0;
  let totalPriceWebsiteServices = 0;
  let totalPriceContentServices = 0;
  let totalPriceToplistServices = 0;
  let totalPriceMaintenanceServices = 0;

  useEffect(() => {
    loadListDomainServices();
    loadListHostingServices();
    loadListSslServices();
    loadListEmailServices();
    loadListWebsiteServices();
    loadListContentServices();
    loadListToplistServices();
    loadListMaintenanceServices();
  }, []);

  const loadListDomainServices = async () => {
    const result = await axios.get(`${LIST_DOMAIN_SERVICES}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDataDomainServices(result.data);
    setCountDomainServices(result.data.length);

    const expiring = await axios.get(`${LIST_DOMAIN_SERVICES}/expiring/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountDomainExpiringServices(expiring.data.length);

    const expired = await axios.get(`${LIST_DOMAIN_SERVICES}/expired/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountDomainExpiredServices(expired.data.length);
  };

  const loadListHostingServices = async () => {
    const result = await axios.get(`${LIST_HOSTING_SERVICES}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDataHostingServices(result.data);
    setCountHostingServices(result.data.length);

    const expiring = await axios.get(`${LIST_HOSTING_SERVICES}/expiring/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountHostingExpiringServices(expiring.data.length);

    const expired = await axios.get(`${LIST_HOSTING_SERVICES}/expired/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountHostingExpiredServices(expired.data.length);
  };

  const loadListSslServices = async () => {
    const result = await axios.get(`${LIST_SSL_SERVICES}`);
    setDataSslServices(result.data);
    setCountSslServices(result.data.length);

    const expiring = await axios.get(`${LIST_SSL_SERVICES}/expiring/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountSslExpiringServices(expiring.data.length);

    const expired = await axios.get(`${LIST_SSL_SERVICES}/expired/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountSslExpiredServices(expired.data.length);
  };

  const loadListEmailServices = async () => {
    const result = await axios.get(`${LIST_EMAIL_SERVICES}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDataEmailServices(result.data);
    setCountEmailServices(result.data.length);

    const expiring = await axios.get(`${LIST_EMAIL_SERVICES}/expiring/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountEmailExpiringServices(expiring.data.length);

    const expired = await axios.get(`${LIST_EMAIL_SERVICES}/expired/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountEmailExpiredServices(expired.data.length);
  };

  const loadListWebsiteServices = async () => {
    const result = await axios.get(`${LIST_WEBSITE_SERVICES}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDataWebsiteServices(result.data);
    setCountWebsiteServices(result.data.length);

    const closed = await axios.get(`${LIST_WEBSITE_SERVICES}/closed/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountWebsiteClosedServices(closed.data.length);
  };

  const loadListContentServices = async () => {
    const result = await axios.get(`${LIST_CONTENT_SERVICES}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDataContentServices(result.data);
    setCountContentServices(result.data.length);

    const expiring = await axios.get(`${LIST_CONTENT_SERVICES}/expiring/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountContentExpiringServices(expiring.data.length);

    const expired = await axios.get(`${LIST_CONTENT_SERVICES}/expired/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountContentExpiredServices(expired.data.length);
  };

  const loadListToplistServices = async () => {
    const result = await axios.get(`${LIST_TOPLIST_SERVICES}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDataToplistServices(result.data);
    setCountToplistServices(result.data.length);

    const expiring = await axios.get(`${LIST_TOPLIST_SERVICES}/expiring/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountToplistExpiringServices(expiring.data.length);

    const expired = await axios.get(`${LIST_TOPLIST_SERVICES}/expired/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountToplistExpiredServices(expired.data.length);
  };

  const loadListMaintenanceServices = async () => {
    const result = await axios.get(`${LIST_MAINTENANCE_SERVICES}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDataMaintenanceServices(result.data);
    setCountMaintenanceServices(result.data.length);

    const expiring = await axios.get(`${LIST_MAINTENANCE_SERVICES}/expiring/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountMaintenanceExpiringServices(expiring.data.length);

    const expired = await axios.get(`${LIST_MAINTENANCE_SERVICES}/expired/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setCountMaintenanceExpiredServices(expired.data.length);
  };

  if (dataDomainServices) {
    dataDomainServices.forEach((item) => {
      totalImportPriceDomainServices += item.domain_plan_id.import_price * item.periods;
      totalPriceDomainServices += item.domain_plan_id.price * item.periods;
    });
  }

  if (dataHostingServices) {
    dataHostingServices.forEach((item) => {
      totalImportPriceHostingServices += item.periods * 12 * item.hosting_plan_id.import_price;
      totalPriceHostingServices += item.periods * 12 * item.hosting_plan_id.price;
    });
  }

  if (dataSslServices) {
    dataSslServices.forEach((item) => {
      totalImportPriceSslServices += item.periods * item.ssl_plan_id.import_price;
      totalPriceSslServices += item.periods * item.ssl_plan_id.price;
    });
  }

  if (dataEmailServices) {
    dataEmailServices.forEach((item) => {
      totalImportPriceEmailServices += item.periods * 12 * item.email_plan_id.import_price;
      totalPriceEmailServices += item.periods * 12 * item.email_plan_id.price;
    });
  }

  if (dataWebsiteServices) {
    dataWebsiteServices.forEach((item) => {
      totalPriceWebsiteServices += item.price;
    });
  }

  if (dataContentServices) {
    dataContentServices.forEach((item) => {
      totalPriceContentServices += item.periods * item.content_plan_id.price;
    });
  }

  if (dataToplistServices) {
    dataToplistServices.forEach((item) => {
      totalPriceToplistServices += item.periods * item.price;
    });
  }

  if (dataMaintenanceServices) {
    dataMaintenanceServices.forEach((item) => {
      totalPriceMaintenanceServices += item.periods * item.maintenance_plan_id.price;
    });
  }

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card sx={{ boxShadow: '0 3px 6px -4px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)' }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 18, textAlign: 'center' }} gutterBottom>
                      <IconWorldDownload /> <br />
                      Tên miền
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ đang sử dụng
                      <Button sx={{ ml: 2 }} variant="contained" size="small">
                        {countDomainServices ? countDomainServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ sắp hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="warning">
                        {countDomainExpiringServices ? countDomainExpiringServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="error">
                        {countDomainExpiredServices ? countDomainExpiredServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Tổng chi phí nhập
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalImportPriceDomainServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalImportPriceDomainServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Tổng chi phí bán
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalPriceDomainServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceDomainServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom>
                      <Link
                        href="/dashboard/services/list-domain"
                        sx={{
                          padding: '10px 20px',
                          color: '#fff',
                          borderRadius: '5px',
                          background: '#00c47f',
                          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                        }}
                        underline="none"
                      >
                        Đăng ký mới
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card sx={{ boxShadow: '0 3px 6px -4px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)' }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 18, textAlign: 'center' }} gutterBottom>
                      <IconServer /> <br />
                      Hosting
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ đang sử dụng
                      <Button sx={{ ml: 2 }} variant="contained" size="small">
                        {countHostingServices ? countHostingServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ sắp hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="warning">
                        {countHostingExpiringServices ? countHostingExpiringServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="error">
                        {countHostingExpiredServices ? countHostingExpiredServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Tổng chi phí nhập
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalImportPriceHostingServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalImportPriceHostingServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Tổng chi phí bán
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalPriceHostingServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceHostingServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom>
                      <Link
                        href="/dashboard/services/list-hosting"
                        sx={{
                          padding: '10px 20px',
                          color: '#fff',
                          borderRadius: '5px',
                          background: '#00c47f',
                          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                        }}
                        underline="none"
                      >
                        Đăng ký mới
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card sx={{ boxShadow: '0 3px 6px -4px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)' }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 18, textAlign: 'center' }} gutterBottom>
                      <IconLockAccess /> <br />
                      SSL
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ đang sử dụng
                      <Button sx={{ ml: 2 }} variant="contained" size="small">
                        {countSslServices ? countSslServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ sắp hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="warning">
                        {countSslExpiringServices ? countSslExpiringServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="error">
                        {countSslExpiredServices ? countSslExpiredServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Tổng chi phí nhập
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalImportPriceSslServices
                          ? Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalImportPriceSslServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Tổng chi phí bán
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalPriceSslServices
                          ? Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceSslServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom>
                      <Link
                        href="/dashboard/services/list-ssl"
                        sx={{
                          padding: '10px 20px',
                          color: '#fff',
                          borderRadius: '5px',
                          background: '#00c47f',
                          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                        }}
                        underline="none"
                      >
                        Đăng ký mới
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card sx={{ boxShadow: '0 3px 6px -4px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)' }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 18, textAlign: 'center' }} gutterBottom>
                      <IconMailOpened /> <br />
                      Email
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ đang sử dụng
                      <Button sx={{ ml: 2 }} variant="contained" size="small">
                        {countEmailServices ? countEmailServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ sắp hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="warning">
                        {countEmailExpiringServices ? countEmailExpiringServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="error">
                        {countEmailExpiredServices ? countEmailExpiredServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Tổng chi phí nhập
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalImportPriceEmailServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalImportPriceEmailServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Tổng chi phí bán
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalPriceEmailServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceEmailServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom>
                      <Link
                        href="/dashboard/services/list-email"
                        sx={{
                          padding: '10px 20px',
                          color: '#fff',
                          borderRadius: '5px',
                          background: '#00c47f',
                          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                        }}
                        underline="none"
                      >
                        Đăng ký mới
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card sx={{ boxShadow: '0 3px 6px -4px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)' }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 18, textAlign: 'center' }} gutterBottom>
                      <IconAlignBoxBottomCenter /> <br />
                      Thiết kế Website
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ đang hoạt động
                      <Button sx={{ ml: 2 }} variant="contained" size="small">
                        {countWebsiteServices ? countWebsiteServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ đã đóng
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="warning">
                        {countWebsiteClosedServices ? countWebsiteClosedServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="error">
                        0
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Tổng chi phí nhập
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalPriceWebsiteServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceWebsiteServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Tổng chi phí bán
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalPriceWebsiteServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceWebsiteServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom>
                      <Link
                        href="/dashboard/services/list-website"
                        sx={{
                          padding: '10px 20px',
                          color: '#fff',
                          borderRadius: '5px',
                          background: '#00c47f',
                          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                        }}
                        underline="none"
                      >
                        Đăng ký mới
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card sx={{ boxShadow: '0 3px 6px -4px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)' }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 18, textAlign: 'center' }} gutterBottom>
                      <IconAlignBoxBottomCenter /> <br />
                      Viết bài Content & PR
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ đang sử dụng
                      <Button sx={{ ml: 2 }} variant="contained" size="small">
                        {countContentServices ? countContentServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ sắp hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="warning">
                        {countContentExpiringServices ? countContentExpiringServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="error">
                        {countContentExpiredServices ? countContentExpiredServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Tổng chi phí nhập
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalPriceContentServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceContentServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Tổng chi phí bán
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalPriceContentServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceContentServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom>
                      <Link
                        href="/dashboard/services/list-content"
                        sx={{
                          padding: '10px 20px',
                          color: '#fff',
                          borderRadius: '5px',
                          background: '#00c47f',
                          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                        }}
                        underline="none"
                      >
                        Đăng ký mới
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card sx={{ boxShadow: '0 3px 6px -4px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)' }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 18, textAlign: 'center' }} gutterBottom>
                      <IconAlignBoxBottomCenter /> <br />
                      Toplist Vũng Tàu
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ đang sử dụng
                      <Button sx={{ ml: 2 }} variant="contained" size="small">
                        {countToplistServices ? countToplistServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ sắp hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="warning">
                        {countToplistExpiringServices ? countToplistExpiringServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="error">
                        {countToplistExpiredServices ? countToplistExpiredServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Tổng chi phí nhập
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalPriceToplistServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceToplistServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Tổng chi phí bán
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalPriceToplistServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceToplistServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom>
                      <Link
                        href="/dashboard/services/list-toplist"
                        sx={{
                          padding: '10px 20px',
                          color: '#fff',
                          borderRadius: '5px',
                          background: '#00c47f',
                          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                        }}
                        underline="none"
                      >
                        Đăng ký mới
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card sx={{ boxShadow: '0 3px 6px -4px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)' }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 18, textAlign: 'center' }} gutterBottom>
                      <IconAlignBoxBottomCenter /> <br />
                      Bảo trì
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ đang sử dụng
                      <Button sx={{ ml: 2 }} variant="contained" size="small">
                        {countMaintenanceServices ? countMaintenanceServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ sắp hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="warning">
                        {countMaintenanceExpiringServices ? countMaintenanceExpiringServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="error">
                        {countMaintenanceExpiredServices ? countMaintenanceExpiredServices : '0'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Tổng chi phí nhập
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalPriceMaintenanceServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceMaintenanceServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Tổng chi phí bán
                      <Button sx={{ ml: 2 }} variant="outlined" size="small" color="error">
                        {totalPriceMaintenanceServices
                          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceMaintenanceServices)
                          : '0 ₫'}
                      </Button>
                    </Typography>
                    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom>
                      <Link
                        href="/dashboard/services/list-maintenance"
                        sx={{
                          padding: '10px 20px',
                          color: '#fff',
                          borderRadius: '5px',
                          background: '#00c47f',
                          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                        }}
                        underline="none"
                      >
                        Đăng ký mới
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <TotalPriceServices />
            <RemainingContracts />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

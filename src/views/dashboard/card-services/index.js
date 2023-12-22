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

import config from '../../../config';

const LIST_DOMAIN_SERVICES = `${config.API_URL}/services/domain`;
const LIST_HOSTING_SERVICES = `${config.API_URL}/services/hosting`;
const LIST_SSL_SERVICES = `${config.API_URL}/services/ssl`;
const LIST_EMAIL_SERVICES = `${config.API_URL}/services/email`;
const LIST_CONTENT_SERVICES = `${config.API_URL}/services/content`;

export default function CardServices() {
  const [countDomainServices, setCountDomainServices] = useState('');
  const [countDomainExpiringServices, setCountDomainExpiringServices] = useState('');
  const [countDomainExpiredServices, setCountDomainExpiredServices] = useState('');

  const [countHostingServices, setCountHostingServices] = useState('');
  const [countHostingExpiringServices, setCountHostingExpiringServices] = useState('');
  const [countHostingExpiredServices, setCountHostingExpiredServices] = useState('');

  const [countSslServices, setCountSslServices] = useState('');
  const [countSslExpiringServices, setCountSslExpiringServices] = useState('');
  const [countSslExpiredServices, setCountSslExpiredServices] = useState('');

  const [countEmailServices, setCountEmailServices] = useState('');
  const [countEmailExpiringServices, setCountEmailExpiringServices] = useState('');
  const [countEmailExpiredServices, setCountEmailExpiredServices] = useState('');

  const [countContentServices, setCountContentServices] = useState('');
  const [countContentExpiringServices, setCountContentExpiringServices] = useState('');
  const [countContentExpiredServices, setCountContentExpiredServices] = useState('');

  useEffect(() => {
    loadListDomainServices();
    loadListHostingServices();
    loadListSslServices();
    loadListEmailServices();
    loadListContentServices();
  }, []);

  const loadListDomainServices = async () => {
    const result = await axios.get(`${LIST_DOMAIN_SERVICES}`);
    setCountDomainServices(result.data.length);

    const expiring = await axios.get(`${LIST_DOMAIN_SERVICES}/expiring/all`);
    setCountDomainExpiringServices(expiring.data.length);

    const expired = await axios.get(`${LIST_DOMAIN_SERVICES}/expired/all`);
    setCountDomainExpiredServices(expired.data.length);
  };

  const loadListHostingServices = async () => {
    const result = await axios.get(`${LIST_HOSTING_SERVICES}`);
    setCountHostingServices(result.data.length);

    const expiring = await axios.get(`${LIST_HOSTING_SERVICES}/expiring/all`);
    setCountHostingExpiringServices(expiring.data.length);

    const expired = await axios.get(`${LIST_HOSTING_SERVICES}/expired/all`);
    setCountHostingExpiredServices(expired.data.length);
  };

  const loadListSslServices = async () => {
    const result = await axios.get(`${LIST_SSL_SERVICES}`);
    setCountSslServices(result.data.length);

    const expiring = await axios.get(`${LIST_SSL_SERVICES}/expiring/all`);
    setCountSslExpiringServices(expiring.data.length);

    const expired = await axios.get(`${LIST_SSL_SERVICES}/expired/all`);
    setCountSslExpiredServices(expired.data.length);
  };

  const loadListEmailServices = async () => {
    const result = await axios.get(`${LIST_EMAIL_SERVICES}`);
    setCountEmailServices(result.data.length);

    const expiring = await axios.get(`${LIST_EMAIL_SERVICES}/expiring/all`);
    setCountEmailExpiringServices(expiring.data.length);

    const expired = await axios.get(`${LIST_EMAIL_SERVICES}/expired/all`);
    setCountEmailExpiredServices(expired.data.length);
  };

  const loadListContentServices = async () => {
    const result = await axios.get(`${LIST_CONTENT_SERVICES}`);
    setCountContentServices(result.data.length);

    const expiring = await axios.get(`${LIST_CONTENT_SERVICES}/expiring/all`);
    setCountContentExpiringServices(expiring.data.length);

    const expired = await axios.get(`${LIST_CONTENT_SERVICES}/expired/all`);
    setCountContentExpiredServices(expired.data.length);
  };

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
                        {countDomainServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ sắp hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="warning">
                        {countDomainExpiringServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Dịch vụ hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="error">
                        {countDomainExpiredServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom>
                      <Link
                        href="/services/list-domain"
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
                        {countHostingServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ sắp hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="warning">
                        {countHostingExpiringServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Dịch vụ hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="error">
                        {countHostingExpiredServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom>
                      <Link
                        href="/services/list-hosting"
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
                        {countSslServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ sắp hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="warning">
                        {countSslExpiringServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Dịch vụ hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="error">
                        {countSslExpiredServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom>
                      <Link
                        href="/services/list-ssl"
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
                        {countEmailServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ sắp hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="warning">
                        {countEmailExpiringServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Dịch vụ hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="error">
                        {countEmailExpiredServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom>
                      <Link
                        href="/services/list-email"
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
                        {countContentServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} gutterBottom>
                      Dịch vụ sắp hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="warning">
                        {countContentExpiringServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Dịch vụ hết hạn
                      <Button sx={{ ml: 2 }} variant="contained" size="small" color="error">
                        {countContentExpiredServices}
                      </Button>
                    </Typography>
                    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom>
                      <Link
                        href="/services/list-content"
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
            ASD
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

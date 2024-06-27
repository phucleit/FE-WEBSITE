import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import './styles.css';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';
import { apiGet, apiPost } from '../../../utils/formatUtils';

const LIST_DOMAIN_SERVICES = `${config.API_URL}/services/domain`;
const LIST_DOMAIN_PLANS = `${config.API_URL}/plans/domain`;
const LIST_SERVER_PLANS = `${config.API_URL}/plans/server`;
const LIST_CUSTOMERS = `${config.API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddDomainServices() {
  let navigate = useNavigate();

  const [name, setName] = useState('');
  const [periods, setPeriods] = useState('');
  const [registeredAt, setRegisteredAt] = useState(new Date());
  const [domainPlanId, setDomainPlanId] = useState('');
  const [serverPlanId, setServerPlanId] = useState('');
  const [pingCloudflare, setPingCloudflare] = useState('');
  const [customer_id, setCustomerId] = useState('');

  const [listDomainPlans, setListDomainPlans] = useState([]);
  const [listServerPlans, setListServerPlans] = useState([]);
  const [listCustomers, setListCustomers] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListDomainPlans();
    loadListServerPlans();
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListDomainPlans = async () => {
    const result = await apiGet(`${LIST_DOMAIN_PLANS}`);
    setListDomainPlans(result.data);
  };

  const loadListServerPlans = async () => {
    const result = await apiGet(`${LIST_SERVER_PLANS}`);
    setListServerPlans(result.data);
  };

  const loadListCustomers = async () => {
    const result = await apiGet(`${LIST_CUSTOMERS}`);
    setListCustomers(result.data);
  };

  const handleChangePingCloudflare = (e) => {
    setPingCloudflare(e.target.checked);
  };

  const handleAddDomainServices = (e) => {
    e.preventDefault();
    if (name == '') {
      alert('Vui lòng nhập tên miền đăng ký!');
      return;
    }

    const addDomainServices = {
      name: name,
      periods: periods,
      registeredAt: registeredAt.getTime(),
      domain_plan_id: domainPlanId,
      server_plan_id: serverPlanId,
      ping_cloudflare: pingCloudflare,
      customer_id: customer_id
    };

    apiPost(`${LIST_DOMAIN_SERVICES}`, addDomainServices)
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/dashboard/services/list-domain');
          window.location.reload(true);
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <MainCard title="Thêm mới">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên miền đăng ký</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên đăng ký..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Gói dịch vụ tên miền</InputLabel>
                  <Select
                    id="domainPlanId"
                    value={domainPlanId}
                    label="Chọn gói dịch vụ..."
                    onChange={(e) => setDomainPlanId(e.target.value)}
                  >
                    {listDomainPlans.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name} (NCC: {item.supplier_id.name})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6} className="registeredAt">
              <Item style={{ paddingTop: '4px' }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel className="customText">Ngày đăng ký</InputLabel>
                </FormControl>
              </Item>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <DateTimePicker locale="vi-VN" onChange={(date) => setRegisteredAt(date)} value={registeredAt} />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Thời gian</InputLabel>
                  <Select id="setPeriods" value={periods} label="Thời gian" onChange={(e) => setPeriods(e.target.value)}>
                    <MenuItem value={1}>1 năm</MenuItem>
                    <MenuItem value={2}>2 năm</MenuItem>
                    <MenuItem value={3}>3 năm</MenuItem>
                    <MenuItem value={4}>4 năm</MenuItem>
                    <MenuItem value={5}>5 năm</MenuItem>
                    <MenuItem value={6}>6 năm</MenuItem>
                    <MenuItem value={7}>7 năm</MenuItem>
                    <MenuItem value={8}>8 năm</MenuItem>
                    <MenuItem value={9}>9 năm</MenuItem>
                    <MenuItem value={10}>10 năm</MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Khách hàng</InputLabel>
                  <Select id="customer_id" value={customer_id} label="Chọn khách hàng..." onChange={(e) => setCustomerId(e.target.value)}>
                    {listCustomers.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.fullname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Server</InputLabel>
                  <Select id="serverPlanId" value={serverPlanId} label="Chọn server..." onChange={(e) => setServerPlanId(e.target.value)}>
                    {listServerPlans.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <FormLabel component="legend">Ping qua cloudflare</FormLabel>
                  <Switch checked={pingCloudflare} onChange={handleChangePingCloudflare} />
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleAddDomainServices}>
                Thêm mới
              </Button>
            </Item>
          </Grid>
        </Box>
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Thêm thành công!</Alert>
      </Snackbar>
    </>
  );
}

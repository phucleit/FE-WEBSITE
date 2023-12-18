import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';

const LIST_HOSTING_SERVICES = `${config.API_URL}/services/hosting`;
const LIST_DOMAIN_SERVICES = `${config.API_URL}/services/domain`;
const LIST_HOSTING_PLANS = `${config.API_URL}/plans/hosting`;
const LIST_CUSTOMERS = `${config.API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateHostingServices() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [domain_service_id, setDomainServiceId] = useState('');
  const [hosting_plan_id, setHostingPlanId] = useState('');
  const [periods, setPeriods] = useState('');
  const [customer_id, setCustomerId] = useState('');

  const [listDomainServices, setListDomainServices] = useState([]);
  const [listHostingPlans, setListHostingPlans] = useState([]);
  const [listCustomers, setListCustomers] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadDetailHostingServices();
    loadListDomainServices();
    loadListHostingPlans();
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDetailHostingServices = async () => {
    const result = await axios.get(`${LIST_HOSTING_SERVICES}/${currentId}`);
    setDomainServiceId(result.data.domain_service_id._id);
    setHostingPlanId(result.data.hosting_plan_id._id);
    setPeriods(result.data.periods);
    setCustomerId(result.data.customer_id._id);
  };

  const loadListDomainServices = async () => {
    const result = await axios.get(`${LIST_DOMAIN_SERVICES}`);
    setListDomainServices(result.data);
  };

  const loadListHostingPlans = async () => {
    const result = await axios.get(`${LIST_HOSTING_PLANS}`);
    setListHostingPlans(result.data);
  };

  const loadListCustomers = async () => {
    const result = await axios.get(`${LIST_CUSTOMERS}`);
    setListCustomers(result.data);
  };

  const handleUpdateHostingServices = (e) => {
    e.preventDefault();

    const updateHostingServices = {
      domain_service_id: domain_service_id,
      hosting_plan_id: hosting_plan_id,
      periods: periods,
      customer_id: customer_id
    };

    axios
      .put(`${LIST_HOSTING_SERVICES}/${currentId}`, updateHostingServices)
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/services/list-hosting');
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <MainCard title="Cập nhật">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên miền đăng ký</InputLabel>
                  <Select
                    id="domain_service_id"
                    value={domain_service_id}
                    label="Chọn tên miền đăng ký..."
                    onChange={(e) => setDomainServiceId(e.target.value)}
                    disabled
                  >
                    {listDomainServices.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                        {item.domain_plan_id.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Gói dịch vụ hosting</InputLabel>
                  <Select
                    id="hosting_plan_id"
                    value={hosting_plan_id}
                    label="Chọn gói dịch vụ..."
                    onChange={(e) => setHostingPlanId(e.target.value)}
                    disabled
                  >
                    {listHostingPlans.map((item) => (
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
                  <Select
                    id="customer_id"
                    value={customer_id}
                    label="Chọn khách hàng..."
                    onChange={(e) => setCustomerId(e.target.value)}
                    disabled
                  >
                    {listCustomers.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.fullname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleUpdateHostingServices}>
                Cập nhật
              </Button>
            </Item>
          </Grid>
        </Box>
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Cập nhật thành công!</Alert>
      </Snackbar>
    </>
  );
}

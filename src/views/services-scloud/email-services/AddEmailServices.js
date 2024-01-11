import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';

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
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import './styles.css';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';

const LIST_EMAIL_SERVICES = `${config.API_URL}/services/email`;
const LIST_DOMAIN_SERVICES = `${config.API_URL}/services/domain`;
const LIST_EMAIL_PLANS = `${config.API_URL}/plans/email`;
const LIST_CUSTOMERS = `${config.API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddEmailServices() {
  let navigate = useNavigate();

  const [registeredAt, setRegisteredAt] = useState(new Date());
  const [domain_service_id, setDomainServiceId] = useState('');
  const [email_plan_id, setEmailPlanId] = useState('');
  const [periods, setPeriods] = useState('');
  const [customer_id, setCustomerId] = useState('');

  const [listDomainServices, setListDomainServices] = useState([]);
  const [listEmailPlans, setListEmailPlans] = useState([]);
  const [listCustomers, setListCustomers] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListDomainServices();
    loadListEmailPlans();
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListDomainServices = async () => {
    const result = await axios.get(`${LIST_DOMAIN_SERVICES}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setListDomainServices(result.data);
  };

  const loadListEmailPlans = async () => {
    const result = await axios.get(`${LIST_EMAIL_PLANS}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setListEmailPlans(result.data);
  };

  const loadListCustomers = async () => {
    const result = await axios.get(`${LIST_CUSTOMERS}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setListCustomers(result.data);
  };

  const handleAddEmailServices = (e) => {
    e.preventDefault();

    const addEmailServices = {
      registeredAt: registeredAt.getTime(),
      domain_service_id: domain_service_id,
      email_plan_id: email_plan_id,
      periods: periods,
      customer_id: customer_id
    };

    axios
      .post(`${LIST_EMAIL_SERVICES}`, addEmailServices, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/dashboard/services/list-email');
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
                  <Select
                    id="domain_service_id"
                    value={domain_service_id}
                    label="Chọn tên miền đăng ký..."
                    onChange={(e) => setDomainServiceId(e.target.value)}
                  >
                    {listDomainServices.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                        {/* {item.domain_plan_id.name} */}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Gói dịch vụ email</InputLabel>
                  <Select
                    id="email_plan_id"
                    value={email_plan_id}
                    label="Chọn gói dịch vụ..."
                    onChange={(e) => setEmailPlanId(e.target.value)}
                  >
                    {listEmailPlans.map((item) => (
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
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleAddEmailServices}>
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

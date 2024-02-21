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

const LIST_MOBILE_NETWORK_SERVICES = `${config.API_URL}/services/mobile-network`;
const LIST_MOBILE_NETWORK_PLANS = `${config.API_URL}/plans/mobile-network`;
const LIST_CUSTOMERS = `${config.API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddMobileNetworkServices() {
  let navigate = useNavigate();

  const [periods, setPeriods] = useState('');
  const [registeredAt, setRegisteredAt] = useState(new Date());
  const [mobileNetworkPlanId, setMobileNetworkPlanId] = useState('');
  const [customerId, setCustomerId] = useState('');

  const [listMobileNetworkPlans, setListMobileNetworkPlans] = useState([]);
  const [listCustomers, setListCustomers] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListMobileNetworkPlans();
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListMobileNetworkPlans = async () => {
    const result = await axios.get(`${LIST_MOBILE_NETWORK_PLANS}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setListMobileNetworkPlans(result.data);
  };

  const loadListCustomers = async () => {
    const result = await axios.get(`${LIST_CUSTOMERS}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setListCustomers(result.data);
  };

  const handleAddDomainServices = (e) => {
    e.preventDefault();

    const addDomainServices = {
      periods: periods,
      registeredAt: registeredAt.getTime(),
      mobileNetworkPlanId: mobileNetworkPlanId,
      customerId: customerId
    };

    axios
      .post(`${LIST_MOBILE_NETWORK_SERVICES}`, addDomainServices, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/dashboard/services/list-mobile-network');
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
                  <InputLabel>Gói dịch vụ 4G</InputLabel>
                  <Select
                    id="mobileNetworkPlanId"
                    value={mobileNetworkPlanId}
                    label="Chọn gói dịch vụ..."
                    onChange={(e) => setMobileNetworkPlanId(e.target.value)}
                  >
                    {listMobileNetworkPlans.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name} (NMDD: {item.supplierMobileNetworkId.name})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Khách hàng</InputLabel>
                  <Select id="customerId" value={customerId} label="Chọn khách hàng..." onChange={(e) => setCustomerId(e.target.value)}>
                    {listCustomers.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.fullname}
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

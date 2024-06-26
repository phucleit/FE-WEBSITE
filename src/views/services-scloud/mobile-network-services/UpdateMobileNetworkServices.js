import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
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
import { apiGet, apiGetById, apiUpdate, getRegisteredAt, getExpiredAt } from '../../../utils/formatUtils';

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

export default function UpdateMobileNetworkServices() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [periods, setPeriods] = useState('');
  const [registeredAt, setRegisteredAt] = useState('');
  const [expiredAt, setExpiredAt] = useState('');
  const [mobileNetworkPlanId, setMobileNetworkPlanId] = useState('');
  const [customerId, setCustomerId] = useState('');

  const [listMobileNetworkPlans, setListMobileNetworkPlans] = useState([]);
  const [listCustomers, setListCustomers] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadDetailMobileNetworkServices();
    loadListMobileNetworkPlans();
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDetailMobileNetworkServices = async () => {
    const result = await apiGetById(`${LIST_MOBILE_NETWORK_SERVICES}`, currentId);
    setPeriods(result.data.periods);
    setRegisteredAt(getRegisteredAt(result.data.expiredAt));
    setExpiredAt(getExpiredAt(result.data.expiredAt));
    setMobileNetworkPlanId(result.data.mobileNetworkPlanId._id);
    setCustomerId(result.data.customerId._id);
  };

  const loadListMobileNetworkPlans = async () => {
    const result = await apiGet(`${LIST_MOBILE_NETWORK_PLANS}`);
    setListMobileNetworkPlans(result.data);
  };

  const loadListCustomers = async () => {
    const result = await apiGet(`${LIST_CUSTOMERS}`);
    setListCustomers(result.data);
  };

  const handleUpdateNetworkServices = (e) => {
    e.preventDefault();

    const updateMobileNetworkServices = {
      periods: periods,
      mobileNetworkPlanId: mobileNetworkPlanId,
      customerId: customerId
    };

    apiUpdate(`${LIST_MOBILE_NETWORK_SERVICES}`, currentId, updateMobileNetworkServices)
      .then(() => {
        setOpen(true);
        setIntervapiUpdateal(() => {
          navigate('/dashboard/services/list-mobile-network');
          window.location.reload(true);
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
                  <InputLabel>Gói dịch vụ 4G</InputLabel>
                  <Select
                    id="mobileNetworkPlanId"
                    value={mobileNetworkPlanId}
                    label="Chọn gói dịch vụ..."
                    onChange={(e) => setMobileNetworkPlanId(e.target.value)}
                    disabled
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
                  <Select
                    id="customerId"
                    value={customerId}
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
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Ngày đăng ký</InputLabel>
                  <Input id="registeredAt" name="registeredAt" value={registeredAt} disabled />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Ngày hết hạn</InputLabel>
                  <Input id="expiredAt" name="expiredAt" value={expiredAt} disabled />
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
              <Button variant="contained" size="medium" onClick={handleUpdateNetworkServices}>
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

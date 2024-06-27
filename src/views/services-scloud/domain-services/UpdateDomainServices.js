import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

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

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';
import { apiGet, apiGetById, apiUpdate, getRegisteredAt, getExpiredAt } from '../../../utils/formatUtils';

const LIST_DOMAIN_SERVICES = `${config.API_URL}/services/domain`;
const LIST_DOMAIN_PLANS = `${config.API_URL}/plans/domain`;
const LIST_CUSTOMERS = `${config.API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateDomainServices() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [name, setName] = useState('');
  const [periods, setPeriods] = useState('');
  const [registeredAt, setRegisteredAt] = useState('');
  const [expiredAt, setExpiredAt] = useState('');
  const [domainPlanId, setDomainPlanId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [pingCloudflare, setPingCloudflare] = useState('');
  const [before_payment, setBeforePayment] = useState(false);
  const [after_payment, setAfterPayment] = useState(false);

  const [listDomainPlans, setListDomainPlans] = useState([]);
  const [listCustomers, setListCustomers] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadDetailDomainServices();
    loadListDomainPlans();
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDetailDomainServices = async () => {
    const result = await apiGetById(`${LIST_DOMAIN_SERVICES}`, currentId);
    setName(result.data.name);
    setPeriods(result.data.periods);
    setRegisteredAt(getRegisteredAt(result.data.expiredAt));
    setExpiredAt(getExpiredAt(result.data.expiredAt));
    setDomainPlanId(result.data.domain_plan_id._id);
    setCustomerId(result.data.customer_id._id);
    setPingCloudflare(result.data.ping_cloudflare);
    setBeforePayment(result.data.before_payment);
    setAfterPayment(result.data.after_payment);
  };

  const loadListDomainPlans = async () => {
    const result = await apiGet(`${LIST_DOMAIN_PLANS}`);
    setListDomainPlans(result.data);
  };

  const loadListCustomers = async () => {
    const result = await apiGet(`${LIST_CUSTOMERS}`);
    setListCustomers(result.data);
  };

  const handleChangeBeforePayment = (e) => {
    setBeforePayment(e.target.checked);
  };

  const handleChangeAfterPayment = (e) => {
    setAfterPayment(e.target.checked);
  };

  const handleChangePingCloudflare = (e) => {
    setPingCloudflare(e.target.checked);
  };

  const handleUpdateDomainServices = (e) => {
    e.preventDefault();

    const updateDomainServices = {
      name: name,
      periods: periods,
      domain_plan_id: domainPlanId,
      customer_id: customerId,
      ping_cloudflare: pingCloudflare,
      before_payment: before_payment,
      after_payment: after_payment
    };

    apiUpdate(`${LIST_DOMAIN_SERVICES}`, currentId, updateDomainServices)
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
      <MainCard title="Cập nhật">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên miền đăng ký</InputLabel>
                  <Input id="name" name="name" value={name} disabled placeholder="Nhập tên đăng ký..." />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Gói dịch vụ tên miền</InputLabel>
                  <Select id="domainPlanId" value={domainPlanId} label="Chọn gói dịch vụ..." disabled>
                    {listDomainPlans.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name} (NCC: {item.supplier_id.name})
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
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Khách hàng</InputLabel>
                  <Select id="customerId" value={customerId} label="Chọn khách hàng..." disabled>
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
                  <FormLabel component="legend">Gia hạn trước khi thanh toán</FormLabel>
                  <Switch checked={before_payment} onChange={handleChangeBeforePayment} />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <FormLabel component="legend">Gia hạn sau khi thanh toán</FormLabel>
                  <Switch checked={after_payment} onChange={handleChangeAfterPayment} />
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
              <Button variant="contained" size="medium" onClick={handleUpdateDomainServices}>
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

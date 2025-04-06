import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import {
  Box,
  Paper,
  Grid,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  Button,
  Alert,
  Snackbar,
  MenuItem,
  Select,
  Switch
} from '@mui/material';

import { apiGet, apiGetById, apiUpdate, getRegisteredAt, getExpiredAt, getRoles } from '../../../utils/formatUtils';

const LIST_EMAIL_SERVICES = `${process.env.REACT_APP_API_URL}/services/email`;
const LIST_DOMAIN_SERVICES = `${process.env.REACT_APP_API_URL}/services/domain`;
const LIST_EMAIL_PLANS = `${process.env.REACT_APP_API_URL}/plans/email`;
const LIST_CUSTOMERS = `${process.env.REACT_APP_API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateEmailServices() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionUpdate, setPermissionUpdate] = useState(false);

  const [registeredAt, setRegisteredAt] = useState('');
  const [expiredAt, setExpiredAt] = useState('');
  const [domainServiceId, setDomainServiceId] = useState('');
  const [emailPlanId, setEmailPlanId] = useState('');
  const [periods, setPeriods] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [beforePayment, setBeforePayment] = useState(false);
  const [afterPayment, setAfterPayment] = useState(false);

  const [listDomainServices, setListDomainServices] = useState([]);
  const [listEmailPlans, setListEmailPlans] = useState([]);
  const [listCustomers, setListCustomers] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadDetailHostingServices();
    loadListDomainServices();
    loadListEmailPlans();
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667467eb263fb998b9925d35');

      if (filteredUpdate.length > 0) {
        setPermissionUpdate(true);
      } else {
        setPermissionUpdate(false);
      }
    }
  }, [dataRoles]);

  const loadListRoles = async () => {
    const result = await getRoles();
    setDataRoles(result.data);
  };

  const loadDetailHostingServices = async () => {
    const result = await apiGetById(`${LIST_EMAIL_SERVICES}`, currentId);
    setRegisteredAt(getRegisteredAt(result.data.registeredAt));
    setExpiredAt(getExpiredAt(result.data.expiredAt));
    setDomainServiceId(result.data.domain_service_id._id);
    setEmailPlanId(result.data.email_plan_id._id);
    setPeriods(result.data.periods);
    setCustomerId(result.data.customer_id._id);
    setBeforePayment(result.data.before_payment);
    setAfterPayment(result.data.after_payment);
  };

  const loadListDomainServices = async () => {
    const result = await apiGet(`${LIST_DOMAIN_SERVICES}`);
    setListDomainServices(result.data);
  };

  const loadListEmailPlans = async () => {
    const result = await apiGet(`${LIST_EMAIL_PLANS}`);
    setListEmailPlans(result.data);
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

  const handleUpdateEmailServices = (e) => {
    e.preventDefault();

    const updateEmailServices = {
      domain_service_id: domainServiceId,
      email_plan_id: emailPlanId,
      periods: periods,
      customer_id: customerId,
      before_payment: beforePayment,
      after_payment: afterPayment
    };

    apiUpdate(`${LIST_EMAIL_SERVICES}`, currentId, updateEmailServices)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/dich-vu/danh-sach-email');
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return permissionUpdate ? (
    <>
      <MainCard title="Cập nhật">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên miền đăng ký</InputLabel>
                  <Select
                    id="domainServiceId"
                    value={domainServiceId}
                    label="Chọn tên miền đăng ký..."
                    onChange={(e) => setDomainServiceId(e.target.value)}
                    disabled
                  >
                    {listDomainServices.map((item) => (
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
                  <InputLabel>Gói dịch vụ email</InputLabel>
                  <Select
                    id="emailPlanId"
                    value={emailPlanId}
                    label="Chọn gói dịch vụ..."
                    onChange={(e) => setEmailPlanId(e.target.value)}
                    disabled
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
            {!afterPayment && (
              <Grid item xs={6}>
                <Item>
                  <FormControl variant="standard" fullWidth>
                    <FormLabel component="legend">Gia hạn trước khi thanh toán</FormLabel>
                    <Switch checked={beforePayment} onChange={handleChangeBeforePayment} />
                  </FormControl>
                </Item>
              </Grid>
            )}
            {!beforePayment && (
              <Grid item xs={6}>
                <Item>
                  <FormControl variant="standard" fullWidth>
                    <FormLabel component="legend">Gia hạn sau khi thanh toán</FormLabel>
                    <Switch checked={afterPayment} onChange={handleChangeAfterPayment} />
                  </FormControl>
                </Item>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleUpdateEmailServices}>
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
  ) : (
    <div>Bạn không có quyền truy cập!</div>
  );
}

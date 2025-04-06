import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';

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

import './styles.css';
import { apiGet, apiPost, getRoles } from '../../../utils/formatUtils';

const LIST_DOMAIN_ITVT = `${process.env.REACT_APP_API_URL}/itvt/domain`;
const LIST_DOMAIN_PLANS = `${process.env.REACT_APP_API_URL}/plans/domain`;
const LIST_SERVER_PLANS = `${process.env.REACT_APP_API_URL}/plans/server`;
const LIST_CUSTOMERS = `${process.env.REACT_APP_API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddDomainITVT() {
  let navigate = useNavigate();

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);

  const [name, setName] = useState('');
  const [periods, setPeriods] = useState('');
  const [registeredAt, setRegisteredAt] = useState(new Date());
  const [domainPlanId, setDomainPlanId] = useState('');
  const [serverPlanId, setServerPlanId] = useState('');
  const [pingCloudflare, setPingCloudflare] = useState(false);
  const [customerId, setCustomerId] = useState('');

  const [listDomainPlans, setListDomainPlans] = useState([]);
  const [listServerPlans, setListServerPlans] = useState([]);
  const [listCustomers, setListCustomers] = useState([]);

  const [open, setOpen] = useState(false);
  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    loadListRoles();
    loadListDomainPlans();
    loadListServerPlans();
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667467eb263fb998b9925d2e');
      if (filteredAdd.length > 0) {
        setPermissionAdd(true);
      } else {
        setPermissionAdd(false);
      }
    }
  }, [dataRoles]);

  const loadListRoles = async () => {
    const result = await getRoles();
    setDataRoles(result.data);
  };

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

  const handleCloseError = () => {
    setopenError(false);
  };

  const handleAddDomainITVT = (e) => {
    e.preventDefault();
    if (name == '') {
      setMessageError('Vui lòng nhập tên miền đăng ký!');
      setopenError(true);
      return;
    }

    if (domainPlanId == '') {
      setMessageError('Vui lòng chọn gói dịch vụ!');
      setopenError(true);
      return;
    }

    if (periods == '') {
      setMessageError('Vui lòng chọn thời gian đăng ký!');
      setopenError(true);
      return;
    }

    if (customerId == '') {
      setMessageError('Vui lòng chọn khách hàng!');
      setopenError(true);
      return;
    }

    if (serverPlanId == '') {
      setMessageError('Vui lòng chọn server!');
      setopenError(true);
      return;
    }

    const addDomainITVT = {
      name: name,
      domain_plan_id: domainPlanId,
      registeredAt: registeredAt.getTime(),
      periods: periods,
      customer_id: customerId,
      server_plan_id: serverPlanId,
      ping_cloudflare: pingCloudflare
    };

    apiPost(`${LIST_DOMAIN_ITVT}`, addDomainITVT)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/itvt/danh-sach-ten-mien-itvt');
        }, 1500);
      })
      .catch((error) => {
        setMessageError(error.response.data.message);
        setopenError(true);
      });
  };

  return permissionAdd ? (
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
              <Button variant="contained" size="medium" onClick={handleAddDomainITVT}>
                Thêm mới
              </Button>
            </Item>
          </Grid>
        </Box>
      </MainCard>
      <Snackbar
        open={openError}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1500}
      >
        <Alert severity="error">{messageError}</Alert>
      </Snackbar>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Thêm thành công!</Alert>
      </Snackbar>
    </>
  ) : (
    <div>Bạn không có quyền truy cập!</div>
  );
}

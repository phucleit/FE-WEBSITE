import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Paper, Grid, FormControl, InputLabel, Button, Alert, Snackbar, MenuItem, Select } from '@mui/material';

import './styles.css';
import { apiGet, apiPost, getRoles } from '../../../utils/formatUtils';

const LIST_SSL_ITVT = `${process.env.REACT_APP_API_URL}/itvt/ssl`;
const LIST_DOMAIN_ITVT = `${process.env.REACT_APP_API_URL}/itvt/domain`;
const LIST_SSL_PLANS = `${process.env.REACT_APP_API_URL}/plans/ssl`;
const LIST_CUSTOMERS = `${process.env.REACT_APP_API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddSslITVT() {
  let navigate = useNavigate();

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);

  const [registeredAt, setRegisteredAt] = useState(new Date());
  const [domainITVTId, setDomainITVTId] = useState('');
  const [sslPlanId, setSslPlanId] = useState('');
  const [periods, setPeriods] = useState('');
  const [customerId, setCustomerId] = useState('');

  const [listDomainITVT, setListDomainITVT] = useState([]);
  const [listSslPlans, setListSslPlans] = useState([]);
  const [listCustomers, setListCustomers] = useState([]);

  const [open, setOpen] = useState(false);
  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    loadListRoles();
    loadListDomainITVT();
    loadListSslPlans();
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667467eb263fb998b9925d37');
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

  const loadListDomainITVT = async () => {
    const result = await apiGet(`${LIST_DOMAIN_ITVT}`);
    setListDomainITVT(result.data);
  };

  const loadListSslPlans = async () => {
    const result = await apiGet(`${LIST_SSL_PLANS}`);
    setListSslPlans(result.data);
  };

  const loadListCustomers = async () => {
    const result = await apiGet(`${LIST_CUSTOMERS}`);
    setListCustomers(result.data);
  };

  const handleCloseError = () => {
    setopenError(false);
  };

  const handleAddSslITVT = (e) => {
    e.preventDefault();
    if (domainITVTId == '') {
      setMessageError('Vui lòng chọn tên miền đăng ký!');
      setopenError(true);
      return;
    }

    if (sslPlanId == '') {
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

    const addSslITVT = {
      domain_itvt_id: domainITVTId,
      ssl_plan_id: sslPlanId,
      periods: periods,
      registeredAt: registeredAt.getTime(),
      customer_id: customerId
    };

    apiPost(`${LIST_SSL_ITVT}`, addSslITVT)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/itvt/danh-sach-ssl-itvt');
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
                  <Select
                    id="domainITVTId"
                    value={domainITVTId}
                    label="Chọn tên miền đăng ký..."
                    onChange={(e) => setDomainITVTId(e.target.value)}
                  >
                    {listDomainITVT.map((item) => (
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
                  <InputLabel>Gói dịch vụ SSL</InputLabel>
                  <Select id="sslPlanId" value={sslPlanId} label="Chọn gói dịch vụ..." onChange={(e) => setSslPlanId(e.target.value)}>
                    {listSslPlans.map((item) => (
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
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleAddSslITVT}>
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

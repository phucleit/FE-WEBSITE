import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Paper, Grid, FormControl, Input, InputLabel, Button, Alert, Snackbar, MenuItem, Select } from '@mui/material';

import { apiGet, apiGetById, apiUpdate, getRegisteredAt, getExpiredAt, getRoles } from '../../../utils/formatUtils';

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

export default function UpdateSslITVT() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionUpdate, setPermissionUpdate] = useState(false);

  const [registeredAt, setRegisteredAt] = useState('');
  const [expiredAt, setExpiredAt] = useState('');
  const [domainITVTId, setDomainITVTId] = useState('');
  const [sslPlanId, setSslPlanId] = useState('');
  const [periods, setPeriods] = useState('');
  const [customerId, setCustomerId] = useState('');

  const [listDomainITVT, setListDomainITVT] = useState([]);
  const [listSslPlans, setListSslPlans] = useState([]);
  const [listCustomers, setListCustomers] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadDetailSslITVT();
    loadListDomainITVT();
    loadListSslPlans();
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667467eb263fb998b9925d38');

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

  const loadDetailSslITVT = async () => {
    const result = await apiGetById(`${LIST_SSL_ITVT}`, currentId);
    setRegisteredAt(getRegisteredAt(result.data.registeredAt));
    setExpiredAt(getExpiredAt(result.data.expiredAt));
    setDomainITVTId(result.data.domain_itvt_id._id);
    setSslPlanId(result.data.ssl_plan_id._id);
    setPeriods(result.data.periods);
    setCustomerId(result.data.customer_id._id);
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

  const handleUpdateSslITVT = (e) => {
    e.preventDefault();

    const updateSslITVT = {
      domain_itvt_id: domainITVTId,
      ssl_plan_id: sslPlanId,
      periods: periods,
      customer_id: customerId
    };

    apiUpdate(`${LIST_SSL_ITVT}`, currentId, updateSslITVT)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/itvt/danh-sach-ssl-itvt');
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
                    id="domainITVTId"
                    value={domainITVTId}
                    label="Chọn tên miền đăng ký..."
                    onChange={(e) => setDomainITVTId(e.target.value)}
                    disabled
                  >
                    {listDomainITVT.map((item) => (
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
                  <InputLabel>Gói dịch vụ SSL</InputLabel>
                  <Select
                    id="sslPlanId"
                    value={sslPlanId}
                    label="Chọn gói dịch vụ..."
                    onChange={(e) => setSslPlanId(e.target.value)}
                    disabled
                  >
                    {listSslPlans.map((item) => (
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
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleUpdateSslITVT}>
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

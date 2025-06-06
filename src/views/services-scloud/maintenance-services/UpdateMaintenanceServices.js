import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Paper, Grid, FormControl, Input, InputLabel, Button, Alert, Snackbar, MenuItem, Select } from '@mui/material';

import { apiGet, apiGetById, apiUpdate, getRegisteredAt, getExpiredAt, getRoles } from '../../../utils/formatUtils';

const LIST_MAINTENANCE_SERVICES = `${process.env.REACT_APP_API_URL}/services/maintenance`;
const LIST_MAINTENANCE_PLANS = `${process.env.REACT_APP_API_URL}/plans/maintenance`;
const LIST_DOMAIN_SERVICES = `${process.env.REACT_APP_API_URL}/services/domain`;
const LIST_CUSTOMERS = `${process.env.REACT_APP_API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateMaintenanceServices() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionUpdate, setPermissionUpdate] = useState(false);

  const [maintenancePlanId, setMaintenancePlanId] = useState('');
  const [domainServiceId, setDomainServiceId] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [periods, setPeriods] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [registeredAt, setRegisteredAt] = useState('');
  const [expiredAt, setExpiredAt] = useState('');

  const [listMaintenancePlans, setListMaintenancePlans] = useState([]);
  const [listDomainServices, setListDomainServices] = useState([]);
  const [listCustomers, setListCustomers] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadDetailMaintenanceServices();
    loadListMaintenacePlans();
    loadListDomainServices();
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667467eb263fb998b9925d3e');

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

  const loadDetailMaintenanceServices = async () => {
    const result = await apiGetById(`${LIST_MAINTENANCE_SERVICES}`, currentId);
    setServiceType(result.data.service_type);
    setMaintenancePlanId(result.data.maintenance_plan_id._id);
    setDomainServiceId(result.data.domain_service_id._id);
    setPeriods(result.data.periods);
    setCustomerId(result.data.customer_id._id);
    setRegisteredAt(getRegisteredAt(result.data.registeredAt));
    setExpiredAt(getExpiredAt(result.data.expiredAt));
  };

  const loadListDomainServices = async () => {
    const result = await apiGet(`${LIST_DOMAIN_SERVICES}`);
    setListDomainServices(result.data);
  };

  const loadListMaintenacePlans = async () => {
    const result = await apiGet(`${LIST_MAINTENANCE_PLANS}`);
    setListMaintenancePlans(result.data);
  };

  const loadListCustomers = async () => {
    const result = await apiGet(`${LIST_CUSTOMERS}`);
    setListCustomers(result.data);
  };

  const handleUpdateMaintenanceServices = (e) => {
    e.preventDefault();

    const updateMaintenanceServices = {
      maintenance_plan_id: maintenancePlanId,
      domain_service_id: domainServiceId,
      service_type: serviceType,
      periods: periods,
      customer_id: customerId
    };

    apiUpdate(`${LIST_MAINTENANCE_SERVICES}`, currentId, updateMaintenanceServices)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/dich-vu/danh-sach-bao-tri');
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
                  <InputLabel>Gói dịch vụ bảo trì</InputLabel>
                  <Select
                    id="maintenancePlanId"
                    value={maintenancePlanId}
                    label="Chọn gói dịch vụ..."
                    onChange={(e) => setMaintenancePlanId(e.target.value)}
                    disabled
                  >
                    {listMaintenancePlans.map((item) => (
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
                  <InputLabel>Loại dịch vụ</InputLabel>
                  <Select
                    disabled
                    id="serviceType"
                    value={serviceType}
                    label="Loại dịch vụ"
                    onChange={(e) => setServiceType(e.target.value)}
                  >
                    <MenuItem value={13}>Tên miền</MenuItem>
                    <MenuItem value={14}>Hosting</MenuItem>
                    <MenuItem value={15}>Email</MenuItem>
                    <MenuItem value={16}>SSL</MenuItem>
                    <MenuItem value={17}>Thiết kế website</MenuItem>
                    <MenuItem value={18}>Viết bài Content & PR</MenuItem>
                    <MenuItem value={19}>Toplist Vũng Tàu</MenuItem>
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
                    <MenuItem value={1}>1 tháng</MenuItem>
                    <MenuItem value={2}>2 tháng</MenuItem>
                    <MenuItem value={3}>3 tháng</MenuItem>
                    <MenuItem value={4}>4 tháng</MenuItem>
                    <MenuItem value={5}>5 tháng</MenuItem>
                    <MenuItem value={6}>6 tháng</MenuItem>
                    <MenuItem value={7}>7 tháng</MenuItem>
                    <MenuItem value={8}>8 tháng</MenuItem>
                    <MenuItem value={9}>9 tháng</MenuItem>
                    <MenuItem value={10}>10 tháng</MenuItem>
                    <MenuItem value={11}>11 tháng</MenuItem>
                    <MenuItem value={12}>12 tháng</MenuItem>
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
              <Button variant="contained" size="medium" onClick={handleUpdateMaintenanceServices}>
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

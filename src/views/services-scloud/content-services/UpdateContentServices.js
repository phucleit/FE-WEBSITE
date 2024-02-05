import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';
import { getRegisteredAt, getExpiredAt } from '../../../utils/formatUtils';

const LIST_CONTENT_SERVICES = `${config.API_URL}/services/content`;
const LIST_CONTENT_PLANS = `${config.API_URL}/plans/content`;
const LIST_CUSTOMERS = `${config.API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateContentServices() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [registeredAt, setRegisteredAt] = useState('');
  const [expiredAt, setExpiredAt] = useState('');
  const [content_plan_id, setContentPlanId] = useState('');
  const [periods, setPeriods] = useState('');
  const [customer_id, setCustomerId] = useState('');

  const [listContentPlans, setListContentPlans] = useState([]);
  const [listCustomers, setListCustomers] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadDetailContentServices();
    loadListContentPlans();
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDetailContentServices = async () => {
    const result = await axios.get(`${LIST_CONTENT_SERVICES}/${currentId}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setRegisteredAt(getRegisteredAt(result.data.registeredAt));
    setExpiredAt(getExpiredAt(result.data.expiredAt));
    setContentPlanId(result.data.content_plan_id._id);
    setPeriods(result.data.periods);
    setCustomerId(result.data.customer_id._id);
  };

  const loadListContentPlans = async () => {
    const result = await axios.get(`${LIST_CONTENT_PLANS}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setListContentPlans(result.data);
  };

  const loadListCustomers = async () => {
    const result = await axios.get(`${LIST_CUSTOMERS}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setListCustomers(result.data);
  };

  const handleUpdateContentServices = (e) => {
    e.preventDefault();

    const updateContentServices = {
      content_plan_id: content_plan_id,
      periods: periods,
      customer_id: customer_id
    };

    axios
      .put(`${LIST_CONTENT_SERVICES}/${currentId}`, updateContentServices, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/dashboard/services/list-content');
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
                  <InputLabel>Gói dịch vụ content</InputLabel>
                  <Select
                    id="content_plan_id"
                    value={content_plan_id}
                    label="Chọn gói dịch vụ..."
                    onChange={(e) => setContentPlanId(e.target.value)}
                    disabled
                  >
                    {listContentPlans.map((item) => (
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
              <Button variant="contained" size="medium" onClick={handleUpdateContentServices}>
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

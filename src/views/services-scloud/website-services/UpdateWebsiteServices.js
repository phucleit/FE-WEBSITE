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

const LIST_WEBSITE_SERVICES = `${config.API_URL}/services/website`;
const LIST_DOMAIN_SERVICES = `${config.API_URL}/services/domain`;
const LIST_CUSTOMERS = `${config.API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateWebsiteServices() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [domain_service_id, setDomainServiceId] = useState('');
  const [price, setPrice] = useState('');
  const [customer_id, setCustomerId] = useState('');
  const [status, setStatusService] = useState('');

  const [listDomainServices, setListDomainServices] = useState([]);
  const [listCustomers, setListCustomers] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadDetailWebsiteServices();
    loadListDomainServices();
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDetailWebsiteServices = async () => {
    const result = await axios.get(`${LIST_WEBSITE_SERVICES}/${currentId}`);
    setDomainServiceId(result.data.domain_service_id._id);
    setPrice(result.data.price);
    setCustomerId(result.data.customer_id._id);
    setStatusService(result.data.status);
  };

  const loadListDomainServices = async () => {
    const result = await axios.get(`${LIST_DOMAIN_SERVICES}`);
    setListDomainServices(result.data);
  };

  const loadListCustomers = async () => {
    const result = await axios.get(`${LIST_CUSTOMERS}`);
    setListCustomers(result.data);
  };

  const handleUpdateWebsiteServices = (e) => {
    e.preventDefault();

    const updateWebsiteServices = {
      domain_service_id: domain_service_id,
      price: price,
      customer_id: customer_id,
      status: status
    };

    axios
      .put(`${LIST_WEBSITE_SERVICES}/${currentId}`, updateWebsiteServices)
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/services/list-website');
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
                  <Select
                    id="domain_service_id"
                    value={domain_service_id}
                    label="Chọn tên miền đăng ký..."
                    onChange={(e) => setDomainServiceId(e.target.value)}
                    disabled
                  >
                    {listDomainServices.map((item) => (
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
                  <InputLabel>Chi phí</InputLabel>
                  <Input
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required={true}
                    placeholder="Nhập chi phí..."
                  />
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
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Trạng thái</InputLabel>
                  <Select id="status" value={status} label="Chọn trạng thái..." onChange={(e) => setStatusService(e.target.value)}>
                    <MenuItem value={1}>Đang hoạt động</MenuItem>
                    <MenuItem value={2}>Đã đóng</MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleUpdateWebsiteServices}>
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

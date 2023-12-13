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

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';
import ListSupplierPlans from './ListSupplierPlans';

const LIST_SUPPLIER = `${config.API_URL}/supplier`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateSuppliers() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadDetailSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDetailSuppliers = async () => {
    const result = await axios.get(`${LIST_SUPPLIER}/${currentId}`);
    setName(result.data.name);
    setCompany(result.data.company);
    setPhone(result.data.phone);
    setAddress(result.data.address);
  };

  const handleUpdateSuppliers = (e) => {
    e.preventDefault();
    if (name == '') {
      alert('Vui lòng nhập tên nhà cung cấp!');
      return;
    }

    if (company == '') {
      alert('Vui lòng nhập tên công ty!');
      return;
    }

    if (phone == '') {
      alert('Vui lòng nhập số điện thoại!');
      return;
    }

    if (address == '') {
      alert('Vui lòng nhập địa chỉ!');
      return;
    }

    const updateSuppliers = {
      name: name,
      company: company,
      phone: phone,
      address: address
    };

    axios
      .put(`${LIST_SUPPLIER}/${currentId}`, updateSuppliers)
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/suppliers/list-suppliers');
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
                  <InputLabel>Tên nhà cung cấp</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên nhà cung cấp..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên công ty</InputLabel>
                  <Input
                    id="company"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required={true}
                    placeholder="Nhập tên công ty..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Số điện thoại</InputLabel>
                  <Input
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required={true}
                    placeholder="Nhập số điện thoại..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Địa chỉ</InputLabel>
                  <Input
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required={true}
                    placeholder="Nhập địa chỉ..."
                  />
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleUpdateSuppliers}>
                Cập nhật
              </Button>
            </Item>
          </Grid>
        </Box>
      </MainCard>
      <ListSupplierPlans />
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Cập nhật thành công!</Alert>
      </Snackbar>
    </>
  );
}

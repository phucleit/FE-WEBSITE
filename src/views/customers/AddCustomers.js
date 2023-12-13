import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
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

const LIST_CUSTOMERS = `${config.API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddCustomers() {
  let navigate = useNavigate();

  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [open, setOpen] = useState(false);

  const handleAddCustomers = (e) => {
    e.preventDefault();
    if (fullname == '') {
      alert('Vui lòng nhập họ và tên!');
      return;
    }

    if (email == '') {
      alert('Vui lòng nhập địa chỉ email!');
      return;
    }

    if (idNumber == '') {
      alert('Vui lòng nhập số CCCD!');
      return;
    }

    if (phone == '') {
      alert('Vui lòng nhập số điện thoại!');
      return;
    }

    const addCustomers = {
      fullname: fullname,
      email: email,
      gender: gender,
      idNumber: idNumber,
      phone: phone,
      address: address
    };

    axios
      .post(`${LIST_CUSTOMERS}`, addCustomers)
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/customers/list-customers');
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
                  <InputLabel>Họ và tên</InputLabel>
                  <Input
                    id="fullname"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    required={true}
                    placeholder="Nhập họ và tên..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Địa chỉ email</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                    placeholder="Nhập địa chỉ email..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Giới tính</InputLabel>
                  <Input
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required={true}
                    placeholder="Nhập giới tính..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>CCCD</InputLabel>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    required={true}
                    placeholder="Nhập số CCCD..."
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
              <Button variant="contained" size="medium" onClick={handleAddCustomers}>
                Thêm mới
              </Button>
            </Item>
          </Grid>
        </Box>
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Thêm thành công!</Alert>
      </Snackbar>
    </>
  );
}

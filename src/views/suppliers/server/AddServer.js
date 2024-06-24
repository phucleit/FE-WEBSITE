import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

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

import config from '../../../config';
import { apiPost } from '../../../utils/formatUtils';

const LIST_SERVER = `${config.API_URL}/server`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddServer() {
  let navigate = useNavigate();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [phone, setPhone] = useState('');
  const [nameSupport, setNameSupport] = useState('');
  const [phoneSupport, setPhoneSupport] = useState('');
  const [address, setAddress] = useState('');

  const [open, setOpen] = useState(false);

  const handleAddServer = (e) => {
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

    const addServer = {
      name: name,
      company: company,
      tax_code: taxCode,
      phone: phone,
      name_support: nameSupport,
      phone_support: phoneSupport,
      address: address
    };

    apiPost(`${LIST_SERVER}`, addServer)
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/dashboard/suppliers/server/list-server');
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
                  <InputLabel>Mã số thuế</InputLabel>
                  <Input
                    id="taxCode"
                    name="taxCode"
                    value={taxCode}
                    onChange={(e) => setTaxCode(e.target.value)}
                    required={true}
                    placeholder="Nhập mã số thuế..."
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
                  <InputLabel>Tên hỗ trợ viên</InputLabel>
                  <Input
                    id="nameSupport"
                    name="nameSupport"
                    value={nameSupport}
                    onChange={(e) => setNameSupport(e.target.value)}
                    required={true}
                    placeholder="Nhập tên hỗ trợ viên..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Hotline hỗ trợ viên</InputLabel>
                  <Input
                    id="phoneSupport"
                    name="phoneSupport"
                    value={phoneSupport}
                    onChange={(e) => setPhoneSupport(e.target.value)}
                    required={true}
                    placeholder="Nhập hotline hỗ trợ viên..."
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
              <Button variant="contained" size="medium" onClick={handleAddServer}>
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

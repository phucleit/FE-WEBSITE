import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Paper, Grid, FormControl, Input, InputLabel, Button, Alert, Snackbar } from '@mui/material';

import config from '../../../config';
import { apiGetById, apiUpdate } from '../../../utils/formatUtils';

const LIST_SERVER = `${config.API_URL}/server`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateServer() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [phone, setPhone] = useState('');
  const [nameSupport, setNameSupport] = useState('');
  const [phoneSupport, setPhoneSupport] = useState('');
  const [address, setAddress] = useState('');

  const [open, setOpen] = useState(false);
  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    loadDetailServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseError = () => {
    setopenError(false);
  };

  const loadDetailServer = async () => {
    const result = await apiGetById(`${LIST_SERVER}`, currentId);
    setName(result.data.name);
    setCompany(result.data.company);
    setTaxCode(result.data.tax_code);
    setPhone(result.data.phone);
    setNameSupport(result.data.name_support);
    setPhoneSupport(result.data.phone_support);
    setAddress(result.data.address);
  };

  const handleUpdateServer = (e) => {
    e.preventDefault();
    if (name == '') {
      setMessageError('Vui lòng nhập tên nhà cung cấp!');
      setopenError(true);
      return;
    }

    if (company == '') {
      setMessageError('Vui lòng nhập tên công ty!');
      setopenError(true);
      return;
    }

    if (phone == '') {
      setMessageError('Vui lòng nhập số điện thoại!');
      setopenError(true);
      return;
    }

    if (address == '') {
      setMessageError('Vui lòng nhập địa chỉ!');
      setopenError(true);
      return;
    }

    const updateServer = {
      name: name,
      company: company,
      tax_code: taxCode,
      phone: phone,
      name_support: nameSupport,
      phone_support: phoneSupport,
      address: address
    };

    apiUpdate(`${LIST_SERVER}`, currentId, updateServer)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/nha-cung-cap/server/danh-sach-server');
        }, 1500);
      })
      .catch((error) => {
        setMessageError(error.response.data.message);
        setopenError(true);
      });
  };

  return (
    <>
      <MainCard title="Cập nhật">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off" onSubmit={handleUpdateServer}>
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
              <Button variant="contained" size="medium" type="submit">
                Cập nhật
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
        <Alert severity="success">Cập nhật thành công!</Alert>
      </Snackbar>
    </>
  );
}

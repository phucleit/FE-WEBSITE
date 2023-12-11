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

import config from '../../../config';

const LIST_EMAIL_PLANS = `${config.API_URL}/plans/email`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateEmailPlans() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [account, setAccount] = useState('');
  const [capacity, setCapacity] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadDetailEmailPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDetailEmailPlans = async () => {
    const result = await axios.get(`${LIST_EMAIL_PLANS}/${currentId}`);
    setName(result.data.name);
    setPrice(result.data.price);
    setAccount(result.data.account);
    setCapacity(result.data.capacity);
  };

  const handleUpdateEmailPlans = (e) => {
    e.preventDefault();
    if (name == '') {
      alert('Vui lòng nhập tên gói email!');
      return;
    }

    if (price == '') {
      alert('Vui lòng nhập chi phí email!');
      return;
    }

    if (account == '') {
      alert('Vui lòng nhập số lượng tài khoản!');
      return;
    }

    if (capacity == '') {
      alert('Vui lòng nhập dung lượng!');
      return;
    }

    const updateEmailPlans = {
      name: name,
      price: price,
      account: account,
      capacity: capacity
    };

    axios
      .put(`${LIST_EMAIL_PLANS}/${currentId}`, updateEmailPlans)
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/plans/list-email');
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
                <FormControl variant="standard">
                  <InputLabel>Tên gói email</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên gói email..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard">
                  <InputLabel>Chi phí</InputLabel>
                  <Input
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required={true}
                    placeholder="Nhập chi phí email..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard">
                  <InputLabel>Tài khoản</InputLabel>
                  <Input
                    id="account"
                    name="account"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    required={true}
                    placeholder="Nhập số lượng tài khoản..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard">
                  <InputLabel>Dung lượng</InputLabel>
                  <Input
                    id="capacity"
                    name="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required={true}
                    placeholder="Nhập dung lượng..."
                  />
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleUpdateEmailPlans}>
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

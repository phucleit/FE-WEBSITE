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

const LIST_USER = `${config.API_URL}/users`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateUser() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadDetailUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDetailUser = async () => {
    const result = await axios.get(`${LIST_USER}/${currentId}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setUsername(result.data.username);
    setEmail(result.data.email);
    setPassword(result.data.password);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (username == '') {
      alert('Vui lòng nhập username!');
      return;
    }

    if (email == '') {
      alert('Vui lòng nhập email!');
      return;
    }

    if (password == '') {
      alert('Vui lòng nhập mật khẩu!');
      return;
    }

    const updateUser = {
      username: username,
      email: email,
      password: password
    };

    const config_header = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    };

    axios
      .put(`${LIST_USER}/${currentId}`, updateUser, config_header)
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/users/list-users');
          window.location.reload(true);
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <MainCard title="Cập nhật">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên đăng nhập</InputLabel>
                  <Input
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={true}
                    placeholder="Nhập tên đăng nhập..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Email</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                    placeholder="Nhập email..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Mật khẩu</InputLabel>
                  <Input
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                    placeholder="Nhập mật khẩu..."
                  />
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleUpdateUser}>
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

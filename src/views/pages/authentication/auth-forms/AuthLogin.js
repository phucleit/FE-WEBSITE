import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputAdornment, IconButton, Paper, Box, Grid, FormControl, Input, InputLabel, Button, Alert, Snackbar } from '@mui/material';

const LOGIN_USER = `${process.env.REACT_APP_API_URL}/login`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function Signin() {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const info = {
      username: username,
      password: password
    };

    try {
      const res = await fetch(`${LOGIN_USER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info),
        credentials: 'include'
      });

      const status = res.status;

      if (status === 200) {
        const data = await res.json();
        const { token, display_name, group_user_id } = data;

        Cookies.set('token', token, { expires: 7 });
        Cookies.set('display_name', display_name, { expires: 7 });
        Cookies.set('group_user_id', group_user_id, { expires: 7 });

        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu');
        }, 1100);

        setUsername('');
        setPassword('');
      } else {
        const errorData = await res.json();
        setMessageError(errorData.message);
        setopenError(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setopenError(true);
    }
  };

  const handleCloseError = () => {
    setopenError(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignin(e);
    }
  };

  return (
    <>
      <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
        <Grid item xs={12}>
          <Item style={{ boxShadow: 'none' }}>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Tên đăng nhập</InputLabel>
              <Input
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                required={true}
                placeholder="Nhập tên đăng nhập..."
              />
            </FormControl>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item style={{ boxShadow: 'none' }}>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Mật khẩu</InputLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                required={true}
                placeholder="Nhập mật khẩu..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item style={{ boxShadow: 'none', textAlign: 'center' }}>
            <Button variant="contained" size="medium" onClick={handleSignin}>
              Đăng nhập
            </Button>
          </Item>
        </Grid>
      </Box>
      <Snackbar
        open={openError}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      >
        <Alert severity="error">{messageError}</Alert>
      </Snackbar>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Đăng nhập thành công!</Alert>
      </Snackbar>
    </>
  );
}

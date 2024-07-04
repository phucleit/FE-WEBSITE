import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import config from '../../../../config';

const LOGIN_USER = `${config.API_URL}/login`;

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
  const [openError, setOpenError] = useState(false);

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

      if (status == 200) {
        const data = await res.json();
        const token = data.token;
        const display_name = data.display_name;
        const group_user_id = data.group_user_id;
        Cookies.set('token', token, { expires: 7 });
        Cookies.set('display_name', display_name, { expires: 7 });
        Cookies.set('group_user_id', group_user_id, { expires: 7 });
        setOpen(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1100);
      } else {
        setOpenError(true);
      }
    } catch (error) {
      setOpenError(true);
    }
  };

  const handleCloseError = () => {
    setOpenError(false);
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
        <Alert severity="error">Tên đăng nhập hoặc mật khẩu không đúng! Vui lòng nhập lại thông tin!</Alert>
      </Snackbar>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Đăng nhập thành công!</Alert>
      </Snackbar>
    </>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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

import { signin } from '../../../../store/auth/authActions';

// import config from '../../../../config';

// const SIGNIN_USER = `${config.API_URL}/users/signin`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function Signin() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [openErrorNotFound, setOpenErrorNotFound] = useState(false);
  const [openErrorWrong, setOpenErrorWrong] = useState(false);

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
      username: 'admin',
      password: 'admin!@#123'
    };

    try {
      setOpen(true);
      dispatch(signin(info));
      navigate('/dashboard');

      // const res = await fetch(`${SIGNIN_USER}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(info),
      //   credentials: 'include'
      // });

      // const statusCode = res.status;
      // if (statusCode === 404) {
      //   setOpenErrorNotFound(true);
      // } else if (statusCode === 401) {
      //   setOpenErrorWrong(true);
      // } else {
      //   setOpen(true);
      //   dispatch(signin(info));
      //   navigate('/dashboard');
      // }
    } catch (error) {
      console.error('Error during sign-in:', error);
    } finally {
      setTimeout(() => {
        setOpenErrorNotFound(false);
        setOpenErrorWrong(false);
      }, 1100);
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
      <Snackbar open={openErrorNotFound} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="error">Tài khoản không tồn tại!</Alert>
      </Snackbar>
      <Snackbar open={openErrorWrong} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="error">Vui lòng nhập đúng tài khoản!</Alert>
      </Snackbar>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Đăng nhập thành công!</Alert>
      </Snackbar>
    </>
  );
}

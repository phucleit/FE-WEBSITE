import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';
import { apiPost, apiGet, getRoles } from '../../utils/formatUtils';

const LIST_USER = `${config.API_URL}/users`;
const LIST_GROUP_USER = `${config.API_URL}/group-user`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddUser() {
  let navigate = useNavigate();
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);

  const [displayname, setDisplayname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [group_user_id, setGroupUserId] = useState('');

  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [dataGroupUser, setDataGroupUser] = useState([]);

  useEffect(() => {
    loadListRoles();
    loadListGroupUser();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '66746193cb45907845239f36');
      if (filteredAdd.length > 0) {
        setPermissionAdd(true);
      } else {
        setPermissionAdd(false);
      }
    }
  }, [dataRoles]);

  const loadListRoles = async () => {
    const result = await getRoles();
    setDataRoles(result.data);
  };

  const loadListGroupUser = async () => {
    const result = await apiGet(`${LIST_GROUP_USER}`);
    setDataGroupUser(result.data);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAddUser = (e) => {
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

    const addUser = {
      display_name: displayname,
      username: username,
      email: email,
      password: password,
      group_user_id: group_user_id
    };

    apiPost(`${LIST_USER}`, addUser)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/khach-hang/danh-sach-khach-hang');
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return permissionAdd ? (
    <>
      <MainCard title="Thêm mới">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên hiển thị</InputLabel>
                  <Input
                    id="displayname"
                    name="displayname"
                    value={displayname}
                    onChange={(e) => setDisplayname(e.target.value)}
                    required={true}
                    placeholder="Nhập tên hiển thị..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <Item>
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
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Quyền</InputLabel>
                  <Select id="group_user_id" value={group_user_id} label="Chọn quyền..." onChange={(e) => setGroupUserId(e.target.value)}>
                    {dataGroupUser.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleAddUser}>
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
  ) : (
    <div>Bạn không có quyền truy cập!</div>
  );
}

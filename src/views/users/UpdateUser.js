import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  InputAdornment,
  IconButton,
  Box,
  Paper,
  Grid,
  FormControl,
  Input,
  InputLabel,
  Button,
  Alert,
  MenuItem,
  Select,
  Snackbar
} from '@mui/material';

import { apiGet, apiGetById, apiUpdate, getRoles } from '../../utils/formatUtils';

const LIST_GROUP_USER = `${process.env.REACT_APP_API_URL}/group-user`;
const LIST_USER = `${process.env.REACT_APP_API_URL}/users`;

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

  const [dataGroupUser, setDataGroupUser] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionUpdate, setPermissionUpdate] = useState(false);

  const [displayname, setDisplayname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [group_user_id, setGroupUserId] = useState('');

  const [open, setOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    loadListRoles();
    loadDetailUser();
    loadListGroupUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '66746193cb45907845239f38');

      if (filteredUpdate.length > 0) {
        setPermissionUpdate(true);
      } else {
        setPermissionUpdate(false);
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

  const loadDetailUser = async () => {
    const result = await apiGetById(`${LIST_USER}`, currentId);
    setDisplayname(result.data.display_name);
    setUsername(result.data.username);
    setEmail(result.data.email);
    setPassword(result.data.password);
    setGroupUserId(result.data.group_user_id);
  };

  const handleCloseError = () => {
    setopenError(false);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (displayname == '') {
      setMessageError('Vui lòng nhập tên hiển thị!');
      setopenError(true);
    }

    if (username == '') {
      setMessageError('Vui lòng nhập tên đăng nhập!');
      setopenError(true);
    }

    if (email == '') {
      setMessageError('Vui lòng nhập email!');
      setopenError(true);
    }

    if (password == '') {
      setMessageError('Vui lòng nhập mật khẩu!');
      setopenError(true);
    }

    if (group_user_id == '') {
      setMessageError('Vui lòng chọn quyền!');
      setopenError(true);
    }

    const updateUser = {
      display_name: displayname,
      username: username,
      email: email,
      password: password,
      group_user_id: group_user_id
    };

    apiUpdate(`${LIST_USER}`, currentId, updateUser)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/tai-khoan/danh-sach-tai-khoan');
        }, 1500);
      })
      .catch((error) => {
        setMessageError(error.response?.data?.message || 'Cập nhật thất bại!');
        setopenError(true);
      });
  };

  return permissionUpdate ? (
    <>
      <MainCard title="Cập nhật">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off" onSubmit={handleUpdateUser}>
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
                    disabled
                    type="password"
                    // type={showPassword ? 'text' : 'password'}
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
  ) : (
    <div>Bạn không có quyền truy cập!</div>
  );
}

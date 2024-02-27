// import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
// import axios from 'axios';

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
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import MainCard from 'ui-component/cards/MainCard';

// import config from '../../config';

// const LIST_USER = `${config.API_URL}/users`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateGroupUser() {
  // let navigate = useNavigate();
  // const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [group, setGroup] = useState('');

  const handleChangeGroupUser = (event) => {
    setGroup({
      ...group,
      [event.target.name]: event.target.checked
    });
  };

  const handleAddGroupUser = (e) => {
    e.preventDefault();

    if (name == '') {
      alert('Vui lòng nhập tên nhóm!');
      return;
    }

    if (description == '') {
      alert('Vui lòng nhập mô tả nhóm!');
      return;
    }

    const addGroupUser = {
      name: name,
      description: description,
      group: group
    };
    console.log(addGroupUser);

    // const config_header = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Cache-Control': 'no-cache'
    //   }
    // };

    // axios
    //   .post(`${LIST_USER}`, addGroupUser, config_header)
    //   .then(() => {
    //     setOpen(true);
    //     setInterval(() => {
    //       navigate('/dashboard/users/list-users');
    //       window.location.reload(true);
    //     }, 1500);
    //   })
    //   .catch((error) => console.log(error));
  };

  return (
    <>
      <MainCard title="Tạo dịch vụ mới">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên nhóm</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên nhóm..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Mô tả nhóm</InputLabel>
                  <TextField
                    id="description"
                    name="description"
                    label="Mô tả nhóm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Nhập mô tả nhóm..."
                    multiline
                    rows={5}
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>Tài khoản</Item>
              <Box component="section">
                <FormGroup>
                  <FormControlLabel control={<Checkbox onChange={handleChangeGroupUser} name="addUser" />} label="Tạo tài khoản mới" />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel control={<Checkbox onChange={handleChangeGroupUser} name="resetPassword" />} label="Reset mật khẩu" />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel control={<Checkbox onChange={handleChangeGroupUser} name="updateUser" />} label="Sửa tài khoản" />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeGroupUser} name="addGroupUser" />}
                    label="Tạo nhóm người dùng"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeGroupUser} name="updateGroupUser" />}
                    label="Sửa nhóm người dùng"
                  />
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Item>Nhà cung cấp</Item>
              <Box component="section">
                <FormGroup>
                  <FormControlLabel control={<Checkbox onChange={handleChangeGroupUser} name="listSuppliers" />} label="Tạo nhà cung cấp" />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeGroupUser} name="updateSuppliers" />}
                    label="Sửa nhà cung cấp"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel control={<Checkbox onChange={handleChangeGroupUser} name="listMobileNetwork" />} label="Tạo nhà mạng" />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeGroupUser} name="updateMobileNetwork" />}
                    label="Sửa nhà mạng"
                  />
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Item>Gói dịch vụ</Item>
              <Box component="section">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="listDomainPlan" />}
                        label="Tạo gói tên miền"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="updateDomainPlan" />}
                        label="Sửa gói tên miền"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="listHostingPlan" />}
                        label="Tạo gói hosting"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="updateHostingPlan" />}
                        label="Sửa gói hosting"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="listEmailPlan" />}
                        label="Tạo gói email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="updateEmailPlan" />}
                        label="Sửa gói email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox onChange={handleChangeGroupUser} name="listSslPlan" />} label="Tạo gói ssl" />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox onChange={handleChangeGroupUser} name="updateSslPlan" />} label="Sửa gói ssl" />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="listContentPlan" />}
                        label="Tạo gói viết bài content & PR"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="updateContentPlan" />}
                        label="Sửa gói viết bài content & PR"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="listMaintenancePlan" />}
                        label="Tạo gói bảo trì"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="updateMaintenancePlan" />}
                        label="Sửa gói bảo trì"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="listMobileNetworkPlan" />}
                        label="Tạo gói sim 4G"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="updateMobileNetworkPlan" />}
                        label="Sửa gói sim 4G"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Item>Khách hàng</Item>
              <Box component="section">
                <FormGroup>
                  <FormControlLabel control={<Checkbox onChange={handleChangeGroupUser} name="addCustomer" />} label="Tạo khách hàng" />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel control={<Checkbox onChange={handleChangeGroupUser} name="updateCustomer" />} label="Sửa khách hàng" />
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Item>Hợp đồng</Item>
              <Box component="section">
                <FormGroup>
                  <FormControlLabel control={<Checkbox onChange={handleChangeGroupUser} name="addContract" />} label="Tạo hợp đồng" />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel control={<Checkbox onChange={handleChangeGroupUser} name="updateContract" />} label="Sửa hợp đồng" />
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Item>Dịch vụ</Item>
              <Box component="section">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="listDomainService" />}
                        label="Tạo dịch vụ tên miền"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="updateDomainService" />}
                        label="Sửa dịch vụ tên miền"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="listHostingService" />}
                        label="Tạo dịch vụ hosting"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="updateHostingService" />}
                        label="Sửa dịch vụ hosting"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="listEmailService" />}
                        label="Tạo dịch vụ email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="updateEmailService" />}
                        label="Sửa dịch vụ email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="listSslService" />}
                        label="Tạo dịch vụ ssl"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="updateSslService" />}
                        label="Sửa dịch vụ ssl"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="listContentService" />}
                        label="Tạo dịch vụ viết bài content & PR"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="updateContentService" />}
                        label="Sửa dịch vụ viết bài content & PR"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="listMaintenanceService" />}
                        label="Tạo dịch vụ bảo trì"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="updateMaintenanceService" />}
                        label="Sửa dịch vụ bảo trì"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="listMobileNetworkService" />}
                        label="Tạo dịch vụ sim 4G"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleChangeGroupUser} name="updateMobileNetworkService" />}
                        label="Sửa dịch vụ sim 4G"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <Button variant="contained" size="medium" onClick={handleAddGroupUser}>
                  Tạo nhóm
                </Button>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
      <Snackbar open="" anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Cập nhật thành công!</Alert>
      </Snackbar>
    </>
  );
}

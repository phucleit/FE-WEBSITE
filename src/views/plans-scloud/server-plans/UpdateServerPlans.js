import { useNavigate, useParams } from 'react-router-dom';
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
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';
import { apiGet, apiGetById, apiUpdate, getRoles } from '../../../utils/formatUtils';

const LIST_SERVER_PLANS = `${config.API_URL}/plans/server`;
const LIST_SUPPLIER_SERVER = `${config.API_URL}/server`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateServerPlans() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionUpdate, setPermissionUpdate] = useState(false);

  const [name, setName] = useState('');
  const [supplierServer, setSupplierServer] = useState('');

  const [listSupplierServer, setListSupplierServer] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadDetailServerPlans();
    loadSupplierServers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '66746678f7f723b779b1b075');

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

  const loadDetailServerPlans = async () => {
    const result = await apiGetById(`${LIST_SERVER_PLANS}`, currentId);
    setName(result.data.name);
    setSupplierServer(result.data.supplier_server_id._id);
  };

  const loadSupplierServers = async () => {
    const result = await apiGet(`${LIST_SUPPLIER_SERVER}`);
    setListSupplierServer(result.data);
  };

  const handleUpdateServerPlans = (e) => {
    e.preventDefault();
    if (name == '') {
      alert('Vui lòng nhập địa chỉ IP!');
      return;
    }

    const updateServerPlans = {
      name: name,
      supplier_server_id: supplierServer
    };

    apiUpdate(`${LIST_SERVER_PLANS}`, currentId, updateServerPlans)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/goi-dich-vu/danh-sach-server');
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return permissionUpdate ? (
    <>
      <MainCard title="Cập nhật">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên IP</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên IP..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Nhà cung cấp</InputLabel>
                  <Select
                    id="supplierServer"
                    value={supplierServer}
                    label="Chọn nhà cung cấp..."
                    onChange={(e) => setSupplierServer(e.target.value)}
                    disabled
                  >
                    {listSupplierServer.map((item) => (
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
              <Button variant="contained" size="medium" onClick={handleUpdateServerPlans}>
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
  ) : (
    <div>Bạn không có quyền truy cập!</div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Paper, Grid, FormControl, Input, InputLabel, Button, Alert, Snackbar, MenuItem, Select } from '@mui/material';

import { apiGet, apiPost, getRoles } from '../../../utils/formatUtils';

const LIST_SERVER_PLANS = `${process.env.REACT_APP_API_URL}/plans/server`;
const LIST_SUPPLIER_SERVER = `${process.env.REACT_APP_API_URL}/server`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddServerPlans() {
  let navigate = useNavigate();

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);

  const [name, setName] = useState('');
  const [supplierServerId, setSupplierServerId] = useState('');

  const [listSupplierServer, setListSupplierServer] = useState([]);

  const [open, setOpen] = useState(false);
  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    loadListRoles();
    loadSupplierServers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '66746678f7f723b779b1b074');
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

  const loadSupplierServers = async () => {
    const result = await apiGet(`${LIST_SUPPLIER_SERVER}`);
    setListSupplierServer(result.data);
  };

  const handleCloseError = () => {
    setopenError(false);
  };

  const handleAddServerPlans = (e) => {
    e.preventDefault();
    if (name == '') {
      setMessageError('Vui lòng nhập địa chỉ IP!');
      setopenError(true);
      return;
    }

    if (supplierServerId == '') {
      setMessageError('Vui lòng chọn nhà cung cấp!');
      setopenError(true);
      return;
    }

    const addServerPlans = {
      name: name,
      supplier_server_id: supplierServerId
    };

    apiPost(`${LIST_SERVER_PLANS}`, addServerPlans)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/goi-dich-vu/danh-sach-server');
        }, 1500);
      })
      .catch((error) => {
        setMessageError(error.response.data.message);
        setopenError(true);
      });
  };

  return permissionAdd ? (
    <>
      <MainCard title="Thêm mới">
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
                    id="supplierServerId"
                    value={supplierServerId}
                    label="Chọn nhà cung cấp..."
                    onChange={(e) => setSupplierServerId(e.target.value)}
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
              <Button variant="contained" size="medium" onClick={handleAddServerPlans}>
                Thêm mới
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
        <Alert severity="success">Thêm thành công!</Alert>
      </Snackbar>
    </>
  ) : (
    <div>Bạn không có quyền truy cập!</div>
  );
}

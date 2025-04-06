import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Paper, Grid, FormControl, Input, InputLabel, Button, Alert, Snackbar } from '@mui/material';

import { apiPost, getRoles } from '../../../utils/formatUtils';

const LIST_MOBILE_NETWORK = `${process.env.REACT_APP_API_URL}/mobile-network`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddMobileNetwork() {
  let navigate = useNavigate();
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);

  const [name, setName] = useState('');

  const [open, setOpen] = useState(false);
  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    loadListRoles();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667463d04bede188dfb46d79');
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

  const handleCloseError = () => {
    setopenError(false);
  };

  const handleAddMobileNetwork = (e) => {
    e.preventDefault();
    if (name == '') {
      setMessageError('Vui lòng nhập tên nhà mạng di động!');
      setopenError(true);
      return;
    }

    const addMobileNetwork = {
      name: name
    };

    apiPost(`${LIST_MOBILE_NETWORK}`, addMobileNetwork)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/nha-cung-cap/nha-mang/danh-sach-nha-mang');
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
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off" onSubmit={handleAddMobileNetwork}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên nhà mạng di động</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên nhà mạng di động..."
                  />
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" type="submit">
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

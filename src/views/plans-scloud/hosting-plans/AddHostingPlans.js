import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Paper, Grid, FormControl, Input, InputLabel, Button, Alert, Snackbar, MenuItem, Select } from '@mui/material';

import { apiGet, apiPost, getRoles, formatPriceValue } from '../../../utils/formatUtils';

const LIST_HOSTING_PLANS = `${process.env.REACT_APP_API_URL}/plans/hosting`;
const LIST_SUPPLIER = `${process.env.REACT_APP_API_URL}/supplier`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddHostingPlans() {
  let navigate = useNavigate();
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);

  const [name, setName] = useState('');
  const [importPrice, setImportPrice] = useState('');
  const [formatImportPrice, setFormatImportPrice] = useState('');
  const [price, setPrice] = useState('');
  const [formatPrice, setFormatPrice] = useState('');
  const [account, setAccount] = useState('');
  const [capacity, setCapacity] = useState('');
  const [supplier, setSupplier] = useState('');

  const [listSupplier, setListSupplier] = useState([]);

  const [open, setOpen] = useState(false);
  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    loadListRoles();
    loadSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '66746678f7f723b779b1b062');
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

  const loadSuppliers = async () => {
    const result = await apiGet(`${LIST_SUPPLIER}`);
    setListSupplier(result.data);
  };

  const handChangeImportPrice = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setImportPrice(value);
    setFormatImportPrice(formatPriceValue(value));
  };

  const handChangePrice = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPrice(value);
    setFormatPrice(formatPriceValue(value));
  };

  const handleCloseError = () => {
    setopenError(false);
  };

  const handleAddHostingPlans = (e) => {
    e.preventDefault();
    if (name == '') {
      setMessageError('Vui lòng nhập tên gói hosting!');
      setopenError(true);
      return;
    }

    if (account == '') {
      setMessageError('Vui lòng nhập số lượng website!');
      setopenError(true);
      return;
    }

    if (importPrice == '') {
      setMessageError('Vui lòng nhập giá nhập hosting!');
      setopenError(true);
      return;
    }

    if (price == '') {
      setMessageError('Vui lòng nhập giá bán hosting!');
      setopenError(true);
      return;
    }

    if (capacity == '') {
      setMessageError('Vui lòng nhập dung lượng!');
      setopenError(true);
      return;
    }

    if (supplier == '') {
      setMessageError('Vui lòng chọn nhà cung cấp!');
      setopenError(true);
      return;
    }

    const addHostingPlans = {
      name: name,
      import_price: importPrice,
      price: price,
      account: account,
      capacity: capacity,
      supplier_id: supplier
    };

    apiPost(`${LIST_HOSTING_PLANS}`, addHostingPlans)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/goi-dich-vu/danh-sach-hosting');
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
                  <InputLabel>Tên gói hosting</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên gói hosting..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Số lượng website</InputLabel>
                  <Input
                    id="account"
                    name="account"
                    type="number"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    required={true}
                    placeholder="Nhập số lượng website..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Giá nhập</InputLabel>
                  <Input
                    id="importPrice"
                    name="importPrice"
                    value={formatImportPrice}
                    onChange={handChangeImportPrice}
                    required={true}
                    placeholder="Nhập giá nhập hosting..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Giá bán</InputLabel>
                  <Input
                    id="price"
                    name="price"
                    value={formatPrice}
                    onChange={handChangePrice}
                    required={true}
                    placeholder="Nhập giá bán hosting..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Dung lượng</InputLabel>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required={true}
                    placeholder="Nhập dung lượng..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Nhà cung cấp</InputLabel>
                  <Select id="supplier" value={supplier} label="Chọn nhà cung cấp..." onChange={(e) => setSupplier(e.target.value)}>
                    {listSupplier.map((item) => (
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
              <Button variant="contained" size="medium" onClick={handleAddHostingPlans}>
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

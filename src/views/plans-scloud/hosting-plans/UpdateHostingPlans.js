import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Paper, Grid, FormControl, Input, InputLabel, Button, Alert, Snackbar, MenuItem, Select } from '@mui/material';

import { apiGet, apiGetById, apiUpdate, getRoles, formatPriceValue } from '../../../utils/formatUtils';

const LIST_HOSTING_PLANS = `${process.env.REACT_APP_API_URL}/plans/HOSTING`;
const LIST_SUPPLIER = `${process.env.REACT_APP_API_URL}/supplier`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateHostinglPlans() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionUpdate, setPermissionUpdate] = useState(false);

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
    loadDetailHostingPlans();
    loadSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '66746678f7f723b779b1b063');

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

  const loadDetailHostingPlans = async () => {
    const result = await apiGetById(`${LIST_HOSTING_PLANS}`, currentId);
    setName(result.data.name);
    setImportPrice(result.data.import_price);
    setFormatImportPrice(formatPriceValue(result.data.import_price));
    setPrice(result.data.price);
    setFormatPrice(formatPriceValue(result.data.price));
    setAccount(result.data.account);
    setCapacity(result.data.capacity);
    setSupplier(result.data.supplier_id._id);
  };

  const loadSuppliers = async () => {
    const result = await apiGet(`${LIST_SUPPLIER}`);
    setListSupplier(result.data);
  };

  const handleCloseError = () => {
    setopenError(false);
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

  const handleUpdateHostingPlans = (e) => {
    e.preventDefault();
    if (name == '') {
      setMessageError('Vui lòng nhập tên gói hosting!');
      setopenError(true);
      return;
    }

    if (account == '') {
      setMessageError('Vui lòng nhập số lượng tài khoản!');
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

    const updateHostingPlans = {
      name: name,
      import_price: importPrice,
      price: price,
      account: account,
      capacity: capacity,
      supplier_id: supplier
    };

    apiUpdate(`${LIST_HOSTING_PLANS}`, currentId, updateHostingPlans)
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

  return permissionUpdate ? (
    <>
      <MainCard title="Cập nhật">
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
              <Button variant="contained" size="medium" onClick={handleUpdateHostingPlans}>
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

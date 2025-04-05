import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Paper, Grid, FormControl, Input, InputLabel, Button, Alert, Snackbar, MenuItem, Select } from '@mui/material';

import config from '../../../config';
import { apiGet, apiUpdate, apiGetById, getRoles, formatPriceValue } from '../../../utils/formatUtils';

const LIST_SSL_PLANS = `${config.API_URL}/plans/ssl`;
const LIST_SUPPLIER = `${config.API_URL}/supplier`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateSslPlans() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);

  const [name, setName] = useState('');
  const [importPrice, setImportPrice] = useState('');
  const [formatImportPrice, setFormatImportPrice] = useState('');
  const [price, setPrice] = useState('');
  const [formatPrice, setFormatPrice] = useState('');
  const [feature, setFeature] = useState('');
  const [supplier, setSupplier] = useState('');

  const [listSupplier, setListSupplier] = useState([]);

  const [open, setOpen] = useState(false);
  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    loadListRoles();
    loadDetailSslPlans();
    loadSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '66746678f7f723b779b1b068');
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

  const loadDetailSslPlans = async () => {
    const result = await apiGetById(`${LIST_SSL_PLANS}`, currentId);
    setName(result.data.name);
    setImportPrice(result.data.import_price);
    setFormatImportPrice(formatPriceValue(result.data.import_price));
    setPrice(result.data.price);
    setFormatPrice(formatPriceValue(result.data.price));
    setFeature(result.data.feature);
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

  const handleUpdateSslPlans = (e) => {
    e.preventDefault();
    if (name == '') {
      setMessageError('Vui lòng nhập tên gói!');
      setopenError(true);
      return;
    }

    if (importPrice == '') {
      setMessageError('Vui lòng nhập giá nhập!');
      setopenError(true);
      return;
    }

    if (price == '') {
      setMessageError('Vui lòng nhập giá bán!');
      setopenError(true);
      return;
    }

    if (supplier == '') {
      setMessageError('Vui lòng chọn nhà cung cấp!');
      setopenError(true);
      return;
    }

    const updateSslPlans = {
      name: name,
      import_price: importPrice,
      price: price,
      feature: feature,
      supplier_id: supplier
    };

    apiUpdate(`${LIST_SSL_PLANS}`, currentId, updateSslPlans)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/goi-dich-vu/danh-sach-ssl');
        }, 1500);
      })
      .catch((error) => {
        setMessageError(error.response.data.message);
        setopenError(true);
      });
  };

  return permissionAdd ? (
    <>
      <MainCard title="Cập nhật">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên gói ssl</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên gói ssl..."
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
                    placeholder="Nhập giá nhập email..."
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
                    placeholder="Nhập giá bán email..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tính năng</InputLabel>
                  <Input
                    id="feature"
                    name="feature"
                    value={feature}
                    onChange={(e) => setFeature(e.target.value)}
                    required={true}
                    placeholder="Nhập tính năng..."
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
              <Button variant="contained" size="medium" onClick={handleUpdateSslPlans}>
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

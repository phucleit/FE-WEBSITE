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
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';
import { apiGet, apiPost, getRoles, formatPriceValue } from '../../../utils/formatUtils';

const LIST_DOMAIN_PLANS = `${config.API_URL}/plans/domain`;
const LIST_SUPPLIER = `${config.API_URL}/supplier`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddDomainPlans() {
  let navigate = useNavigate();

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);

  const [name, setName] = useState('');
  const [importPrice, setImportPrice] = useState('');
  const [formatImportPrice, setFormatImportPrice] = useState('');
  const [price, setPrice] = useState('');
  const [formatPrice, setFormatPrice] = useState('');
  const [supplier, setSupplier] = useState('');

  const [listSupplier, setListSupplier] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '66746678f7f723b779b1b05f');
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

  const handleAddDomainPlans = (e) => {
    e.preventDefault();
    if (name == '') {
      alert('Vui lòng nhập tên miền!');
      return;
    }

    if (price == '') {
      alert('Vui lòng nhập chi phí tên miền!');
      return;
    }

    const addDomainPlans = {
      name: name,
      import_price: importPrice,
      price: price,
      supplier_id: supplier
    };

    apiPost(`${LIST_DOMAIN_PLANS}`, addDomainPlans)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/goi-dich-vu/danh-sach-ten-mien');
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
                  <InputLabel>Tên miền</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên miền..."
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
                    placeholder="Nhập giá nhập tên miền..."
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
                    placeholder="Nhập giá bán tên miền..."
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
              <Button variant="contained" size="medium" onClick={handleAddDomainPlans}>
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

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
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';
import { apiPost, apiGet } from '../../../utils/formatUtils';

const LIST_MOBILE_NETWORK_PLANS = `${config.API_URL}/plans/mobile-network`;
const LIST_MOBILE_NETWORK = `${config.API_URL}/mobile-network`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddMobileNetworkPlans() {
  let navigate = useNavigate();

  const [name, setName] = useState('');
  const [importPrice, setImportPrice] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [content, setContent] = useState('');
  const [esim, setEsim] = useState('');
  const [supplierMobileNetworkId, setSupplierMobileNetworkId] = useState('');

  const [listMobileNetworkSuppliers, setListMobileNetworkSuppliers] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListMobileNetworkSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListMobileNetworkSuppliers = async () => {
    const result = await apiGet(`${LIST_MOBILE_NETWORK}`);
    setListMobileNetworkSuppliers(result.data);
  };

  const handleChangeEsim = (e) => {
    setEsim(e.target.checked);
  };

  const handleAddMobileNetworkPlans = (e) => {
    e.preventDefault();
    if (name == '') {
      alert('Vui lòng nhập tên!');
      return;
    }

    if (importPrice == '') {
      alert('Vui lòng nhập chi phí nhập!');
      return;
    }

    if (price == '') {
      alert('Vui lòng nhập chi phí bán!');
      return;
    }

    const addMobileNetworkPlans = {
      name: name,
      importPrice: importPrice,
      price: price,
      capacity: capacity,
      content: content,
      esim: esim,
      supplierMobileNetworkId: supplierMobileNetworkId
    };

    apiPost(`${LIST_MOBILE_NETWORK_PLANS}`, addMobileNetworkPlans)
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/dashboard/plans/list-mobile-network');
          window.location.reload(true);
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <MainCard title="Thêm mới">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Nhà mạng di động</InputLabel>
                  <Select
                    id="supplierMobileNetworkId"
                    value={supplierMobileNetworkId}
                    label="Chọn nhà mạng di động..."
                    onChange={(e) => setSupplierMobileNetworkId(e.target.value)}
                  >
                    {listMobileNetworkSuppliers.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên gói</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên gói..."
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
                  <InputLabel>Giá nhập</InputLabel>
                  <Input
                    id="importPrice"
                    name="importPrice"
                    value={importPrice}
                    onChange={(e) => setImportPrice(e.target.value)}
                    required={true}
                    placeholder="Nhập giá nhập..."
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required={true}
                    placeholder="Nhập giá bán..."
                  />
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <FormControl variant="standard" fullWidth>
                <InputLabel>Nội dung</InputLabel>
                <TextField
                  id="content"
                  name="content"
                  label="Nội dung"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Nhập nội dung..."
                  multiline
                  rows={5}
                />
              </FormControl>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <FormControl variant="standard" fullWidth>
                <FormLabel component="legend">Hỗ trợ Esim</FormLabel>
                <Switch checked={esim} onChange={handleChangeEsim} />
              </FormControl>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleAddMobileNetworkPlans}>
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
  );
}

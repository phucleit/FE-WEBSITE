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
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';

import { apiGet, apiPost } from '../../utils/formatUtils';

const LIST_FUNCTION = `${config.API_URL}/functions`;

const parent_id_tai_khoan = '667460e3d19aa9fcecc69fa6';
const parent_id_nha_cung_cap = '667463d04bede188dfb46d75';
const parent_id_goi_dich_vu = '667464b5500bf3ad04c24f47';
const parent_id_dich_vu = '667467eb263fb998b9925d2d';
const parent_id_khach_hang = '667463d04bede188dfb46d7d';
const parent_id_hop_dong = '667463d04bede188dfb46d7a';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddGroupUser() {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dataFunctions, setDataFunctions] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    loadListFunctions();
  }, []);

  const loadListFunctions = async () => {
    const result = await apiGet(`${LIST_FUNCTION}`);
    setDataFunctions(result.data);
  };

  const filteredItemsTaiKhoan = dataFunctions.filter((item) => item.fuction_parent_id === parent_id_tai_khoan);
  const filteredItemsNCC = dataFunctions.filter((item) => item.fuction_parent_id === parent_id_nha_cung_cap);
  const filteredItemsGoiDV = dataFunctions.filter((item) => item.fuction_parent_id === parent_id_goi_dich_vu);
  const filteredItemsDV = dataFunctions.filter((item) => item.fuction_parent_id === parent_id_dich_vu);
  const filteredItemsKH = dataFunctions.filter((item) => item.fuction_parent_id === parent_id_khach_hang);
  const filteredItemsHD = dataFunctions.filter((item) => item.fuction_parent_id === parent_id_hop_dong);

  const handleChangeGroupUser = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevItems) => {
      if (checked) {
        return [...prevItems, name];
      } else {
        return prevItems.filter((item) => item !== name);
      }
    });
  };

  const handleCloseError = () => {
    setopenError(false);
  };

  const handleAddGroupUser = (e) => {
    e.preventDefault();

    if (name === '') {
      setMessageError('Vui lòng nhập tên nhóm!');
      setopenError(true);
      return;
    }

    if (description === '') {
      setMessageError('Vui lòng nhập mô tả nhóm!');
      setopenError(true);
      return;
    }

    if (!checkedItems.length) {
      setMessageError('Vui lòng chọn quyền!');
      setopenError(true);
      return;
    }

    const addGroupUser = {
      name: name,
      description: description,
      group: checkedItems
    };

    apiPost(`${LIST_FUNCTION}`, addGroupUser)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/tai-khoan/danh-sach-nhom');
        }, 1500);
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Có lỗi xảy ra! Vui lòng thử lại.';
        setMessageError(message);
        setopenError(true);
      });
  };

  return (
    <>
      <MainCard title="Tạo nhóm người dùng">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off" onSubmit={handleAddGroupUser}>
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
                  {filteredItemsTaiKhoan.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      control={<Checkbox checked={checkedItems.includes(item._id)} onChange={handleChangeGroupUser} name={item._id} />}
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Item>Nhà cung cấp</Item>
              <Box component="section">
                <FormGroup>
                  {filteredItemsNCC.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      control={<Checkbox checked={checkedItems.includes(item._id)} onChange={handleChangeGroupUser} name={item._id} />}
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Item>Khách hàng</Item>
              <Box component="section">
                <FormGroup>
                  {filteredItemsKH.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      control={<Checkbox checked={checkedItems.includes(item._id)} onChange={handleChangeGroupUser} name={item._id} />}
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Item>Hợp đồng</Item>
              <Box component="section">
                <FormGroup>
                  {filteredItemsHD.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      control={<Checkbox checked={checkedItems.includes(item._id)} onChange={handleChangeGroupUser} name={item._id} />}
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Item>Gói dịch vụ</Item>
              <Box component="section">
                <FormGroup>
                  {filteredItemsGoiDV.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      control={<Checkbox checked={checkedItems.includes(item._id)} onChange={handleChangeGroupUser} name={item._id} />}
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Item>Dịch vụ</Item>
              <Box component="section">
                <FormGroup>
                  {filteredItemsDV.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      control={<Checkbox checked={checkedItems.includes(item._id)} onChange={handleChangeGroupUser} name={item._id} />}
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <Button variant="contained" size="medium" type="submit">
                  Tạo nhóm
                </Button>
              </Item>
            </Grid>
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
        <Alert severity="success">Tạo nhóm thành công!</Alert>
      </Snackbar>
    </>
  );
}

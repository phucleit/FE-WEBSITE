import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Paper, Grid, FormControl, Input, InputLabel, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

import { apiGetById, apiGet } from '../../utils/formatUtils';

const LIST_GROUP_USER = `${process.env.REACT_APP_API_URL}/group-user`;
const LIST_FUNCTION = `${process.env.REACT_APP_API_URL}/functions`;
const LIST_ROLES = `${process.env.REACT_APP_API_URL}/functions/list-roles`;

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

export default function UpdateGroupUser() {
  const paramId = useParams();
  const currentId = paramId.id;

  const [dataFunctions, setDataFunctions] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadListRoles();
    loadDetailGroupUser();
    loadListFunctions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListRoles = async () => {
    const result = await apiGet(`${LIST_ROLES}/${currentId}`);
    setCheckedItems(result.data.map((role) => role.function_id));
  };

  const loadDetailGroupUser = async () => {
    const result = await apiGetById(`${LIST_GROUP_USER}`, currentId);
    setName(result.data.name);
    setDescription(result.data.description);
  };

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

  return (
    <>
      <MainCard title="Xem nhóm người dùng">
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
                    disabled
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
                    disabled
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
                      control={
                        <Checkbox checked={checkedItems.includes(item._id)} disabled={!checkedItems.includes(item._id)} name={item._id} />
                      }
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
                      control={
                        <Checkbox checked={checkedItems.includes(item._id)} disabled={!checkedItems.includes(item._id)} name={item._id} />
                      }
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
                      control={
                        <Checkbox checked={checkedItems.includes(item._id)} disabled={!checkedItems.includes(item._id)} name={item._id} />
                      }
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
                      control={
                        <Checkbox checked={checkedItems.includes(item._id)} disabled={!checkedItems.includes(item._id)} name={item._id} />
                      }
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
                      control={
                        <Checkbox checked={checkedItems.includes(item._id)} disabled={!checkedItems.includes(item._id)} name={item._id} />
                      }
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
                      control={
                        <Checkbox checked={checkedItems.includes(item._id)} disabled={!checkedItems.includes(item._id)} name={item._id} />
                      }
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </>
  );
}

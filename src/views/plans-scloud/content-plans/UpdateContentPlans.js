import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Paper, Grid, FormControl, Input, InputLabel, Button, Alert, Snackbar } from '@mui/material';

import { apiGetById, apiUpdate, getRoles, formatPriceValue } from '../../../utils/formatUtils';

const LIST_CONTENT_PLANS = `${process.env.REACT_APP_API_URL}/plans/content`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateContentPlans() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionUpdate, setPermissionUpdate] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [formatPrice, setFormatPrice] = useState('');
  const [number_of_articles, setNumberOfArticles] = useState('');

  const [open, setOpen] = useState(false);
  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    loadListRoles();
    loadDetailSslPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '66746678f7f723b779b1b06c');

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

  const loadDetailSslPlans = async () => {
    const result = await apiGetById(`${LIST_CONTENT_PLANS}`, currentId);
    setName(result.data.name);
    setPrice(result.data.price);
    setFormatPrice(formatPriceValue(result.data.price));
    setNumberOfArticles(result.data.number_of_articles);
  };

  const handleCloseError = () => {
    setopenError(false);
  };

  const handChangePrice = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPrice(value);
    setFormatPrice(formatPriceValue(value));
  };

  const handleUpdateContentPlans = (e) => {
    e.preventDefault();
    if (name == '') {
      setMessageError('Vui lòng nhập tên gói!');
      setopenError(true);
      return;
    }

    if (price == '') {
      setMessageError('Vui lòng nhập giá!');
      setopenError(true);
      return;
    }

    if (number_of_articles == '') {
      setMessageError('Vui lòng nhập số lượng bài viết!');
      setopenError(true);
      return;
    }

    const updateContentPlans = {
      name: name,
      price: price,
      number_of_articles: number_of_articles
    };

    apiUpdate(`${LIST_CONTENT_PLANS}`, currentId, updateContentPlans)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/goi-dich-vu/danh-sach-content');
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
                  <InputLabel>Chi phí</InputLabel>
                  <Input
                    id="price"
                    name="price"
                    value={formatPrice}
                    onChange={handChangePrice}
                    required={true}
                    placeholder="Nhập chi phí..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Số lượng bài viết</InputLabel>
                  <Input
                    id="number_of_articles"
                    name="number_of_articles"
                    type="number"
                    value={number_of_articles}
                    onChange={(e) => setNumberOfArticles(e.target.value)}
                    required={true}
                    placeholder="Nhập số lượng bài viết..."
                  />
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleUpdateContentPlans}>
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

import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

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

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';

const LIST_CONTENT_PLANS = `${config.API_URL}/plans/content`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddContentPlans() {
  let navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [number_of_articles, setNumberOfArticles] = useState('');

  const [open, setOpen] = useState(false);

  const handleAddContentPlans = (e) => {
    e.preventDefault();
    if (name == '') {
      alert('Vui lòng nhập tên gói!');
      return;
    }

    if (price == '') {
      alert('Vui lòng nhập chi phí!');
      return;
    }

    if (number_of_articles == '') {
      alert('Vui lòng nhập số lượng bài viết!');
      return;
    }

    const addContentPlans = {
      name: name,
      price: price,
      number_of_articles: number_of_articles
    };

    axios
      .post(`${LIST_CONTENT_PLANS}`, addContentPlans, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/plans/list-content');
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
              <Button variant="contained" size="medium" onClick={handleAddContentPlans}>
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

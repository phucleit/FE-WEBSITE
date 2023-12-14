import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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

export default function UpdateContentPlans() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [number_of_articles, setNumberOfArticles] = useState('');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadDetailSslPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDetailSslPlans = async () => {
    const result = await axios.get(`${LIST_CONTENT_PLANS}/${currentId}`);
    setName(result.data.name);
    setPrice(result.data.price);
    setNumberOfArticles(result.data.number_of_articles);
  };

  const handleUpdateContentPlans = (e) => {
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

    const updateContentPlans = {
      name: name,
      price: price,
      number_of_articles: number_of_articles
    };

    axios
      .put(`${LIST_CONTENT_PLANS}/${currentId}`, updateContentPlans)
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/plans/list-content');
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return (
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
              <Button variant="contained" size="medium" onClick={handleUpdateContentPlans}>
                Cập nhật
              </Button>
            </Item>
          </Grid>
        </Box>
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Cập nhật thành công!</Alert>
      </Snackbar>
    </>
  );
}

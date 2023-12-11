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

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';

const LIST_DOMAIN_PLANS = `${config.API_URL}/plans/domain`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateDomainPlans() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    loadDetailDomainPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDetailDomainPlans = async () => {
    const result = await axios.get(`${LIST_DOMAIN_PLANS}/${currentId}`);
    setName(result.data.name);
    setPrice(result.data.price);
  };

  const handleUpdateDomainPlans = (e) => {
    e.preventDefault();
    if (name == '') {
      alert('Vui lòng nhập tên miền!');
      return;
    }

    if (price == '') {
      alert('Vui lòng nhập chi phí tên miền!');
      return;
    }

    const updateDomainPlans = {
      name: name,
      price: price
    };

    axios
      .put(`${LIST_DOMAIN_PLANS}/${currentId}`, updateDomainPlans)
      .then(() => {
        alert('Cập nhật thành công!');
        navigate('/plans/list-domain-plans');
      })
      .catch((error) => console.log(error));
  };

  return (
    <MainCard title="Cập nhật">
      <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <FormControl variant="standard">
                <InputLabel>Name</InputLabel>
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
              <FormControl variant="standard">
                <InputLabel>Chi phí</InputLabel>
                <Input
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required={true}
                  placeholder="Nhập chi phí tên miền..."
                />
              </FormControl>
            </Item>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Button variant="contained" size="medium" color="secondary" onClick={handleUpdateDomainPlans}>
              Cập nhật
            </Button>
          </Item>
        </Grid>
      </Box>
    </MainCard>
  );
}

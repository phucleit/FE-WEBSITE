import { useNavigate, useParams } from 'react-router-dom';
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

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';
import { apiGetById, apiUpdate } from '../../../utils/formatUtils';

const LIST_MOBILE_NETWORK = `${config.API_URL}/mobile-network`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateServer() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [name, setName] = useState('');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadDetailMobileNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDetailMobileNetwork = async () => {
    const result = await apiGetById(`${LIST_MOBILE_NETWORK}`, currentId);
    setName(result.data.name);
  };

  const handleUpdateMobileNetwork = (e) => {
    e.preventDefault();
    if (name == '') {
      alert('Vui lòng nhập tên nhà mạng di động!');
      return;
    }

    const updateMobileNetwork = {
      name: name
    };

    apiUpdate(`${LIST_MOBILE_NETWORK}`, currentId, updateMobileNetwork)
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/dashboard/suppliers/mobile-network/list-mobile-network');
          window.location.reload(true);
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
                  <InputLabel>Tên nhà mạng di động</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên nhà mạng di động..."
                  />
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleUpdateMobileNetwork}>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import MainCard from 'ui-component/cards/MainCard';
import CheckIcon from '@mui/icons-material/Check';

import config from '../../../config';
import { convertPrice } from '../../../utils/formatUtils';

const LIST_MOBILE_NETWORK_PLANS = `${config.API_URL}/plans/mobile-network`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function ListMobileNetworkPlans() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListMobileNetworkPlans();
  }, []);

  const loadListMobileNetworkPlans = async () => {
    const result = await axios.get(`${LIST_MOBILE_NETWORK_PLANS}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_MOBILE_NETWORK_PLANS}/` + id, {
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        .then(() => {
          setOpen(true);
          setData(data.filter((item) => item._id !== id));
          setInterval(() => {
            setOpen(false);
          }, 1100);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <MainCard
        title="Danh sách"
        secondary={
          <Button variant="contained" component={Link} to="/dashboard/plans/add-mobile-network">
            Thêm mới
          </Button>
        }
      >
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={1}>
            {data.map((item) => (
              <Grid item xs={3} key={item._id}>
                <Item>
                  <Card sx={{ maxWidth: 400, textAlign: 'center' }} variant="outlined">
                    <CardContent sx={{ pb: 2 }}>
                      <Typography gutterBottom variant="h2" component="div">
                        {item.name}
                      </Typography>
                      <Typography sx={{ fontSize: 20, pt: 1, color: '#f00' }}>Giá nhập: {convertPrice(item.importPrice)}</Typography>
                      <Typography sx={{ fontSize: 20, pt: 1, color: '#f00' }}>Giá bán: {convertPrice(item.price)}</Typography>
                      <Typography sx={{ fontSize: 14, pt: 1, pb: 1, fontStyle: 'italic' }} color="text.secondary">
                        (Giá trên chưa bao gồm VAT)
                      </Typography>
                      <Typography sx={{ fontSize: 17, pb: 1, color: '#2196f3' }}>
                        Nhà mạng di động: {item.supplierMobileNetworkId.name}
                      </Typography>
                      <Divider />
                      <Typography sx={{ fontSize: 15, pt: 1, pb: 1 }}>Dung lượng: {item.capacity}GB/tháng</Typography>
                      <Divider />
                      {item.content.split('\n').map((value, index) => (
                        <Typography key={index} sx={{ fontSize: 15, pt: 1, pb: 1 }}>
                          <CheckIcon style={{ fontSize: 15, color: '#74cb35' }} /> {value}
                        </Typography>
                      ))}
                      <Divider />
                      <Typography sx={{ fontSize: 15, pt: 1, pb: 1 }}>Hỗ trợ Esim: {item.esim == false ? 'Không' : 'Có'}</Typography>
                      <Divider />
                    </CardContent>
                    <CardActions sx={{ pt: 1, justifyContent: 'center' }}>
                      <Button
                        size="small"
                        variant="contained"
                        component={Link}
                        to={`/dashboard/plans/update-mobile-network/${item._id}`}
                        sx={{ mr: 1 }}
                      >
                        Cập nhật
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(item._id)}
                      >
                        Xóa
                      </Button>
                    </CardActions>
                  </Card>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Xóa thành công!</Alert>
      </Snackbar>
    </>
  );
}

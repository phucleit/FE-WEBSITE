import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';

const LIST_EMAIL_PLANS = `${config.API_URL}/plans/email`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function ListEmailPlans() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadListEmailPlans();
  });

  const loadListEmailPlans = async () => {
    const result = await axios.get(`${LIST_EMAIL_PLANS}`);
    setData(result.data);
  };

  const convertPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_EMAIL_PLANS}/` + id)
        .then(() => {
          setData(data.filter((item) => item._id !== id));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <MainCard
      title="Danh sách"
      secondary={
        <Button variant="contained" href="/plans/add-email">
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
                    <Typography sx={{ fontSize: 20, pt: 1, color: '#f00' }}>{convertPrice(item.price)} / tháng</Typography>
                    <Typography sx={{ fontSize: 14, pt: 1, pb: 1, fontStyle: 'italic' }} color="text.secondary">
                      (Giá trên chưa bao gồm VAT)
                    </Typography>
                    <Divider />
                    <Typography sx={{ fontSize: 15, pt: 1, pb: 1 }}>Dung lượng: {item.capacity}</Typography>
                    <Divider />
                    <Typography sx={{ fontSize: 15, pt: 1, pb: 1 }}>Địa chỉ Email: {item.account} tài khoản</Typography>
                    <Divider />
                    <Typography sx={{ fontSize: 15, pt: 1, pb: 1 }}>SSL Let&quot;s Encrypt: Miễn phí</Typography>
                    <Divider />
                    <Typography sx={{ fontSize: 15, pt: 1, pb: 1 }}>Tùy chỉnh dung lượng từng tài khoản</Typography>
                    <Divider />
                    <Typography sx={{ fontSize: 15, pt: 1, pb: 1 }}>Sao lưu dữ liệu hàng tuần</Typography>
                    <Divider />
                  </CardContent>
                  <CardActions sx={{ pt: 1, justifyContent: 'center' }}>
                    <Button size="small" variant="contained" href={`/plans/update-email/${item._id}`} sx={{ mr: 1 }}>
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
  );
}

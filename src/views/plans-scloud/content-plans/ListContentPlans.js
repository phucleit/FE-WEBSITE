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

import config from '../../../config';

const LIST_CONTENT_PLANS = `${config.API_URL}/plans/content`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function ListContentPlans() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListContentPlans();
  }, []);

  const loadListContentPlans = async () => {
    const result = await axios.get(`${LIST_CONTENT_PLANS}`);
    setData(result.data);
  };

  const convertPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_CONTENT_PLANS}/` + id)
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
          <Button variant="contained" component={Link} to="/plans/add-content">
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
                      <Typography sx={{ fontSize: 17, pb: 1, color: '#2196f3' }}>Số lượng bài viết: {item.number_of_articles}</Typography>
                      <Divider />
                    </CardContent>
                    <CardActions sx={{ pt: 1, justifyContent: 'center' }}>
                      <Button size="small" variant="contained" component={Link} to={`/plans/update-content/${item._id}`} sx={{ mr: 1 }}>
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

import React, { useState, useEffect } from 'react';
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
import { apiGet, apiDelete, convertPrice, getRoles } from '../../../utils/formatUtils';

const LIST_MOBILE_NETWORK_PLANS = `${config.API_URL}/plans/mobile-network`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function ListMobileNetworkPlans() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);
  const [permissionUpdate, setPermissionUpdate] = useState(false);
  const [permissionDelete, setPermissionDelete] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadListMobileNetworkPlans();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '66746678f7f723b779b1b071');
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '66746678f7f723b779b1b072');
      const filteredDelete = dataRoles.filter((role_delete) => role_delete.function_id === '66746678f7f723b779b1b073');
      if (filteredAdd.length > 0) {
        setPermissionAdd(true);
      } else {
        setPermissionAdd(false);
      }

      if (filteredUpdate.length > 0) {
        setPermissionUpdate(true);
      } else {
        setPermissionUpdate(false);
      }

      if (filteredDelete.length > 0) {
        setPermissionDelete(true);
      } else {
        setPermissionDelete(false);
      }
    }
  }, [dataRoles]);

  const loadListRoles = async () => {
    const result = await getRoles();
    setDataRoles(result.data);
  };

  const loadListMobileNetworkPlans = async () => {
    const result = await apiGet(`${LIST_MOBILE_NETWORK_PLANS}`);
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      apiDelete(`${LIST_MOBILE_NETWORK_PLANS}`, id)
        .then(() => {
          setOpen(true);
          setData(data.filter((item) => item._id !== id));
          setTimeout(() => {
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
          permissionAdd && (
            <Button variant="contained" component={Link} to="/dashboard/plans/add-mobile-network">
              Thêm mới
            </Button>
          )
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
                      <Typography sx={{ fontSize: 20, pt: 1, color: '#f00' }}>Giá nhập: {convertPrice(item.import_price)}</Typography>
                      <Typography sx={{ fontSize: 20, pt: 1, color: '#f00' }}>Giá bán: {convertPrice(item.price)}</Typography>
                      <Typography sx={{ fontSize: 14, pt: 1, pb: 1, fontStyle: 'italic' }} color="text.secondary">
                        (Giá trên chưa bao gồm VAT)
                      </Typography>
                      <Typography sx={{ fontSize: 17, pb: 1, color: '#2196f3' }}>
                        Nhà mạng di động: {item.supplier_mobile_network_id.name}
                      </Typography>
                      <Divider />
                      <Typography sx={{ fontSize: 15, pt: 1, pb: 1 }}>Dung lượng: {item.capacity}GB/tháng</Typography>
                      <Divider />
                      {item.content
                        ? item.content.split('\n').map((value, index) => (
                            <React.Fragment key={index}>
                              <Typography key={index} sx={{ fontSize: 15, pt: 1, pb: 1 }}>
                                <CheckIcon style={{ fontSize: 15, color: '#74cb35' }} /> {value}
                              </Typography>
                              <Divider />
                            </React.Fragment>
                          ))
                        : ''}

                      <Typography sx={{ fontSize: 15, pt: 1, pb: 1 }}>Hỗ trợ Esim: {item.esim == false ? 'Không' : 'Có'}</Typography>
                      <Divider />
                    </CardContent>
                    <CardActions sx={{ pt: 1, justifyContent: 'center' }}>
                      {permissionUpdate && (
                        <Button
                          size="small"
                          variant="contained"
                          component={Link}
                          to={`/dashboard/plans/update-mobile-network/${item._id}`}
                          sx={{ mr: 1 }}
                        >
                          Cập nhật
                        </Button>
                      )}
                      {permissionDelete && (
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(item._id)}
                        >
                          Xóa
                        </Button>
                      )}
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

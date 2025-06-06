import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { IconEdit } from '@tabler/icons';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Button, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { apiGet, apiDelete, getRegisteredAt, getExpiredAt, getRoles } from '../../../utils/formatUtils';

const LIST_SSL_SERVICES = `${process.env.REACT_APP_API_URL}/services/ssl`;

export default function ListSslServices() {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState('data');
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);
  const [permissionUpdate, setPermissionUpdate] = useState(false);
  const [permissionDelete, setPermissionDelete] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState('');

  const [dataSslServicesExpiring, setDataSslServicesExpiring] = useState([]);
  const [countSslServicesExpiring, setCountSslServicesExpiring] = useState([]);

  const [dataSslServicesExpired, setDataSslServicesExpired] = useState([]);
  const [countSslServicesExpired, setCountSslServicesExpired] = useState([]);

  const [dataSslServicesBeforePayment, setDataSslServicesBeforePayment] = useState([]);
  const [countSslServicesBeforePayment, setCountSslServicesBeforePayment] = useState([]);

  useEffect(() => {
    loadListRoles();
    loadListSslServices();
    loadSslServicesExpiring();
    loadSslServicesExpired();
    loadSslServicesBeforePayment();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667467eb263fb998b9925d37');
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667467eb263fb998b9925d38');
      const filteredDelete = dataRoles.filter((role_delete) => role_delete.function_id === '667467eb263fb998b9925d39');
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

  const loadListSslServices = async () => {
    const result = await apiGet(`${LIST_SSL_SERVICES}`);
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadSslServicesExpiring = async () => {
    const result = await apiGet(`${LIST_SSL_SERVICES}/expiring/all`);
    setDataSslServicesExpiring(result.data);
    setCountSslServicesExpiring(result.data.length);
  };

  const loadSslServicesExpired = async () => {
    const result = await apiGet(`${LIST_SSL_SERVICES}/expired/all`);
    setDataSslServicesExpired(result.data);
    setCountSslServicesExpired(result.data.length);
  };

  const loadSslServicesBeforePayment = async () => {
    const result = await apiGet(`${LIST_SSL_SERVICES}/before-payment/all`);
    setDataSslServicesBeforePayment(result.data);
    setCountSslServicesBeforePayment(result.data.length);
  };

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleClose = () => {
    setOpenConfirm(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      apiDelete(`${LIST_SSL_SERVICES}`, selectedId)
        .then(() => {
          setOpen(true);
          setData(data.filter((item) => item._id !== selectedId));
          setTimeout(() => {
            setOpen(false);
          }, 1100);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          handleClose();
          reloadAllData();
        });
    }
  };

  const reloadAllData = async () => {
    try {
      const listData = await apiGet(`${LIST_SSL_SERVICES}`);
      setData(listData.data);
      setDataLength(listData.data.length);

      const listExpiring = await apiGet(`${LIST_SSL_SERVICES}/expiring/all`);
      setDataSslServicesExpiring(listExpiring.data);
      setCountSslServicesExpiring(listExpiring.data.length);

      const listExpired = await apiGet(`${LIST_SSL_SERVICES}/expired/all`);
      setDataSslServicesExpired(listExpired.data);
      setCountSslServicesExpired(listExpired.data.length);

      const listBeforePayment = await apiGet(`${LIST_SSL_SERVICES}/before-payment/all`);
      setDataSslServicesBeforePayment(listBeforePayment.data);
      setCountSslServicesBeforePayment(listBeforePayment.data.length);
    } catch (error) {
      console.log('Error reloading data:', error);
    }
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Tên miền',
      width: 250,
      renderCell: (params) => {
        return (
          <span>
            {params.row.domain_service_id.name}
            <br />
            Domain {params.row.domain_plan_id.name} / NCC {params.row.domain_supplier_id.name}
          </span>
        );
      }
    },
    {
      field: 'ssl',
      headerName: 'Gói ssl',
      width: 180,
      renderCell: (params) => {
        return (
          <span>
            {params.row.ssl_plan_id.name}
            <br />
            NCC: {params.row.ssl_supplier_id.name}
          </span>
        );
      }
    },
    {
      field: 'customer',
      headerName: 'Khách hàng',
      width: 350,
      renderCell: (params) => {
        if (params.row.customer_id.gender == 1) {
          return (
            <span>
              Anh {params.row.customer_id.fullname}
              <br />
              {params.row.customer_id.email} / {params.row.customer_id.phone}
            </span>
          );
        } else {
          return (
            <span>
              Chị {params.row.customer_id.fullname}
              <br />
              {params.row.customer_id.email} / {params.row.customer_id.phone}
            </span>
          );
        }
      }
    },
    {
      field: 'price',
      headerName: 'Giá dịch vụ / năm',
      width: 200,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.ssl_plan_id.price)
    },
    {
      field: 'periods',
      headerName: 'Thời gian',
      width: 120,
      valueGetter: (params) => (params.row.periods ? `${params.row.periods} năm` : '')
    },
    {
      field: 'total_price',
      headerName: 'Thành tiền',
      width: 200,
      valueGetter: (params) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.ssl_plan_id.price * params.row.periods)
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 220,
      renderCell: (params) => {
        if (params.row.status == 1) {
          return (
            <Button variant="contained" size="small">
              Đang sử dụng
            </Button>
          );
        } else if (params.row.status == 2) {
          const startDate = new Date();
          const endDate = dayjs(params.row.expiredAt);
          const differenceInDays = endDate.diff(startDate, 'day');
          return (
            <Button variant="contained" size="small" color="warning">
              Còn {differenceInDays} ngày hết hạn
            </Button>
          );
        } else if (params.row.status == 3) {
          return (
            <Button variant="contained" size="small" color="error">
              Hết hạn
            </Button>
          );
        }
      }
    },
    { field: 'registeredAt', headerName: 'Ngày đăng ký', valueGetter: (params) => getRegisteredAt(params.row.registeredAt), width: 200 },
    { field: 'expiredAt', headerName: 'Ngày hết hạn', valueGetter: (params) => getExpiredAt(params.row.expiredAt), width: 200 },
    {
      field: 'payment',
      headerName: 'Thanh toán',
      width: 200,
      renderCell: (params) => {
        if (params.row.before_payment == true) {
          return (
            <Button variant="contained" size="small" color="success">
              Khách công nợ
            </Button>
          );
        } else if (params.row.after_payment == true) {
          return (
            <Button variant="contained" size="small">
              Đã thanh toán
            </Button>
          );
        } else {
          return (
            <Button variant="contained" size="small">
              Đã thanh toán
            </Button>
          );
        }
      }
    }
  ];

  if (permissionUpdate || permissionDelete) {
    columns.unshift({
      field: 'action',
      headerName: 'Hành động',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {permissionUpdate && (
              <Link to={'/trang-chu/dich-vu/cap-nhat-ssl/' + params.row._id}>
                <IconEdit />
              </Link>
            )}
            {permissionDelete && (
              <DeleteOutline style={{ cursor: 'pointer', color: '#ff6666' }} onClick={() => handleOpen(params.row._id)} />
            )}
          </>
        );
      }
    });
  }

  return (
    <>
      <MainCard
        title="Danh sách"
        secondary={
          permissionAdd && (
            <Button variant="contained" component={Link} to="/trang-chu/dich-vu/them-ssl">
              Thêm mới
            </Button>
          )
        }
      >
        <Box component="form" sx={{ flexGrow: 1, mb: '20px' }} noValidate autoComplete="off">
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('data')}
            component={Link}
            to={{ pathname: '/trang-chu/dich-vu/danh-sach-ssl' }}
          >
            Đang sử dụng: {dataLength ? dataLength : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataSslServicesExpiring')}
            component={Link}
            to={{ pathname: '/trang-chu/dich-vu/danh-sach-ssl', search: '?loai=sap-het-han' }}
            color="warning"
            sx={{ ml: '10px', mr: '10px' }}
          >
            Sắp hết hạn: {countSslServicesExpiring ? countSslServicesExpiring : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataSslServicesExpired')}
            component={Link}
            to={{ pathname: '/trang-chu/dich-vu/danh-sach-ssl', search: '?loai=het-han' }}
            color="error"
            sx={{ ml: '10px', mr: '10px' }}
          >
            Hết hạn: {countSslServicesExpired ? countSslServicesExpired : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataSslServicesBeforePayment')}
            component={Link}
            to={{ pathname: '/trang-chu/dich-vu/danh-sach-ssl', search: '?loai=cong-no' }}
            color="success"
          >
            Công nợ: {countSslServicesBeforePayment ? countSslServicesBeforePayment : '0'}
          </Button>
        </Box>
        {selectedData === 'data' && data.length > 0 && (
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20
                }
              }
            }}
            pageSizeOptions={[20]}
            checkboxSelection
            // disableSelectionOnClick
            // disableRowSelectionOnClick
          />
        )}
        {selectedData === 'dataSslServicesExpiring' && dataSslServicesExpiring.length > 0 && (
          <DataGrid
            rows={dataSslServicesExpiring}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20
                }
              }
            }}
            pageSizeOptions={[20]}
            checkboxSelection
            // disableSelectionOnClick
            // disableRowSelectionOnClick
          />
        )}
        {selectedData === 'dataSslServicesExpired' && dataSslServicesExpired.length > 0 && (
          <DataGrid
            rows={dataSslServicesExpired}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20
                }
              }
            }}
            pageSizeOptions={[20]}
            checkboxSelection
            // disableSelectionOnClick
            // disableRowSelectionOnClick
          />
        )}
        {selectedData === 'dataSslServicesBeforePayment' && dataSslServicesBeforePayment.length > 0 && (
          <DataGrid
            rows={dataSslServicesBeforePayment}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20
                }
              }
            }}
            pageSizeOptions={[20]}
            checkboxSelection
            // disableSelectionOnClick
            // disableRowSelectionOnClick
          />
        )}
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Xóa thành công!</Alert>
      </Snackbar>
      <Dialog open={openConfirm} onClose={handleClose}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn muốn xóa mục này không?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Huỷ
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

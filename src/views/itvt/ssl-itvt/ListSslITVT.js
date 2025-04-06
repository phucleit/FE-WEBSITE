import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { IconEdit } from '@tabler/icons';
import { Box, Button, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { apiGet, apiDelete, getRegisteredAt, getExpiredAt, getRoles } from '../../../utils/formatUtils';

const LIST_SSL_ITVT = `${process.env.REACT_APP_API_URL}/itvt/ssl`;

export default function ListSslITVT() {
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

  const [dataSslITVTExpiring, setDataSslITVTExpiring] = useState([]);
  const [countSslITVTExpiring, setCountSslITVTExpiring] = useState([]);

  const [dataSslITVTExpired, setDataSslITVTExpired] = useState([]);
  const [countSslITVTExpired, setCountSslITVTExpired] = useState([]);

  useEffect(() => {
    loadListRoles();
    loadListSslITVT();
    loadSslITVTExpiring();
    loadSslITVTExpired();
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

  const loadListSslITVT = async () => {
    const result = await apiGet(`${LIST_SSL_ITVT}`);
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadSslITVTExpiring = async () => {
    const result = await apiGet(`${LIST_SSL_ITVT}/expiring/all`);
    setDataSslITVTExpiring(result.data);
    setCountSslITVTExpiring(result.data.length);
  };

  const loadSslITVTExpired = async () => {
    const result = await apiGet(`${LIST_SSL_ITVT}/expired/all`);
    setDataSslITVTExpired(result.data);
    setCountSslITVTExpired(result.data.length);
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
      apiDelete(`${LIST_SSL_ITVT}`, selectedId)
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
      const listData = await apiGet(`${LIST_SSL_ITVT}`);
      setData(listData.data);
      setDataLength(listData.data.length);

      const listExpiring = await apiGet(`${LIST_SSL_ITVT}/expiring/all`);
      setDataSslITVTExpiring(listExpiring.data);
      setCountSslITVTExpiring(listExpiring.data.length);

      const listExpired = await apiGet(`${LIST_SSL_ITVT}/expired/all`);
      setDataSslITVTExpired(listExpired.data);
      setCountSslITVTExpired(listExpired.data.length);
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
            {params.row.domain_itvt_id.name}
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
    { field: 'expiredAt', headerName: 'Ngày hết hạn', valueGetter: (params) => getExpiredAt(params.row.expiredAt), width: 200 }
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
              <Link to={'/trang-chu/itvt/cap-nhat-ssl-itvt/' + params.row._id}>
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
            <Button variant="contained" component={Link} to="/trang-chu/itvt/them-ssl-itvt">
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
            to={{ pathname: '/trang-chu/itvt/danh-sach-ssl-itvt' }}
          >
            Đang sử dụng: {dataLength ? dataLength : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataSslITVTExpiring')}
            component={Link}
            to={{ pathname: '/trang-chu/itvt/danh-sach-ssl-itvt', search: '?loai=sap-het-han' }}
            color="warning"
            sx={{ ml: '10px', mr: '10px' }}
          >
            Sắp hết hạn: {countSslITVTExpiring ? countSslITVTExpiring : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataSslITVTExpired')}
            component={Link}
            to={{ pathname: '/trang-chu/itvt/danh-sach-ssl-itvt', search: '?loai=het-han' }}
            color="error"
            sx={{ mr: '10px' }}
          >
            Hết hạn: {countSslITVTExpired ? countSslITVTExpired : '0'}
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
        {selectedData === 'dataSslITVTExpiring' && dataSslITVTExpiring.length > 0 && (
          <DataGrid
            rows={dataSslITVTExpiring}
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
        {selectedData === 'dataSslITVTExpired' && dataSslITVTExpired.length > 0 && (
          <DataGrid
            rows={dataSslITVTExpired}
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import MainCard from 'ui-component/cards/MainCard';
import { IconEdit } from '@tabler/icons';
import { Box, Button, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { apiGet, apiDelete, getRegisteredAt, getExpiredAt, getRoles, formatCurrency } from '../../../utils/formatUtils';

const LIST_EMAIL_SERVICES = `${process.env.REACT_APP_API_URL}/services/email`;

export default function ListEmailServices() {
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

  const [dataEmailServicesExpiring, setDataEmailServicesExpiring] = useState([]);
  const [countEmailServicesExpiring, setCountEmailServicesExpiring] = useState([]);

  const [dataEmailServicesExpired, setDataEmailServicesExpired] = useState([]);
  const [countEmailServicesExpired, setCountEmailServicesExpired] = useState([]);

  const [dataEmailServicesBeforePayment, setDataEmailServicesBeforePayment] = useState([]);
  const [countEmailServicesBeforePayment, setCountEmailServicesBeforePayment] = useState([]);

  useEffect(() => {
    loadListRoles();
    loadListEmailServices();
    loadEmailServicesExpiring();
    loadEmailServicesExpired();
    loadEmailServicesBeforePayment();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667467eb263fb998b9925d34');
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667467eb263fb998b9925d35');
      const filteredDelete = dataRoles.filter((role_delete) => role_delete.function_id === '667467eb263fb998b9925d36');
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

  const loadListEmailServices = async () => {
    const result = await apiGet(`${LIST_EMAIL_SERVICES}`);
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadEmailServicesExpiring = async () => {
    const result = await apiGet(`${LIST_EMAIL_SERVICES}/expiring/all`);
    setDataEmailServicesExpiring(result.data);
    setCountEmailServicesExpiring(result.data.length);
  };

  const loadEmailServicesExpired = async () => {
    const result = await apiGet(`${LIST_EMAIL_SERVICES}/expired/all`);
    setDataEmailServicesExpired(result.data);
    setCountEmailServicesExpired(result.data.length);
  };

  const loadEmailServicesBeforePayment = async () => {
    const result = await apiGet(`${LIST_EMAIL_SERVICES}/before-payment/all`);
    setDataEmailServicesBeforePayment(result.data);
    setCountEmailServicesBeforePayment(result.data.length);
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
      apiDelete(`${LIST_EMAIL_SERVICES}`, selectedId)
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
      const listData = await apiGet(`${LIST_EMAIL_SERVICES}`);
      setData(listData.data);
      setDataLength(listData.data.length);

      const listExpiring = await apiGet(`${LIST_EMAIL_SERVICES}/expiring/all`);
      setDataEmailServicesExpiring(listExpiring.data);
      setCountEmailServicesExpiring(listExpiring.data.length);

      const listExpired = await apiGet(`${LIST_EMAIL_SERVICES}/expired/all`);
      setDataEmailServicesExpired(listExpired.data);
      setCountEmailServicesExpired(listExpired.data.length);

      const listBeforePayment = await apiGet(`${LIST_EMAIL_SERVICES}/before-payment/all`);
      setDataEmailServicesBeforePayment(listBeforePayment.data);
      setCountEmailServicesBeforePayment(listBeforePayment.data.length);
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
      field: 'email',
      headerName: 'Gói email',
      width: 180,
      renderCell: (params) => {
        return (
          <span>
            {params.row.email_plan_id.name}
            <br />
            NCC: {params.row.email_supplier_id.name}
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
      headerName: 'Giá dịch vụ / tháng',
      width: 200,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.email_plan_id.price)
    },
    {
      field: 'periods',
      headerName: 'Thời gian',
      width: 130,
      valueGetter: (params) => (params.row.periods ? `${params.row.periods} năm` : '')
    },
    {
      field: 'total_price',
      headerName: 'Thành tiền',
      width: 200,
      renderCell: (params) => {
        return <span>{formatCurrency(params.row.periods * 12 * params.row.email_plan_id.price)}</span>;
      }
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
              <Link to={'/trang-chu/dich-vu/cap-nhat-email/' + params.row._id}>
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
            <Button variant="contained" component={Link} to="/trang-chu/dich-vu/them-email">
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
            to={{ pathname: '/trang-chu/dich-vu/danh-sach-email' }}
          >
            Đang sử dụng: {dataLength ? dataLength : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataEmailServicesExpiring')}
            component={Link}
            to={{ pathname: '/trang-chu/dich-vu/danh-sach-email', search: '?loai=sap-het-han' }}
            color="warning"
            sx={{ ml: '10px', mr: '10px' }}
          >
            Sắp hết hạn: {countEmailServicesExpiring ? countEmailServicesExpiring : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataEmailServicesExpired')}
            component={Link}
            to={{ pathname: '/trang-chu/dich-vu/danh-sach-email', search: '?loai=het-han' }}
            color="error"
            sx={{ mr: '10px' }}
          >
            Hết hạn: {countEmailServicesExpired ? countEmailServicesExpired : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataEmailServicesBeforePayment')}
            component={Link}
            to={{ pathname: '/trang-chu/dich-vu/danh-sach-email', search: '?loai=cong-no' }}
            color="success"
          >
            Công nợ: {countEmailServicesBeforePayment ? countEmailServicesBeforePayment : '0'}
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
        {selectedData === 'dataEmailServicesExpiring' && dataEmailServicesExpiring.length > 0 && (
          <DataGrid
            rows={dataEmailServicesExpiring}
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
        {selectedData === 'dataEmailServicesExpired' && dataEmailServicesExpired.length > 0 && (
          <DataGrid
            rows={dataEmailServicesExpired}
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
        {selectedData === 'dataEmailServicesBeforePayment' && dataEmailServicesBeforePayment.length > 0 && (
          <DataGrid
            rows={dataEmailServicesBeforePayment}
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { IconEdit } from '@tabler/icons';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Box, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import config from '../../config';
import { apiGet, apiDelete, formatPhoneNumberCustomer, getCreatedAt, getRoles, maskPhoneNumber } from '../../utils/formatUtils';

const LIST_CUSTOMERS = `${config.API_URL}/customer`;

export default function ListCustomers() {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState('data');
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);
  const [permissionUpdate, setPermissionUpdate] = useState(false);
  const [permissionDelete, setPermissionDelete] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);

  const [dataGuests, setDataGuests] = useState([]);
  const [countDataGuests, setCountDataGuests] = useState(0);

  const [dataCompany, setDataCompany] = useState([]);
  const [countDataCompany, setCountDataCompany] = useState(0);

  useEffect(() => {
    loadListRoles();
    loadListCustomers();
    loadListDataGuests();
    loadListDataCompany();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667463d04bede188dfb46d7e');
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667463d04bede188dfb46d7f');
      const filteredDelete = dataRoles.filter((role_delete) => role_delete.function_id === '667463d04bede188dfb46b7f');
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

  const loadListCustomers = async () => {
    const result = await apiGet(`${LIST_CUSTOMERS}`);
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadListDataGuests = async () => {
    const result = await apiGet(`${LIST_CUSTOMERS}/type/guests`);
    setDataGuests(result.data);
    setCountDataGuests(result.data.length);
  };

  const loadListDataCompany = async () => {
    const result = await apiGet(`${LIST_CUSTOMERS}/type/company`);
    setDataCompany(result.data);
    setCountDataCompany(result.data.length);
  };

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleClose = () => {
    setOpenConfirm(false);
    setSelectedId(null);
  };

  const handleCloseError = () => {
    setopenError(false);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      apiDelete(`${LIST_CUSTOMERS}`, selectedId)
        .then(() => {
          setOpen(true);
          setData(data.filter((item) => item._id !== selectedId));
          setTimeout(() => {
            setOpen(false);
          }, 1100);
        })
        .catch((error) => {
          setMessageError(error.response.data.message);
          setopenError(true);
        })
        .finally(() => {
          handleClose();
          reloadAllData();
        });
    }
  };

  const reloadAllData = async () => {
    try {
      const customers = await apiGet(`${LIST_CUSTOMERS}`);
      setData(customers.data);
      setDataLength(customers.data.length);

      const guests = await apiGet(`${LIST_CUSTOMERS}/type/guests`);
      setDataGuests(guests.data);
      setCountDataGuests(guests.data.length);

      const company = await apiGet(`${LIST_CUSTOMERS}/type/company`);
      setDataCompany(company.data);
      setCountDataCompany(company.data.length);
    } catch (error) {
      console.log('Error reloading data:', error);
    }
  };

  const columns = [
    { field: 'fullname', headerName: 'Họ và tên', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'gender',
      headerName: 'Giới tính',
      width: 100,
      renderCell: (params) => {
        if (params.row.gender == 1) {
          return <span>Nam</span>;
        } else {
          return <span>Nữ</span>;
        }
      }
    },
    { field: 'idNumber', headerName: 'Số CCCD', width: 150 },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      width: 150,
      valueGetter: (params) => maskPhoneNumber(formatPhoneNumberCustomer(params.row.phone))
    },
    {
      field: 'type_customer',
      headerName: 'Loại khách hàng',
      width: 170,
      renderCell: (params) => {
        if (params.row.type_customer == true) {
          return (
            <Button variant="contained" size="small" color="warning">
              Khách doanh nghiệp
            </Button>
          );
        } else {
          return (
            <Button variant="contained" size="small" color="success">
              Khách cá nhân
            </Button>
          );
        }
      }
    },
    { field: 'address', headerName: 'Địa chỉ', width: 320 },
    { field: 'createdAt', headerName: 'Ngày tạo', valueGetter: (params) => getCreatedAt(params.row.createdAt), width: 180 }
  ];

  if (permissionUpdate || permissionDelete) {
    columns.unshift({
      field: 'action',
      headerName: 'Hành động',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {permissionUpdate && (
              <Link to={'/trang-chu/khach-hang/cap-nhat-khach-hang/' + params.row._id}>
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
        title="Danh sách khách hàng"
        secondary={
          permissionAdd && (
            <Button variant="contained" component={Link} to="/trang-chu/khach-hang/them-khach-hang">
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
            to={{ pathname: '/trang-chu/khach-hang/danh-sach-khach-hang' }}
          >
            Tất cả: {dataLength ? dataLength : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataGuests')}
            component={Link}
            to={{ pathname: '/trang-chu/khach-hang/danh-sach-khach-hang', search: '?loai=khach-ca-nhan' }}
            sx={{ ml: '10px', mr: '10px' }}
            color="success"
          >
            Khách cá nhân: {countDataGuests ? countDataGuests : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataCompany')}
            component={Link}
            to={{ pathname: '/trang-chu/khach-hang/danh-sach-khach-hang', search: '?loai=khach-doanh-nghiep' }}
            sx={{ mr: '10px' }}
            color="warning"
          >
            Khách doanh nghiệp: {countDataCompany ? countDataCompany : '0'}
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
        {selectedData === 'dataGuests' && dataGuests.length > 0 && (
          <DataGrid
            rows={dataGuests}
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
        {selectedData === 'dataCompany' && dataCompany.length > 0 && (
          <DataGrid
            rows={dataCompany}
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
      <Snackbar
        open={openError}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1500}
      >
        <Alert severity="error">{messageError}</Alert>
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { IconEdit } from '@tabler/icons';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Button, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { apiGet, apiDelete, getCreatedAt, getRoles } from '../../../utils/formatUtils';

const LIST_WEBSITE_SERVICES = `${process.env.REACT_APP_API_URL}/services/website`;

export default function ListWebsiteServices() {
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

  const [dataWebsiteServicesClosed, setDataWebsiteServicesClosed] = useState([]);
  const [countWebsiteServicesClosed, setCountWebsiteServicesClosed] = useState([]);

  useEffect(() => {
    loadListRoles();
    loadListWebsiteServices();
    loadListWebsiteClosed();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667467eb263fb998b9925d46');
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667467eb263fb998b9925d47');
      const filteredDelete = dataRoles.filter((role_delete) => role_delete.function_id === '667467eb263fb998b9925d48');
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

  const loadListWebsiteServices = async () => {
    const result = await apiGet(`${LIST_WEBSITE_SERVICES}`);
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadListWebsiteClosed = async () => {
    const result = await apiGet(`${LIST_WEBSITE_SERVICES}/closed/all`);
    setDataWebsiteServicesClosed(result.data);
    setCountWebsiteServicesClosed(result.data.length);
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
      apiDelete(`${LIST_WEBSITE_SERVICES}`, selectedId)
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
      const listData = await apiGet(`${LIST_WEBSITE_SERVICES}`);
      setData(listData.data);
      setDataLength(listData.data.length);

      const listClosed = await apiGet(`${LIST_WEBSITE_SERVICES}/closed/all`);
      setDataWebsiteServicesClosed(listClosed.data);
      setCountWebsiteServicesClosed(listClosed.data.length);
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
      field: 'price',
      headerName: 'Giá dịch vụ',
      width: 230,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.price)
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
      field: 'status',
      headerName: 'Trạng thái',
      width: 230,
      renderCell: (params) => {
        if (params.row.status == 1) {
          return (
            <Button variant="contained" size="small">
              Đang hoạt động
            </Button>
          );
        } else if (params.row.status == 2) {
          return (
            <Button variant="contained" size="small" color="error">
              Đã đóng
            </Button>
          );
        }
      }
    },
    { field: 'createdAt', headerName: 'Ngày khởi tạo', valueGetter: (params) => getCreatedAt(params.row.createdAt), width: 230 }
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
              <Link to={'/trang-chu/dich-vu/cap-nhat-website/' + params.row._id}>
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
            <Button variant="contained" component={Link} to="/trang-chu/dich-vu/them-website">
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
            to={{ pathname: '/trang-chu/dich-vu/danh-sach-website' }}
          >
            Đang sử dụng: {dataLength ? dataLength : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataWebsiteServicesClosed')}
            component={Link}
            to={{ pathname: '/trang-chu/dich-vu/danh-sach-website', search: '?loai=da-dong' }}
            color="error"
            sx={{ ml: '10px', mr: '10px' }}
          >
            Đã đóng: {countWebsiteServicesClosed ? countWebsiteServicesClosed : '0'}
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
        {selectedData === 'dataWebsiteServicesClosed' && dataWebsiteServicesClosed.length > 0 && (
          <DataGrid
            rows={dataWebsiteServicesClosed}
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

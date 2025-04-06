import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { IconEdit } from '@tabler/icons';
import { Box, Button, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { apiGet, apiDelete, getRegisteredAt, getExpiredAt, getRoles } from '../../../utils/formatUtils';

const LIST_DOMAIN_ITVT = `${process.env.REACT_APP_API_URL}/itvt/domain`;

export default function ListDomainITVT() {
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

  const [dataDomainITVTExpiring, setDataDomainITVTExpiring] = useState([]);
  const [countDomainITVTExpiring, setCountDomainITVTExpiring] = useState([]);

  const [dataDomainITVTExpired, setDataDomainITVTExpired] = useState([]);
  const [countDomainITVTExpired, setCountDomainITVTExpired] = useState([]);

  useEffect(() => {
    loadListRoles();
    loadListDomainITVT();
    loadListDomainITVTExpiring();
    loadListDomainITVTExpired();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667467eb263fb998b9925d2e');
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667467eb263fb998b9925d2f');
      const filteredDelete = dataRoles.filter((role_delete) => role_delete.function_id === '667467eb263fb998b9925d30');
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

  const loadListDomainITVT = async () => {
    const result = await apiGet(`${LIST_DOMAIN_ITVT}`);
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadListDomainITVTExpiring = async () => {
    const result = await apiGet(`${LIST_DOMAIN_ITVT}/expiring/all`);
    setDataDomainITVTExpiring(result.data);
    setCountDomainITVTExpiring(result.data.length);
  };

  const loadListDomainITVTExpired = async () => {
    const result = await apiGet(`${LIST_DOMAIN_ITVT}/expired/all`);
    setDataDomainITVTExpired(result.data);
    setCountDomainITVTExpired(result.data.length);
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
      apiDelete(`${LIST_DOMAIN_ITVT}`, selectedId)
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
      const listData = await apiGet(`${LIST_DOMAIN_ITVT}`);
      setData(listData.data);
      setDataLength(listData.data.length);

      const listExpiring = await apiGet(`${LIST_DOMAIN_ITVT}/expiring/all`);
      setDataDomainITVTExpiring(listExpiring.data);
      setCountDomainITVTExpiring(listExpiring.data.length);

      const listExpired = await apiGet(`${LIST_DOMAIN_ITVT}/expired/all`);
      setDataDomainITVTExpired(listExpired.data);
      setCountDomainITVTExpired(listExpired.data.length);
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
            {params.row.name}
            <br />
            Domain {params.row.domain_plan_id.name} (NCC: {params.row.supplier_id.name})
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
      valueGetter: (params) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.domain_plan_id.price)
    },
    {
      field: 'periods',
      headerName: 'Thời gian',
      width: 130,
      valueGetter: (params) => `${params.row.periods} năm`
    },
    {
      field: 'total_price',
      headerName: 'Thành tiền',
      width: 200,
      renderCell: (params) => {
        return (
          <span>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              params.row.domain_plan_id.price * params.row.periods
            )}
          </span>
        );
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
    {
      field: 'ping_cloudflare',
      headerName: 'Ping cloudflare',
      width: 150,
      renderCell: (params) => {
        if (params.row.ping_cloudflare == true) {
          return (
            <Button variant="contained" size="small">
              Đã ping
            </Button>
          );
        } else {
          return (
            <Button variant="contained" size="small" color="error">
              Chưa ping
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
              <Link to={'/trang-chu/itvt/cap-nhat-ten-mien-itvt/' + params.row._id}>
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
            <Button variant="contained" component={Link} to="/trang-chu/itvt/them-ten-mien-itvt">
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
            to={{ pathname: '/trang-chu/itvt/danh-sach-ten-mien-itvt' }}
          >
            Đang sử dụng: {dataLength ? dataLength : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataDomainITVTExpiring')}
            component={Link}
            to={{ pathname: '/trang-chu/itvt/danh-sach-ten-mien-itvt', search: '?loai=sap-het-han' }}
            color="warning"
            sx={{ ml: '10px', mr: '10px' }}
          >
            Sắp hết hạn: {countDomainITVTExpiring ? countDomainITVTExpiring : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataDomainITVTExpired')}
            component={Link}
            to={{ pathname: '/trang-chu/itvt/danh-sach-ten-mien-itvt', search: '?loai=het-han' }}
            color="error"
            sx={{ mr: '10px' }}
          >
            Hết hạn: {countDomainITVTExpired ? countDomainITVTExpired : '0'}
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
        {selectedData === 'dataDomainITVTExpiring' && dataDomainITVTExpiring.length > 0 && (
          <DataGrid
            rows={dataDomainITVTExpiring}
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
        {selectedData === 'dataDomainITVTExpired' && dataDomainITVTExpired.length > 0 && (
          <DataGrid
            rows={dataDomainITVTExpired}
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

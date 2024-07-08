import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IconEdit } from '@tabler/icons';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';
import { apiGet, apiDelete, getRegisteredAt, getExpiredAt, getRoles } from '../../../utils/formatUtils';

const LIST_MOBILE_NETWORK_SERVICES = `${config.API_URL}/services/mobile-network`;

export default function ListMobileNetworkServices() {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState('data');
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);
  const [permissionUpdate, setPermissionUpdate] = useState(false);
  const [permissionDelete, setPermissionDelete] = useState(false);

  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState('');

  const [dataMobileNetworkServicesExpiring, setDataMobileNetworkServicesExpiring] = useState([]);
  const [countMobileNetworkServicesExpiring, setCountMobileNetworkServicesExpiring] = useState([]);

  const [dataMobileNetworkServicesExpired, setDataMobileNetworkServicesExpired] = useState([]);
  const [countMobileNetworkServicesExpired, setCountMobileNetworkServicesExpired] = useState([]);

  useEffect(() => {
    loadListRoles();
    loadListMobileNetworkServices();
    loadListMobileNetworkServicesExpiring();
    loadListMobileNetworkServicesExpired();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667467eb263fb998b9925d40');
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667467eb263fb998b9925d41');
      const filteredDelete = dataRoles.filter((role_delete) => role_delete.function_id === '667467eb263fb998b9925d42');
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

  const loadListMobileNetworkServices = async () => {
    const result = await apiGet(`${LIST_MOBILE_NETWORK_SERVICES}`);
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadListMobileNetworkServicesExpiring = async () => {
    const result = await apiGet(`${LIST_MOBILE_NETWORK_SERVICES}/expiring/all`);
    setDataMobileNetworkServicesExpiring(result.data);
    setCountMobileNetworkServicesExpiring(result.data.length);
  };

  const loadListMobileNetworkServicesExpired = async () => {
    const result = await apiGet(`${LIST_MOBILE_NETWORK_SERVICES}/expired/all`);
    setDataMobileNetworkServicesExpired(result.data);
    setCountMobileNetworkServicesExpired(result.data.length);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      apiDelete(`${LIST_MOBILE_NETWORK_SERVICES}`, id)
        .then(() => {
          setOpen(true);
          setData((prevData) => prevData.filter((item) => item._id !== id));
          setDataLength((prevCount) => prevCount - 1);
          setTimeout(() => {
            setOpen(false);
          }, 1100);
        })
        .catch((error) => console.log(error));
    }
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Tên gói',
      width: 250,
      renderCell: (params) => {
        return (
          <span>
            {params.row.mobileNetworkPlanId.name}
            <br />
            (NMDD: {params.row.supplier_mobile_network_id.name})
          </span>
        );
      }
    },
    {
      field: 'customer',
      headerName: 'Khách hàng',
      width: 350,
      renderCell: (params) => {
        if (params.row.customerId.gender == 1) {
          return (
            <span>
              Anh {params.row.customerId.fullname}
              <br />
              {params.row.customerId.email} / {params.row.customerId.phone}
            </span>
          );
        } else {
          return (
            <span>
              Chị {params.row.customerId.fullname}
              <br />
              {params.row.customerId.email} / {params.row.customerId.phone}
            </span>
          );
        }
      }
    },
    {
      field: 'price',
      headerName: 'Giá gói',
      width: 200,
      valueGetter: (params) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.mobileNetworkPlanId.price)
    },
    {
      field: 'periods',
      headerName: 'Thời gian',
      width: 130,
      valueGetter: (params) => `${params.row.periods} năm`
    },
    {
      field: 'totalPrice',
      headerName: 'Thành tiền',
      width: 200,
      renderCell: (params) => {
        return (
          <span>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              params.row.mobileNetworkPlanId.price * params.row.periods
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
              <Link to={'/dashboard/services/update-mobile-network/' + params.row._id}>
                <IconEdit />
              </Link>
            )}
            {permissionDelete && (
              <DeleteOutline style={{ cursor: 'pointer', color: '#ff6666' }} onClick={() => handleDelete(params.row._id)} />
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
            <Button variant="contained" component={Link} to="/dashboard/services/add-mobile-network">
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
            to={{ pathname: '/dashboard/services/list-mobile-network' }}
          >
            Đang sử dụng: {dataLength ? dataLength : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataMobileNetworkServicesExpiring')}
            component={Link}
            to={{ pathname: '/dashboard/services/list-mobile-network', search: '?data=expiring' }}
            color="warning"
            sx={{ ml: '10px', mr: '10px' }}
          >
            Sắp hết hạn: {countMobileNetworkServicesExpiring ? countMobileNetworkServicesExpiring : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataMobileNetworkServicesExpired')}
            component={Link}
            to={{ pathname: '/dashboard/services/list-mobile-network', search: '?data=expired' }}
            color="error"
            sx={{ ml: '10px', mr: '10px' }}
          >
            Hết hạn: {countMobileNetworkServicesExpired ? countMobileNetworkServicesExpired : '0'}
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
        {selectedData === 'dataMobileNetworkServicesExpiring' && dataMobileNetworkServicesExpiring.length > 0 && (
          <DataGrid
            rows={dataMobileNetworkServicesExpiring}
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
        {selectedData === 'dataMobileNetworkServicesExpired' && dataMobileNetworkServicesExpired.length > 0 && (
          <DataGrid
            rows={dataMobileNetworkServicesExpired}
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
    </>
  );
}

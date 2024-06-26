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
import { apiGet, apiDelete, getRegisteredAt, getExpiredAt } from '../../../utils/formatUtils';

const LIST_CONTENT_SERVICES = `${config.API_URL}/services/content`;

export default function ListContentServices() {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState('data');

  const columns = [
    {
      field: 'action',
      headerName: 'Hành động',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/dashboard/services/update-content/' + params.row._id}>
              <IconEdit />
            </Link>
            <DeleteOutline style={{ cursor: 'pointer', color: '#ff6666' }} onClick={() => handleDelete(params.row._id)} />
          </>
        );
      }
    },
    {
      field: 'name',
      headerName: 'Tên gói content',
      width: 220,
      renderCell: (params) => {
        return <span>{params.row.content_plan_id.name}</span>;
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
      valueGetter: (params) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.content_plan_id.price)
    },
    {
      field: 'periods',
      headerName: 'Thời gian',
      width: 120,
      valueGetter: (params) => (params.row.periods ? `${params.row.periods} tháng` : '')
    },
    {
      field: 'total_price',
      headerName: 'Thành tiền',
      width: 200,
      renderCell: (params) => {
        return (
          <span>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              params.row.content_plan_id.price * params.row.periods
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

  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState('');

  const [dataContentServicesExpiring, setDataContentServicesExpiring] = useState([]);
  const [countContentServicesExpiring, setCountContentServicesExpiring] = useState([]);

  const [dataContentServicesExpired, setDataContentServicesExpired] = useState([]);
  const [countContentServicesExpired, setCountContentServicesExpired] = useState([]);

  useEffect(() => {
    loadListContentServices();
    loadContentServicesExpiring();
    loadContentServicesExpired();
  }, []);

  const loadListContentServices = async () => {
    const result = await apiGet(`${LIST_CONTENT_SERVICES}`);
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadContentServicesExpiring = async () => {
    const result = await apiGet(`${LIST_CONTENT_SERVICES}/expiring/all`);
    setDataContentServicesExpiring(result.data);
    setCountContentServicesExpiring(result.data.length);
  };

  const loadContentServicesExpired = async () => {
    const result = await apiGet(`${LIST_CONTENT_SERVICES}/expired/all`);
    setDataContentServicesExpired(result.data);
    setCountContentServicesExpired(result.data.length);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      apiDelete(`${LIST_CONTENT_SERVICES}`, id)
        .then(() => {
          setOpen(true);
          setData((prevData) => prevData.filter((item) => item._id !== id));
          setDataLength((prevCount) => prevCount - 1);
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
          <Button variant="contained" component={Link} to="/dashboard/services/add-content">
            Thêm mới
          </Button>
        }
      >
        <Box component="form" sx={{ flexGrow: 1, mb: '20px' }} noValidate autoComplete="off">
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('data')}
            component={Link}
            to={{ pathname: '/dashboard/services/list-content' }}
          >
            Đang sử dụng: {dataLength ? dataLength : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataContentServicesExpiring')}
            component={Link}
            to={{ pathname: '/dashboard/services/list-content', search: '?data=expiring' }}
            color="warning"
            sx={{ ml: '10px', mr: '10px' }}
          >
            Sắp hết hạn: {countContentServicesExpiring ? countContentServicesExpiring : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataContentServicesExpired')}
            component={Link}
            to={{ pathname: '/dashboard/services/list-content', search: '?data=expired' }}
            color="error"
          >
            Hết hạn: {countContentServicesExpired ? countContentServicesExpired : '0'}
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
        {selectedData === 'dataContentServicesExpiring' && dataContentServicesExpiring.length > 0 && (
          <DataGrid
            rows={dataContentServicesExpiring}
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
        {selectedData === 'dataContentServicesExpired' && dataContentServicesExpired.length > 0 && (
          <DataGrid
            rows={dataContentServicesExpired}
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
import { getRegisteredAt, getExpiredAt } from '../../../utils/formatUtils';

const LIST_SSL_SERVICES = `${config.API_URL}/services/ssl`;

export default function ListSslServices() {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState('data');

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
      field: 'before_payment',
      headerName: 'Gia hạn trước khi thanh toán',
      width: 200,
      renderCell: (params) => {
        if (params.row.before_payment == true) {
          return (
            <Button variant="contained" size="small" color="error">
              Công nợ
            </Button>
          );
        } else if (params.row.before_payment == false) {
          return (
            <Button variant="contained" size="small">
              Đã thanh toán
            </Button>
          );
        }
      }
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/dashboard/services/update-ssl/' + params.row._id}>
              <IconEdit />
            </Link>
            <DeleteOutline style={{ cursor: 'pointer', color: '#ff6666' }} onClick={() => handleDelete(params.row._id)} />
          </>
        );
      }
    }
  ];

  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState('');

  const [dataSslServicesExpiring, setDataSslServicesExpiring] = useState([]);
  const [countSslServicesExpiring, setCountSslServicesExpiring] = useState([]);

  const [dataSslServicesExpired, setDataSslServicesExpired] = useState([]);
  const [countSslServicesExpired, setCountSslServicesExpired] = useState([]);

  const [dataSslServicesBeforePayment, setDataSslServicesBeforePayment] = useState([]);
  const [countSslServicesBeforePayment, setCountSslServicesBeforePayment] = useState([]);

  useEffect(() => {
    loadListSslServices();
    loadSslServicesExpiring();
    loadSslServicesExpired();
    loadSslServicesBeforePayment();
  }, []);

  const loadListSslServices = async () => {
    const result = await axios.get(`${LIST_SSL_SERVICES}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadSslServicesExpiring = async () => {
    const result = await axios.get(`${LIST_SSL_SERVICES}/expiring/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDataSslServicesExpiring(result.data);
    setCountSslServicesExpiring(result.data.length);
  };

  const loadSslServicesExpired = async () => {
    const result = await axios.get(`${LIST_SSL_SERVICES}/expired/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDataSslServicesExpired(result.data);
    setCountSslServicesExpired(result.data.length);
  };

  const loadSslServicesBeforePayment = async () => {
    const result = await axios.get(`${LIST_SSL_SERVICES}/before-payment/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDataSslServicesBeforePayment(result.data);
    setCountSslServicesBeforePayment(result.data.length);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_SSL_SERVICES}/` + id, {
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
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
          <Button variant="contained" component={Link} to="/dashboard/services/add-ssl">
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
            to={{ pathname: '/dashboard/services/list-ssl' }}
          >
            Đang sử dụng: {dataLength ? dataLength : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataSslServicesExpiring')}
            component={Link}
            to={{ pathname: '/dashboard/services/list-ssl', search: '?data=expiring' }}
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
            to={{ pathname: '/dashboard/services/list-ssl', search: '?data=expired' }}
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
            to={{ pathname: '/dashboard/services/list-ssl', search: '?data=payment' }}
            color="error"
          >
            Công nợ: {countSslServicesBeforePayment ? countSslServicesBeforePayment : '0'}
          </Button>
        </Box>
        {selectedData === 'data' && data.length > 0 && (
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            disableRowSelectionOnClick
          />
        )}
        {selectedData === 'dataSslServicesExpiring' && dataSslServicesExpiring.length > 0 && (
          <DataGrid
            rows={dataSslServicesExpiring}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            disableRowSelectionOnClick
          />
        )}
        {selectedData === 'dataSslServicesExpired' && dataSslServicesExpired.length > 0 && (
          <DataGrid
            rows={dataSslServicesExpired}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            disableRowSelectionOnClick
          />
        )}
        {selectedData === 'dataSslServicesBeforePayment' && dataSslServicesBeforePayment.length > 0 && (
          <DataGrid
            rows={dataSslServicesBeforePayment}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            disableRowSelectionOnClick
          />
        )}
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Xóa thành công!</Alert>
      </Snackbar>
    </>
  );
}

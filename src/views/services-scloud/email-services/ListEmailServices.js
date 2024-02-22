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

const LIST_EMAIL_SERVICES = `${config.API_URL}/services/email`;

export default function ListEmailServices() {
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
              params.row.email_plan_id.price * 12 * params.row.periods
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
            <Link to={'/dashboard/services/update-email/' + params.row._id}>
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

  const [dataEmailServicesExpiring, setDataEmailServicesExpiring] = useState([]);
  const [countEmailServicesExpiring, setCountEmailServicesExpiring] = useState([]);

  const [dataEmailServicesExpired, setDataEmailServicesExpired] = useState([]);
  const [countEmailServicesExpired, setCountEmailServicesExpired] = useState([]);

  const [dataEmailServicesBeforePayment, setDataEmailServicesBeforePayment] = useState([]);
  const [countEmailServicesBeforePayment, setCountEmailServicesBeforePayment] = useState([]);

  useEffect(() => {
    loadListEmailServices();
    loadEmailServicesExpiring();
    loadEmailServicesExpired();
    loadEmailServicesBeforePayment();
  }, []);

  const loadListEmailServices = async () => {
    const result = await axios.get(`${LIST_EMAIL_SERVICES}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadEmailServicesExpiring = async () => {
    const result = await axios.get(`${LIST_EMAIL_SERVICES}/expiring/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDataEmailServicesExpiring(result.data);
    setCountEmailServicesExpiring(result.data.length);
  };

  const loadEmailServicesExpired = async () => {
    const result = await axios.get(`${LIST_EMAIL_SERVICES}/expired/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDataEmailServicesExpired(result.data);
    setCountEmailServicesExpired(result.data.length);
  };

  const loadEmailServicesBeforePayment = async () => {
    const result = await axios.get(`${LIST_EMAIL_SERVICES}/before-payment/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDataEmailServicesBeforePayment(result.data);
    setCountEmailServicesBeforePayment(result.data.length);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_EMAIL_SERVICES}/` + id, {
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
          <Button variant="contained" component={Link} to="/dashboard/services/add-email">
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
            to={{ pathname: '/dashboard/services/list-email' }}
          >
            Đang sử dụng: {dataLength ? dataLength : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSelectedData('dataEmailServicesExpiring')}
            component={Link}
            to={{ pathname: '/dashboard/services/list-email', search: '?data=expiring' }}
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
            to={{ pathname: '/dashboard/services/list-email', search: '?data=expired' }}
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
            to={{ pathname: '/dashboard/services/list-email', search: '?data=payment' }}
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
            disableSelectionOnClick
            disableRowSelectionOnClick
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
            disableSelectionOnClick
            disableRowSelectionOnClick
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
            disableSelectionOnClick
            disableRowSelectionOnClick
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

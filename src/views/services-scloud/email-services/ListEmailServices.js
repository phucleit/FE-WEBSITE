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

const LIST_EMAIL_SERVICES = `${config.API_URL}/services/email`;

export default function ListEmailServices() {
  const [open, setOpen] = useState(false);

  const getCreatedAt = (params) => {
    var timeStamp = params.row.createdAt;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
    return date + ' ' + time;
  };

  const getExpiredAt = (params) => {
    var timeStamp = params.row.expiredAt;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
    return date + ' ' + time;
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Tên miền',
      width: 200,
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
      width: 130,
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
      field: 'price',
      headerName: 'Giá dịch vụ / tháng',
      width: 170,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.email_plan_id.price)
    },
    {
      field: 'customer',
      headerName: 'Khách hàng',
      width: 240,
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
      field: 'periods',
      headerName: 'Thời gian',
      width: 100,
      valueGetter: (params) => (params.row.periods ? `${params.row.periods} năm` : '')
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 200,
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
    { field: 'createdAt', headerName: 'Ngày khỏi tạo', valueGetter: getCreatedAt, width: 180 },
    { field: 'expiredAt', headerName: 'Ngày hết hạn', valueGetter: getExpiredAt, width: 180 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/services/update-email/' + params.row._id}>
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

  const [countEmailServicesExpiring, setCountEmailServicesExpiring] = useState([]);
  const [countEmailServicesExpired, setCountEmailServicesExpired] = useState([]);

  useEffect(() => {
    loadListEmailServices();
    loadEmailServicesExpiring();
    loadEmailServicesExpired();
  }, []);

  const loadListEmailServices = async () => {
    const result = await axios.get(`${LIST_EMAIL_SERVICES}`);
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadEmailServicesExpiring = async () => {
    const result = await axios.get(`${LIST_EMAIL_SERVICES}/expiring/all`);
    setData(result.data);
    setCountEmailServicesExpiring(result.data.length);
  };

  const loadEmailServicesExpired = async () => {
    const result = await axios.get(`${LIST_EMAIL_SERVICES}/expired/all`);
    setData(result.data);
    setCountEmailServicesExpired(result.data.length);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_EMAIL_SERVICES}/` + id)
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
          <Button variant="contained" component={Link} to="/services/add-email">
            Thêm mới
          </Button>
        }
      >
        <Box component="form" sx={{ flexGrow: 1, mb: '20px' }} noValidate autoComplete="off">
          <Button variant="contained" size="small" onClick={loadListEmailServices}>
            Đang sử dụng: {dataLength ? dataLength : '0'}
          </Button>
          <Button variant="contained" size="small" onClick={loadEmailServicesExpiring} color="warning" sx={{ ml: '10px', mr: '10px' }}>
            Sắp hết hạn: {countEmailServicesExpiring ? countEmailServicesExpiring : '0'}
          </Button>
          <Button variant="contained" size="small" onClick={loadEmailServicesExpired} color="error">
            Hết hạn: {countEmailServicesExpired ? countEmailServicesExpired : '0'}
          </Button>
        </Box>
        {data.length ? (
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            disableRowSelectionOnClick
          />
        ) : (
          ''
        )}
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Xóa thành công!</Alert>
      </Snackbar>
    </>
  );
}

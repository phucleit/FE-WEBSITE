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

const LIST_MAINTENANCE_SERVICES = `${config.API_URL}/services/maintenance`;

export default function ListMaintenanceServices() {
  const [open, setOpen] = useState(false);

  const columns = [
    {
      field: 'service_type',
      headerName: 'Loại dịch vụ',
      width: 160,
      renderCell: (params) => {
        if (params.row.service_type == 13) {
          return <span>Tên miền</span>;
        } else if (params.row.service_type == 14) {
          return <span>Hosting</span>;
        } else if (params.row.service_type == 15) {
          return <span>Email</span>;
        } else if (params.row.service_type == 16) {
          return <span>SSL</span>;
        } else if (params.row.service_type == 17) {
          return <span>Thiết kế website</span>;
        } else if (params.row.service_type == 18) {
          return <span>Viết bài Content & PR</span>;
        } else if (params.row.service_type == 19) {
          return <span>Toplist Vũng Tàu</span>;
        }
      }
    },
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
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.maintenance_plan_id.price)
    },
    {
      field: 'periods',
      headerName: 'Thời gian',
      width: 130,
      valueGetter: (params) => `${params.row.periods} tháng`
    },
    {
      field: 'total_price',
      headerName: 'Thành tiền',
      width: 200,
      valueGetter: (params) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
          params.row.maintenance_plan_id.price * params.row.periods
        )
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
      field: 'action',
      headerName: 'Hành động',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/dashboard/services/update-maintenance/' + params.row._id}>
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

  const [countMaintenanceServicesExpiring, setcountMaintenanceServicesExpiring] = useState([]);
  const [countMaintenanceServicesExpired, setcountMaintenanceServicesExpired] = useState([]);

  useEffect(() => {
    loadListMaintenanceServices();
    loadMaintenanceServicesExpiring();
    loadMaintenanceServicesExpired();
  }, []);

  const loadListMaintenanceServices = async () => {
    const result = await axios.get(`${LIST_MAINTENANCE_SERVICES}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadMaintenanceServicesExpiring = async () => {
    const result = await axios.get(`${LIST_MAINTENANCE_SERVICES}/expiring/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setData(result.data);
    setcountMaintenanceServicesExpiring(result.data.length);
  };

  const loadMaintenanceServicesExpired = async () => {
    const result = await axios.get(`${LIST_MAINTENANCE_SERVICES}/expired/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setData(result.data);
    setcountMaintenanceServicesExpired(result.data.length);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_MAINTENANCE_SERVICES}/` + id, {
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
          <Button variant="contained" component={Link} to="/dashboard/services/add-maintenance">
            Thêm mới
          </Button>
        }
      >
        <Box component="form" sx={{ flexGrow: 1, mb: '20px' }} noValidate autoComplete="off">
          <Button variant="contained" size="small" onClick={loadListMaintenanceServices}>
            Đang sử dụng: {dataLength ? dataLength : '0'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={loadMaintenanceServicesExpiring}
            color="warning"
            sx={{ ml: '10px', mr: '10px' }}
          >
            Sắp hết hạn: {countMaintenanceServicesExpiring ? countMaintenanceServicesExpiring : '0'}
          </Button>
          <Button variant="contained" size="small" onClick={loadMaintenanceServicesExpired} color="error">
            Hết hạn: {countMaintenanceServicesExpired ? countMaintenanceServicesExpired : '0'}
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

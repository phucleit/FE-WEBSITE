import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IconEdit } from '@tabler/icons';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';
import { getCreatedAt } from '../../../utils/formatUtils';

const LIST_WEBSITE_SERVICES = `${config.API_URL}/services/website`;

export default function ListWebsiteServices() {
  const [open, setOpen] = useState(false);

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
    { field: 'createdAt', headerName: 'Ngày khởi tạo', valueGetter: (params) => getCreatedAt(params.row.createdAt), width: 230 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/dashboard/services/update-website/' + params.row._id}>
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

  const [countWebsiteServicesClosed, setCountWebsiteServicesClosed] = useState([]);

  useEffect(() => {
    loadListWebsiteServices();
    loadListWebsiteClosed();
  }, []);

  const loadListWebsiteServices = async () => {
    const result = await axios.get(`${LIST_WEBSITE_SERVICES}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadListWebsiteClosed = async () => {
    const result = await axios.get(`${LIST_WEBSITE_SERVICES}/closed/all`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setData(result.data);
    setCountWebsiteServicesClosed(result.data.length);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_WEBSITE_SERVICES}/` + id, {
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
          <Button variant="contained" component={Link} to="/dashboard/services/add-website">
            Thêm mới
          </Button>
        }
      >
        <Box component="form" sx={{ flexGrow: 1, mb: '20px' }} noValidate autoComplete="off">
          <Button variant="contained" size="small" onClick={loadListWebsiteServices}>
            Đang hoạt động: {dataLength ? dataLength : '0'}
          </Button>
          <Button variant="contained" size="small" onClick={loadListWebsiteClosed} color="error" sx={{ ml: '10px', mr: '10px' }}>
            Đã đóng: {countWebsiteServicesClosed ? countWebsiteServicesClosed : '0'}
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

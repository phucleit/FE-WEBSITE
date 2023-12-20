import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IconEdit } from '@tabler/icons';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';

const LIST_CONTENT_SERVICES = `${config.API_URL}/services/content`;

export default function ListContentServices() {
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
      headerName: 'Tên gói content',
      width: 220,
      renderCell: (params) => {
        return <span>{params.row.content_plan_id.name}</span>;
      }
    },
    {
      field: 'price',
      headerName: 'Giá dịch vụ / tháng',
      width: 170,
      valueGetter: (params) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.content_plan_id.price)
    },
    {
      field: 'customer',
      headerName: 'Khách hàng',
      width: 300,
      renderCell: (params) => {
        if (params.row.customer_id.gender == 'Nam') {
          return (
            <span>
              Anh {params.row.customer_id.fullname}
              <br />
              {params.row.customer_id.email} / {params.row.customer_id.phone}
            </span>
          );
        } else if (params.row.customer_id.gender == 'nam') {
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
    { field: 'createdAt', headerName: 'Ngày khỏi tạo', valueGetter: getCreatedAt, width: 220 },
    { field: 'expiredAt', headerName: 'Ngày hết hạn', valueGetter: getExpiredAt, width: 220 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/services/update-content/' + params.row._id}>
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

  const [countContentServicesExpiring, setCountContentServicesExpiring] = useState([]);
  const [countContentServicesExpired, setCountContentServicesExpired] = useState([]);

  useEffect(() => {
    loadListContentServices();
    loadContentServicesExpiring();
    loadContentServicesExpired();
  }, []);

  const loadListContentServices = async () => {
    const result = await axios.get(`${LIST_CONTENT_SERVICES}`);
    setData(result.data);
    setDataLength(result.data.length);
  };

  const loadContentServicesExpiring = async () => {
    const result = await axios.get(`${LIST_CONTENT_SERVICES}/expiring/all`);
    // setData(result.data);
    setCountContentServicesExpiring(result.data.length);
  };

  const loadContentServicesExpired = async () => {
    const result = await axios.get(`${LIST_CONTENT_SERVICES}/expired/all`);
    // setData(result.data);
    setCountContentServicesExpired(result.data.length);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_CONTENT_SERVICES}/` + id)
        .then(() => {
          setData((prevData) => prevData.filter((item) => item._id !== id));
          setDataLength((prevCount) => prevCount - 1);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <MainCard
      title="Danh sách"
      secondary={
        <Button variant="contained" href="/services/add-content">
          Thêm mới
        </Button>
      }
    >
      <Box component="form" sx={{ flexGrow: 1, mb: '20px' }} noValidate autoComplete="off">
        <Button variant="contained" size="small" onClick={loadListContentServices}>
          Đang sử dụng: {dataLength ? dataLength : '0'}
        </Button>
        <Button variant="contained" size="small" onClick={loadContentServicesExpiring} color="warning" sx={{ ml: '10px', mr: '10px' }}>
          Sắp hết hạn: {countContentServicesExpiring ? countContentServicesExpiring : '0'}
        </Button>
        <Button variant="contained" size="small" onClick={loadContentServicesExpired} color="error">
          Hết hạn: {countContentServicesExpired ? countContentServicesExpired : '0'}
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
  );
}

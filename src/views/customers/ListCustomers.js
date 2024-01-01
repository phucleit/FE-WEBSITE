import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

import MainCard from 'ui-component/cards/MainCard';
import { IconEdit } from '@tabler/icons';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import config from '../../config';

const LIST_CUSTOMERS = `${config.API_URL}/customer`;

export default function ListCustomers() {
  const [open, setOpen] = useState(false);

  const getCreatedAt = (params) => {
    var timeStamp = params.row.createdAt;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
    return date + ' ' + time;
  };

  const columns = [
    { field: 'fullname', headerName: 'Họ và tên', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'gender',
      headerName: 'Giới tính',
      width: 100,
      renderCell: (params) => {
        if (params.row.gender == 1) {
          return <span>Nam</span>;
        } else {
          return <span>Nữ</span>;
        }
      }
    },
    { field: 'idNumber', headerName: 'Số CCCD', width: 150 },
    { field: 'phone', headerName: 'Số điện thoại', width: 150 },
    { field: 'address', headerName: 'Địa chỉ', width: 320 },
    { field: 'createdAt', headerName: 'Ngày tạo', valueGetter: getCreatedAt, width: 180 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/customers/update-customers/' + params.row._id}>
              <IconEdit />
            </Link>
            <DeleteOutline style={{ cursor: 'pointer', color: '#ff6666' }} onClick={() => handleDelete(params.row._id)} />
          </>
        );
      }
    }
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    loadListCustomers();
  }, []);

  const loadListCustomers = async () => {
    const result = await axios.get(`${LIST_CUSTOMERS}`);
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_CUSTOMERS}/` + id)
        .then(() => {
          setOpen(true);
          setData(data.filter((item) => item._id !== id));
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
        title="Danh sách khách hàng"
        secondary={
          <Button variant="contained" component={Link} to="/customers/add-customers">
            Thêm mới
          </Button>
        }
      >
        {data.length !== 0 ? (
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

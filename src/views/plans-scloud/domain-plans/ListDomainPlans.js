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

import config from '../../../config';

const LIST_DOMAIN_PLANS = `${config.API_URL}/plans/domain`;

export default function ListDomainPlans() {
  const [open, setOpen] = useState(false);

  const columns = [
    { field: 'name', headerName: 'Tên miền', width: 300 },
    {
      field: 'importPrice',
      headerName: 'Giá nhập / năm',
      width: 230,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.import_price)
    },
    {
      field: 'price',
      headerName: 'Giá bán / năm',
      width: 230,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.price)
    },
    {
      field: 'supplier',
      headerName: 'Nhà cung cấp',
      width: 300,
      valueGetter: (params) => `${params.row.supplier_id.name}`
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/dashboard/plans/update-domain/' + params.row._id}>
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
    loadListDomainPlans();
  }, []);

  const loadListDomainPlans = async () => {
    const result = await axios.get(`${LIST_DOMAIN_PLANS}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_DOMAIN_PLANS}/` + id, {
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
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
        title="Danh sách"
        secondary={
          <Button variant="contained" component={Link} to="/dashboard/plans/add-domain">
            Thêm mới
          </Button>
        }
      >
        {data.length ? (
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

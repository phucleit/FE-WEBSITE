import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';

const LIST_DOMAIN_PLANS = `${config.API_URL}/plans/domain`;

export default function ListDomainPlans() {
  const columns = [
    { field: 'name', headerName: 'Tên miền', width: 300 },
    {
      field: 'price',
      headerName: 'Giá tên miền',
      width: 180,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.price)
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/plans/update-domain/' + params.row._id}>
              <i className="fas fa-edit"></i>
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
  });

  const loadListDomainPlans = async () => {
    const result = await axios.get(`${LIST_DOMAIN_PLANS}`);
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_DOMAIN_PLANS}/` + id)
        .then(() => {
          setData(data.filter((item) => item._id !== id));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <MainCard
      title="Danh sách"
      secondary={
        <Button variant="contained" href="/plans/add-domain">
          Thêm mới
        </Button>
      }
    >
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        disableRowSelectionOnClick
      />
    </MainCard>
  );
}

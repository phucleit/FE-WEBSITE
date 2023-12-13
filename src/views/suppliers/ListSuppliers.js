import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

import MainCard from 'ui-component/cards/MainCard';
import { IconEdit } from '@tabler/icons';

import config from '../../config';

const LIST_SUPPLIER = `${config.API_URL}/supplier`;

export default function ListSupplier() {
  const columns = [
    { field: 'name', headerName: 'Tên nhà cung cấp', width: 250 },
    { field: 'company', headerName: 'Tên công ty', width: 400 },
    { field: 'phone', headerName: 'Số điện thoại', width: 200 },
    { field: 'address', headerName: 'Địa chỉ', width: 400 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/suppliers/update-suppliers/' + params.row._id}>
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
    loadListSupplier();
  });

  const loadListSupplier = async () => {
    const result = await axios.get(`${LIST_SUPPLIER}`);
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_SUPPLIER}/` + id)
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
        <Button variant="contained" href="/suppliers/add-suppliers">
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

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

const LIST_SUPPLIER = `${config.API_URL}/supplier`;

export default function ListSupplier() {
  const [open, setOpen] = useState(false);

  const columns = [
    { field: 'name', headerName: 'Tên nhà cung cấp', width: 140 },
    { field: 'company', headerName: 'Tên công ty', width: 250 },
    { field: 'tax_code', headerName: 'Mã số thuế', width: 150 },
    { field: 'phone', headerName: 'Số điện thoại', width: 150 },
    { field: 'name_support', headerName: 'Hỗ trợ viên', width: 180 },
    { field: 'phone_support', headerName: 'Hotline hỗ trợ viên', width: 150 },
    { field: 'address', headerName: 'Địa chỉ', width: 380 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 120,
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
  }, []);

  const loadListSupplier = async () => {
    const result = await axios.get(`${LIST_SUPPLIER}`);
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_SUPPLIER}/` + id)
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
          <Button variant="contained" component={Link} to="/suppliers/add-suppliers">
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

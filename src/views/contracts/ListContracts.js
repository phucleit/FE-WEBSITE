import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

import MainCard from 'ui-component/cards/MainCard';
import { IconEdit } from '@tabler/icons';

import config from '../../config';

const LIST_CONTRACTS = `${config.API_URL}/contracts`;

export default function ListContracts() {
  const getCreatedAt = (params) => {
    var timeStamp = params.row.createdAt;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    return date;
  };

  const columns = [
    { field: 'contract_code', headerName: 'Mã hợp đồng', width: 150 },
    {
      field: 'customer',
      headerName: 'Khách hàng',
      width: 280,
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
      field: 'total_price',
      headerName: 'Tổng chi phí',
      width: 160,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.total_price)
    },
    {
      field: 'deposit_amount',
      headerName: 'Thanh toán trước',
      width: 160,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.deposit_amount)
    },
    {
      field: 'remaining_cost',
      headerName: 'Chi phí còn lại',
      width: 160,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.remaining_cost)
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 300,
      renderCell: (params) => {
        if (params.row.status == 1) {
          return (
            <Button variant="contained" size="small">
              Đã thanh toán
            </Button>
          );
        } else if (params.row.status == 2) {
          return (
            <Button variant="contained" size="small" color="error">
              Thanh toán trước {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.deposit_amount)}
            </Button>
          );
        }
      }
    },
    { field: 'createdAt', headerName: 'Ngày tạo', valueGetter: getCreatedAt, width: 150 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/contracts/update-contracts/' + params.row._id}>
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
    loadListContracts();
  }, []);

  const loadListContracts = async () => {
    const result = await axios.get(`${LIST_CONTRACTS}`);
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios
        .delete(`${LIST_CONTRACTS}/` + id)
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
        <Button variant="contained" href="/contracts/add-contracts">
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
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { IconEdit } from '@tabler/icons';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';

const LIST_CONTRACTS = `${config.API_URL}/contracts`;

export default function RemainingContracts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadListContracts();
  }, []);

  const loadListContracts = async () => {
    const result = await axios.get(`${LIST_CONTRACTS}`);
    setData(result.data);
  };

  const getCreatedAt = (params) => {
    var timeStamp = params.row.createdAt;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    return date;
  };

  const filteredContracts = data.filter((contract) => contract.status === 2);

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
      field: 'status',
      headerName: 'Trạng thái',
      width: 300,
      renderCell: (params) => {
        return (
          <Button variant="contained" size="small" color="error">
            Thanh toán trước {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.deposit_amount)}
          </Button>
        );
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
          </>
        );
      }
    }
  ];

  return (
    <MainCard title="Danh sách hợp đồng chưa thanh toán đủ" sx={{ mt: 2 }}>
      {filteredContracts.length !== 0 ? (
        <DataGrid
          rows={filteredContracts}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableRowSelectionOnClick
        />
      ) : (
        ''
      )}
    </MainCard>
  );
}

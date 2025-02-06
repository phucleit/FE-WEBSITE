import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { IconEdit } from '@tabler/icons';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../../config';
import { getCreatedAt, apiGet } from '../../../utils/formatUtils';

const LIST_CONTRACTS = `${config.API_URL}/contracts`;

export default function RemainingContracts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadListContracts();
  }, []);

  const loadListContracts = async () => {
    const result = await apiGet(`${LIST_CONTRACTS}`);
    setData(result.data);
  };

  const filteredContracts = data.filter((contract) => contract.status === 2);

  const columns = [
    { field: 'contract_code', headerName: 'Mã hợp đồng', width: 150 },
    {
      field: 'customer',
      headerName: 'Khách hàng',
      width: 280,
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
      width: 300,
      renderCell: (params) => {
        return (
          <Button variant="contained" size="small" color="error">
            Thanh toán trước {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.deposit_amount)}
          </Button>
        );
      }
    },
    { field: 'createdAt', headerName: 'Ngày tạo', valueGetter: (params) => getCreatedAt(params.row.createdAt), width: 150 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/hop-dong/cap-nhat-hop-dong/' + params.row._id}>
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

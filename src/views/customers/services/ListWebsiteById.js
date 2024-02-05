import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import config from '../../../config';
import { getCreatedAt } from '../../../utils/formatUtils';

const CUSTOMER_DETAIL = `${config.API_URL}/customer`;

export default function ListWebsiteById() {
  const paramId = useParams();
  const currentId = paramId.id;

  const [websiteServices, setWebsiteServices] = useState([]);

  useEffect(() => {
    loadListWebsiteById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListWebsiteById = async () => {
    const result = await axios.get(`${CUSTOMER_DETAIL}/website-service/${currentId}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setWebsiteServices(result.data[0].website_services);
  };

  const columnsWebsiteServices = [
    {
      field: 'name',
      headerName: 'Tên miền',
      width: 300,
      renderCell: (params) => {
        const domainServiceName = params.row.domain_service[0]?.name || '';
        const domainSupplierName = params.row.domain_supplier[0]?.name || '';
        return (
          <span>
            {domainServiceName}
            <br />
            {domainSupplierName ? `NCC: ${domainSupplierName}` : ''}
          </span>
        );
      }
    },
    {
      field: 'price',
      headerName: 'Giá dịch vụ',
      width: 250,
      valueGetter: (params) =>
        params.row.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.price) : ''
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 280,
      renderCell: (params) => {
        if (params.row.status == 1) {
          return (
            <Button variant="contained" size="small">
              Đang sử dụng
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
    { field: 'createdAt', headerName: 'Ngày đăng ký', valueGetter: (params) => getCreatedAt(params.row.createdAt), width: 250 }
  ];

  return (
    <>
      {websiteServices && websiteServices.length !== 0 ? (
        <DataGrid
          rows={websiteServices}
          columns={columnsWebsiteServices}
          getRowId={(row) => (row._id ? row._id : '')}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          disableRowSelectionOnClick
        />
      ) : (
        ''
      )}
    </>
  );
}

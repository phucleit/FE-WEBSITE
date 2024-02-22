import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import config from '../../../config';
import { getRegisteredAt, getExpiredAt } from '../../../utils/formatUtils';

const CUSTOMER_DETAIL = `${config.API_URL}/customer`;

export default function ListDomainById() {
  const paramId = useParams();
  const currentId = paramId.id;

  const [domainServices, setDomainServices] = useState([]);

  useEffect(() => {
    loadListDomainById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListDomainById = async () => {
    const result = await axios.get(`${CUSTOMER_DETAIL}/domain-service/${currentId}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDomainServices(result.data[0].domain_services);
  };

  const columnsDomainServices = [
    {
      field: 'name',
      headerName: 'Dịch vụ Domain',
      width: 250,
      valueGetter: (params) =>
        params.row.name && params.row.domain_plan && params.row.domain_plan[0] && params.row.domain_plan[0].name ? `${params.row.name}` : ''
    },
    {
      field: 'supplier',
      headerName: 'Nhà cung cấp',
      width: 170,
      valueGetter: (params) =>
        params.row.supplier && params.row.supplier[0] && params.row.supplier[0].name ? params.row.supplier[0].name : ''
    },
    {
      field: 'price',
      headerName: 'Giá dịch vụ / năm',
      width: 220,
      valueGetter: (params) =>
        params.row.domain_plan && params.row.domain_plan[0] && params.row.domain_plan[0].price
          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.domain_plan[0].price)
          : ''
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 220,
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
    { field: 'registeredAt', headerName: 'Ngày đăng ký', valueGetter: (params) => getRegisteredAt(params.row.registeredAt), width: 200 },
    { field: 'expiredAt', headerName: 'Ngày hết hạn', valueGetter: (params) => getExpiredAt(params.row.expiredAt), width: 200 }
  ];

  return (
    <>
      {domainServices && domainServices.length !== 0 ? (
        <DataGrid
          rows={domainServices}
          columns={columnsDomainServices}
          getRowId={(row) => (row._id ? row._id : '')}
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
    </>
  );
}

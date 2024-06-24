import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import config from '../../../config';
import { getRegisteredAt, getExpiredAt } from '../../../utils/formatUtils';

const CUSTOMER_DETAIL = `${config.API_URL}/customer`;
const token = localStorage.getItem('token');

export default function ListHostingById(props) {
  const currentId = props.customer_id;

  const [hostingServices, setHostingServices] = useState([]);

  useEffect(() => {
    loadListHostingById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListHostingById = async () => {
    const result = await axios.get(`${CUSTOMER_DETAIL}/hosting-service/${currentId}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        token: token
      }
    });
    setHostingServices(result.data[0].hosting_services);
  };

  const columnsHostingServices = [
    {
      field: 'name',
      headerName: 'Tên miền',
      width: 250,
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
      field: 'hosting',
      headerName: 'Dịch vụ Hosting',
      width: 200,
      valueGetter: (params) => params.row.hosting_plan[0]?.name || ''
    },
    {
      field: 'supplier',
      headerName: 'Nhà cung cấp',
      width: 140,
      valueGetter: (params) => params.row.hosting_supplier[0]?.name || ''
    },
    {
      field: 'price',
      headerName: 'Giá dịch vụ / tháng',
      width: 180,
      valueGetter: (params) =>
        params.row.hosting_plan && params.row.hosting_plan[0] && params.row.hosting_plan[0].price
          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.hosting_plan[0].price)
          : ''
    },
    {
      field: 'periods',
      headerName: 'Thời gian',
      width: 100,
      valueGetter: (params) => (params.row.periods ? `${params.row.periods} năm` : '')
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
      {hostingServices && hostingServices.length !== 0 ? (
        <DataGrid
          rows={hostingServices}
          columns={columnsHostingServices}
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

ListHostingById.propTypes = {
  customer_id: PropTypes.string.isRequired
};

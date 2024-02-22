import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import config from '../../../config';
import { getRegisteredAt, getExpiredAt } from '../../../utils/formatUtils';

const CUSTOMER_DETAIL = `${config.API_URL}/customer`;

export default function ListMaintenanceById() {
  const paramId = useParams();
  const currentId = paramId.id;

  const [maintenanceServices, setMaintenanceServices] = useState([]);

  useEffect(() => {
    loadListMaintenanceById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListMaintenanceById = async () => {
    const result = await axios.get(`${CUSTOMER_DETAIL}/maintenance-service/${currentId}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setMaintenanceServices(result.data[0].maintenance_services);
  };

  const columnsMaintenanceServices = [
    {
      field: 'service_type',
      headerName: 'Loại dịch vụ',
      width: 200,
      renderCell: (params) => {
        if (params.row.service_type == 13) {
          return <span>Tên miền</span>;
        } else if (params.row.service_type == 14) {
          return <span>Hosting</span>;
        } else if (params.row.service_type == 15) {
          return <span>Email</span>;
        } else if (params.row.service_type == 16) {
          return <span>SSL</span>;
        } else if (params.row.service_type == 17) {
          return <span>Thiết kế website</span>;
        } else if (params.row.service_type == 18) {
          return <span>Viết bài Content & PR</span>;
        } else if (params.row.service_type == 19) {
          return <span>Toplist Vũng Tàu</span>;
        }
      }
    },
    {
      field: 'name',
      headerName: 'Tên miền',
      width: 250,
      renderCell: (params) => {
        return (
          <span>
            {params.row.domain_service[0].name}
            <br />
            Domain {params.row.domain_plan[0].name} / NCC {params.row.domain_supplier[0].name}
          </span>
        );
      }
    },
    {
      field: 'price',
      headerName: 'Giá dịch vụ',
      width: 170,
      renderCell: (params) => {
        return (
          <span>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              params.row.maintenance_plan[0].price * params.row.periods
            )}
            / {params.row.periods} tháng
          </span>
        );
      }
    },
    {
      field: 'periods',
      headerName: 'Thời gian',
      width: 100,
      valueGetter: (params) => `${params.row.periods} tháng`
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 200,
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
      {maintenanceServices && maintenanceServices.length !== 0 ? (
        <DataGrid
          rows={maintenanceServices}
          columns={columnsMaintenanceServices}
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

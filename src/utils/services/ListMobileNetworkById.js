import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import config from '../../config';
import { getRegisteredAt, getExpiredAt, apiGetById } from '../formatUtils';

const LIST_MOBILE_NETWORK_SERVICES = `${config.API_URL}/services/mobile-network`;

export default function ListMobileNetworkById() {
  const paramId = useParams();
  const currentId = paramId.id;

  const [mobileNetworkServices, setMobileNetworkServices] = useState([]);

  useEffect(() => {
    loadListContentById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListContentById = async () => {
    const result = await apiGetById(`${LIST_MOBILE_NETWORK_SERVICES}/customer`, currentId);
    setMobileNetworkServices(result.data);
  };

  const columnsMobileNetworkServices = [
    {
      field: 'name',
      headerName: 'Tên gói',
      width: 250,
      renderCell: (params) => {
        return (
          <span>
            {params.row.mobile_network_plan_id.name}
            <br />
            (NMDD: {params.row.supplier_mobile_network_id.name})
          </span>
        );
      }
    },
    {
      field: 'price',
      headerName: 'Giá gói',
      width: 200,
      valueGetter: (params) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.mobile_network_plan_id.price)
    },
    {
      field: 'periods',
      headerName: 'Thời gian',
      width: 130,
      valueGetter: (params) => `${params.row.periods} năm`
    },
    {
      field: 'totalPrice',
      headerName: 'Thành tiền',
      width: 200,
      renderCell: (params) => {
        return (
          <span>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              params.row.mobile_network_plan_id.price * params.row.periods
            )}
          </span>
        );
      }
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
      {mobileNetworkServices && mobileNetworkServices.length !== 0 ? (
        <DataGrid
          rows={mobileNetworkServices}
          columns={columnsMobileNetworkServices}
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

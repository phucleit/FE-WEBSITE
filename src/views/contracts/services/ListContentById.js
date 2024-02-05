import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import config from '../../../config';
import { getRegisteredAt, getExpiredAt } from '../../../utils/formatUtils';

const CUSTOMER_DETAIL = `${config.API_URL}/customer`;

export default function ListContentById(props) {
  const currentId = props.customer_id;

  const [contentServices, setContentServices] = useState([]);

  useEffect(() => {
    loadListContentById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListContentById = async () => {
    const result = await axios.get(`${CUSTOMER_DETAIL}/content-service/${currentId}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setContentServices(result.data[0].content_services);
  };

  const columnsContentServices = [
    {
      field: 'content',
      headerName: 'Dịch vụ Content',
      width: 300,
      valueGetter: (params) =>
        params.row.content_plan && params.row.content_plan[0] && params.row.content_plan[0].name ? params.row.content_plan[0].name : ''
    },
    {
      field: 'price',
      headerName: 'Giá dịch vụ / tháng',
      width: 250,
      valueGetter: (params) =>
        params.row.content_plan && params.row.content_plan[0] && params.row.content_plan[0].price
          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.content_plan[0].price)
          : ''
    },
    {
      field: 'periods',
      headerName: 'Thời gian',
      width: 150,
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
      {contentServices && contentServices.length !== 0 ? (
        <DataGrid
          rows={contentServices}
          columns={columnsContentServices}
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

ListContentById.propTypes = {
  customer_id: PropTypes.string.isRequired
};

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { getRegisteredAt, getExpiredAt, apiGetById } from '../formatUtils';

const LIST_TOPLIST_SERVICES = `${process.env.REACT_APP_API_URL}/services/toplist`;

export default function ListToplistById(props) {
  const paramId = useParams();
  const currentId = paramId.id;
  const customer_id = props.customer_id;

  const [toplistServices, setToplistServices] = useState([]);

  useEffect(() => {
    loadListToplistById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, customer_id]);

  const loadListToplistById = async () => {
    const id = customer_id ? customer_id : currentId;
    const result = await apiGetById(`${LIST_TOPLIST_SERVICES}/customer`, id);
    setToplistServices(result.data);
  };

  const columnsToplistServices = [
    {
      field: 'post',
      headerName: 'Tiêu đề bài viết',
      width: 300,
      valueGetter: (params) => `${params.row.post}`
    },
    {
      field: 'price',
      headerName: 'Giá dịch vụ / năm',
      width: 170,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.price)
    },
    {
      field: 'rental_location',
      headerName: 'Vị trí hiển thị',
      width: 200,
      valueGetter: (params) => `${params.row.rental_location}`
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 250,
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
      {toplistServices && toplistServices.length !== 0 ? (
        <DataGrid
          rows={toplistServices}
          columns={columnsToplistServices}
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

ListToplistById.propTypes = {
  customer_id: PropTypes.string
};

ListToplistById.defaultProps = {
  customer_id: null
};

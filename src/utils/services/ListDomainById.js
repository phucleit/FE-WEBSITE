import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import config from '../../config';
import { getRegisteredAt, getExpiredAt, apiGetById } from '../formatUtils';

const LIST_DOMAIN_SERVICES = `${config.API_URL}/services/domain`;

export default function ListDomainById(props) {
  const paramId = useParams();
  const currentId = paramId.id;
  const customer_id = props.customer_id;

  const [domainServices, setDomainServices] = useState([]);

  useEffect(() => {
    loadListDomainById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, customer_id]);

  const loadListDomainById = async () => {
    const id = customer_id ? customer_id : currentId;
    const result = await apiGetById(`${LIST_DOMAIN_SERVICES}/customer`, id);
    setDomainServices(result.data);
  };

  const columnsDomainServices = [
    {
      field: 'name',
      headerName: 'Dịch vụ tên miền',
      width: 250,
      valueGetter: (params) => (params.row.name ? `${params.row.name}` : '')
    },
    {
      field: 'supplier',
      headerName: 'Nhà cung cấp',
      width: 170,
      valueGetter: (params) => (params.row.supplier_id ? params.row.supplier_id.name : '')
    },
    {
      field: 'price',
      headerName: 'Giá dịch vụ / năm',
      width: 220,
      valueGetter: (params) =>
        params.row.domain_plan_id
          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.domain_plan_id.price)
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

ListDomainById.propTypes = {
  customer_id: PropTypes.string
};

ListDomainById.defaultProps = {
  customer_id: null
};

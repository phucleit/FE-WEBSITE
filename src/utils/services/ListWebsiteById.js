import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import config from '../../config';
import { getCreatedAt, apiGetById } from '../formatUtils';

const LIST_WEBSITE_SERVICES = `${config.API_URL}/services/website`;

export default function ListWebsiteById(props) {
  const paramId = useParams();
  const currentId = paramId.id;
  const customer_id = props.customer_id;

  const [websiteServices, setWebsiteServices] = useState([]);

  useEffect(() => {
    loadListWebsiteById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, customer_id]);

  const loadListWebsiteById = async () => {
    const id = customer_id ? customer_id : currentId;
    const result = await apiGetById(`${LIST_WEBSITE_SERVICES}/customer`, id);
    setWebsiteServices(result.data);
  };

  const columnsWebsiteServices = [
    {
      field: 'name',
      headerName: 'Tên miền',
      width: 300,
      renderCell: (params) => {
        const domainServiceName = params.row.domain_service_id?.name || '';
        const domainSupplierName = params.row.domain_supplier_id?.name || '';
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

ListWebsiteById.propTypes = {
  customer_id: PropTypes.string
};

ListWebsiteById.defaultProps = {
  customer_id: null
};

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { getRegisteredAt, getExpiredAt, apiGetById } from '../formatUtils';

const LIST_MAINTENANCE_SERVICES = `${process.env.REACT_APP_API_URL}/services/maintenance`;

export default function ListMaintenanceById(props) {
  const paramId = useParams();
  const currentId = paramId.id;
  const customer_id = props.customer_id;

  const [maintenanceServices, setMaintenanceServices] = useState([]);

  useEffect(() => {
    loadListMaintenanceById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, customer_id]);

  const loadListMaintenanceById = async () => {
    const id = customer_id ? customer_id : currentId;
    const result = await apiGetById(`${LIST_MAINTENANCE_SERVICES}/customer`, id);
    setMaintenanceServices(result.data);
  };

  const columnsMaintenanceServices = [
    {
      field: 'name_maintenance',
      headerName: 'Tên dịch vụ bảo trì',
      width: 250,
      valueGetter: (params) => (params.row.maintenance_plan_id ? `${params.row.maintenance_plan_id.name}` : '')
    },
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
            {params.row.domain_service_id.name}
            <br />
            Domain {params.row.domain_plan_id.name} / NCC {params.row.domain_supplier_id.name}
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
              params.row.maintenance_plan_id.price * params.row.periods
            )}
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

ListMaintenanceById.propTypes = {
  customer_id: PropTypes.string
};

ListMaintenanceById.defaultProps = {
  customer_id: null
};

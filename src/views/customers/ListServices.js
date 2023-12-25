import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';

const CUSTOMER_DETAIL = `${config.API_URL}/customer`;

export default function ListServices() {
  const paramId = useParams();
  const currentId = paramId.id;

  const getCreatedAt = (params) => {
    var timeStamp = params;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
    return date + ' ' + time;
  };

  const getExpiredAt = (params) => {
    var timeStamp = params;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
    return date + ' ' + time;
  };

  const [domainServices, setDomainServices] = useState([]);
  const [hostingServices, setHostingServices] = useState([]);
  const [emailServices, setEmailServices] = useState([]);
  const [sslServices, setSslServices] = useState([]);
  const [websiteServices, setWebsiteServices] = useState([]);
  const [contentServices, setContentServices] = useState([]);

  useEffect(() => {
    loadListServicesSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListServicesSuppliers = async () => {
    const result = await axios.get(`${CUSTOMER_DETAIL}/${currentId}`);
    setDomainServices(result.data[0].domain_services);
    setHostingServices(result.data[0].hosting_services);
    setEmailServices(result.data[0].email_services);
    setSslServices(result.data[0].ssl_services);
    setWebsiteServices(result.data[0].website_services);
    setContentServices(result.data[0].content_services);
  };

  const [valueTab, setValueTab] = useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const columnsDomainServices = [
    {
      field: 'name',
      headerName: 'Dịch vụ Domain',
      width: 250,
      valueGetter: (params) =>
        params.row.name && params.row.domain_plan && params.row.domain_plan[0] && params.row.domain_plan[0].name
          ? `${params.row.name}${params.row.domain_plan[0].name}`
          : ''
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
    {
      field: 'createdAt',
      headerName: 'Ngày khỏi tạo',
      width: 200,
      valueGetter: (params) => (params.row.createdAt ? getCreatedAt(params.row.createdAt) : '')
    },
    {
      field: 'expiredAt',
      headerName: 'Ngày hết hạn',
      width: 200,
      valueGetter: (params) => (params.row.expiredAt ? getExpiredAt(params.row.expiredAt) : '')
    }
  ];

  const columnsHostingServices = [
    {
      field: 'name',
      headerName: 'Tên miền',
      width: 250,
      renderCell: (params) => {
        const domainServiceName = params.row.domain_service[0]?.name || '';
        const domainPlanName = params.row.domain_plan[0]?.name || '';
        const domainSupplierName = params.row.domain_supplier[0]?.name || '';
        return (
          <span>
            {domainServiceName}
            {domainPlanName}
            <br />
            {domainSupplierName ? `NCC: ${domainSupplierName}` : ''}
          </span>
        );
      }
    },
    {
      field: 'hosting',
      headerName: 'Dịch vụ Hosting',
      width: 220,
      valueGetter: (params) => params.row.hosting_plan[0]?.name || ''
    },
    {
      field: 'supplier',
      headerName: 'Nhà cung cấp',
      width: 150,
      valueGetter: (params) => params.row.hosting_supplier[0]?.name || ''
    },
    {
      field: 'price',
      headerName: 'Giá dịch vụ / tháng',
      width: 220,
      valueGetter: (params) =>
        params.row.hosting_plan && params.row.hosting_plan[0] && params.row.hosting_plan[0].price
          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.hosting_plan[0].price)
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
    {
      field: 'createdAt',
      headerName: 'Ngày khỏi tạo',
      width: 200,
      valueGetter: (params) => (params.row.createdAt ? getCreatedAt(params.row.createdAt) : '')
    },
    {
      field: 'expiredAt',
      headerName: 'Ngày hết hạn',
      width: 200,
      valueGetter: (params) => (params.row.expiredAt ? getExpiredAt(params.row.expiredAt) : '')
    }
  ];

  const columnsEmailServices = [
    {
      field: 'name',
      headerName: 'Tên miền',
      width: 250,
      renderCell: (params) => {
        const domainServiceName = params.row.domain_service[0]?.name || '';
        const domainPlanName = params.row.domain_plan[0]?.name || '';
        const domainSupplierName = params.row.domain_supplier[0]?.name || '';
        return (
          <span>
            {domainServiceName}
            {domainPlanName}
            <br />
            {domainSupplierName ? `NCC: ${domainSupplierName}` : ''}
          </span>
        );
      }
    },
    {
      field: 'email',
      headerName: 'Dịch vụ Email',
      width: 220,
      valueGetter: (params) => params.row.email_plan[0]?.name || ''
    },
    {
      field: 'supplier',
      headerName: 'Nhà cung cấp',
      width: 150,
      valueGetter: (params) => params.row.email_supplier[0]?.name || ''
    },
    {
      field: 'price',
      headerName: 'Giá dịch vụ / tháng',
      width: 220,
      valueGetter: (params) =>
        params.row.email_plan && params.row.email_plan[0] && params.row.email_plan[0].price
          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.email_plan[0].price)
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
    {
      field: 'createdAt',
      headerName: 'Ngày khỏi tạo',
      width: 200,
      valueGetter: (params) => (params.row.createdAt ? getCreatedAt(params.row.createdAt) : '')
    },
    {
      field: 'expiredAt',
      headerName: 'Ngày hết hạn',
      width: 200,
      valueGetter: (params) => (params.row.expiredAt ? getExpiredAt(params.row.expiredAt) : '')
    }
  ];

  const columnsSslServices = [
    {
      field: 'name',
      headerName: 'Tên miền',
      width: 250,
      renderCell: (params) => {
        const domainServiceName = params.row.domain_service[0]?.name || '';
        const domainPlanName = params.row.domain_plan[0]?.name || '';
        const domainSupplierName = params.row.domain_supplier[0]?.name || '';
        return (
          <span>
            {domainServiceName}
            {domainPlanName}
            <br />
            {domainSupplierName ? `NCC: ${domainSupplierName}` : ''}
          </span>
        );
      }
    },
    {
      field: 'ssl',
      headerName: 'Dịch vụ SSL',
      width: 220,
      valueGetter: (params) => params.row.ssl_plan[0]?.name || ''
    },
    {
      field: 'supplier',
      headerName: 'Nhà cung cấp',
      width: 150,
      valueGetter: (params) => params.row.ssl_supplier[0]?.name || ''
    },
    {
      field: 'price',
      headerName: 'Giá dịch vụ / tháng',
      width: 220,
      valueGetter: (params) =>
        params.row.ssl_plan && params.row.ssl_plan[0] && params.row.ssl_plan[0].price
          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.ssl_plan[0].price)
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
    {
      field: 'createdAt',
      headerName: 'Ngày khỏi tạo',
      width: 200,
      valueGetter: (params) => (params.row.createdAt ? getCreatedAt(params.row.createdAt) : '')
    },
    {
      field: 'expiredAt',
      headerName: 'Ngày hết hạn',
      width: 200,
      valueGetter: (params) => (params.row.expiredAt ? getExpiredAt(params.row.expiredAt) : '')
    }
  ];

  const columnsWebsiteServices = [
    {
      field: 'name',
      headerName: 'Tên miền',
      width: 300,
      renderCell: (params) => {
        const domainServiceName = params.row.domain_service[0]?.name || '';
        const domainPlanName = params.row.domain_plan[0]?.name || '';
        const domainSupplierName = params.row.domain_supplier[0]?.name || '';
        return (
          <span>
            {domainServiceName}
            {domainPlanName}
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
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.price)
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
    {
      field: 'createdAt',
      headerName: 'Ngày khỏi tạo',
      width: 250,
      valueGetter: (params) => (params.row.createdAt ? getCreatedAt(params.row.createdAt) : '')
    }
  ];

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
    {
      field: 'createdAt',
      headerName: 'Ngày khỏi tạo',
      width: 200,
      valueGetter: (params) => (params.row.createdAt ? getCreatedAt(params.row.createdAt) : '')
    },
    {
      field: 'expiredAt',
      headerName: 'Ngày hết hạn',
      width: 200,
      valueGetter: (params) => (params.row.expiredAt ? getExpiredAt(params.row.expiredAt) : '')
    }
  ];

  return (
    <>
      <MainCard title="Danh sách dịch vụ" sx={{ marginTop: '15px' }}>
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <TabContext value={valueTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeTab}>
                <Tab label="Dịch vụ tên miền" value="1" />
                <Tab label="Dịch vụ Hosting" value="2" />
                <Tab label="Dịch vụ Email" value="3" />
                <Tab label="Dịch vụ SSL" value="4" />
                <Tab label="Dịch vụ Thiết kế Website" value="5" />
                <Tab label="Dịch vụ Content" value="6" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {domainServices.length !== 0 ? (
                <DataGrid
                  rows={domainServices}
                  columns={columnsDomainServices}
                  getRowId={(row) => (row._id ? row._id : '')}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  disableRowSelectionOnClick
                />
              ) : (
                ''
              )}
            </TabPanel>
            <TabPanel value="2">
              {hostingServices.length !== 0 ? (
                <DataGrid
                  rows={hostingServices}
                  columns={columnsHostingServices}
                  getRowId={(row) => (row._id ? row._id : '')}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  disableRowSelectionOnClick
                />
              ) : (
                ''
              )}
            </TabPanel>
            <TabPanel value="3">
              {emailServices.length !== 0 ? (
                <DataGrid
                  rows={emailServices}
                  columns={columnsEmailServices}
                  getRowId={(row) => (row._id ? row._id : '')}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  disableRowSelectionOnClick
                />
              ) : (
                ''
              )}
            </TabPanel>
            <TabPanel value="4">
              {sslServices.length !== 0 ? (
                <DataGrid
                  rows={sslServices}
                  columns={columnsSslServices}
                  getRowId={(row) => (row._id ? row._id : '')}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  disableRowSelectionOnClick
                />
              ) : (
                ''
              )}
            </TabPanel>
            <TabPanel value="5">
              {websiteServices.length !== 0 ? (
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
            </TabPanel>
            <TabPanel value="6">
              {contentServices.length !== 0 ? (
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
            </TabPanel>
          </TabContext>
        </Box>
      </MainCard>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DataGrid } from '@mui/x-data-grid';
import { IconEdit } from '@tabler/icons';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';

const LIST_SUPPLIER = `${config.API_URL}/supplier`;

export default function ListSupplierPlans() {
  const paramId = useParams();
  const currentId = paramId.id;

  const [domainPlans, setDomainPlans] = useState([]);
  const [emailPlans, setEmailPlans] = useState([]);
  const [hostingPlans, setHostingPlans] = useState([]);
  const [sslPlans, setSslPlans] = useState([]);

  useEffect(() => {
    loadListPlanSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListPlanSuppliers = async () => {
    const result = await axios.get(`${LIST_SUPPLIER}/${currentId}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setDomainPlans(result.data[0].domainPlans);
    setEmailPlans(result.data[0].emailPlans);
    setHostingPlans(result.data[0].hostingPlans);
    setSslPlans(result.data[0].sslPlans);
  };

  const [valueTab, setValueTab] = useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const columnsDomain = [
    { field: 'name', headerName: 'Tên miền', width: 300 },
    {
      field: 'importPrice',
      headerName: 'Giá nhập / năm',
      width: 250,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.import_price)
    },
    {
      field: 'price',
      headerName: 'Giá bán / năm',
      width: 250,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.price)
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/dashboard/plans/update-domain/' + params.row._id}>
              <IconEdit />
            </Link>
          </>
        );
      }
    }
  ];

  const columnsEmail = [
    { field: 'name', headerName: 'Tên gói email', width: 300 },
    {
      field: 'importPrice',
      headerName: 'Giá nhập / tháng',
      width: 250,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.import_price)
    },
    {
      field: 'price',
      headerName: 'Giá bán / tháng',
      width: 250,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.price)
    },
    {
      field: 'account',
      headerName: 'Địa chỉ email',
      width: 180,
      valueGetter: (params) => `${params.row.account} tài khoản`
    },
    {
      field: 'capacity',
      headerName: 'Dung lượng',
      width: 180,
      valueGetter: (params) => `${params.row.capacity} GB`
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/dashboard/plans/update-email/' + params.row._id}>
              <IconEdit />
            </Link>
          </>
        );
      }
    }
  ];

  const columnsHosting = [
    { field: 'name', headerName: 'Tên gói hosting', width: 300 },
    {
      field: 'importPrice',
      headerName: 'Giá nhập / tháng',
      width: 250,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.import_price)
    },
    {
      field: 'price',
      headerName: 'Giá bán / tháng',
      width: 250,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.price)
    },
    {
      field: 'account',
      headerName: 'Số lượng website',
      width: 180,
      valueGetter: (params) => `${params.row.account} website`
    },
    {
      field: 'capacity',
      headerName: 'Dung lượng',
      width: 180,
      valueGetter: (params) => `${params.row.capacity} GB`
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/dashboard/plans/update-hosting/' + params.row._id}>
              <IconEdit />
            </Link>
          </>
        );
      }
    }
  ];

  const columnsSsl = [
    { field: 'name', headerName: 'Tên gói ssl', width: 300 },
    {
      field: 'importPrice',
      headerName: 'Giá nhập / năm',
      width: 250,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.import_price)
    },
    {
      field: 'price',
      headerName: 'Giá bán / năm',
      width: 250,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.price)
    },
    { field: 'feature', headerName: 'Tính năng', width: 500 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/dashboard/plans/update-ssl/' + params.row._id}>
              <IconEdit />
            </Link>
          </>
        );
      }
    }
  ];

  return (
    <>
      <MainCard title="Danh sách gói dịch vụ" sx={{ marginTop: '15px' }}>
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <TabContext value={valueTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeTab}>
                <Tab label="Gói tên miền" value="1" />
                <Tab label="Gói Email" value="2" />
                <Tab label="Gói Hosting" value="3" />
                <Tab label="Gói SSL" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {domainPlans.length !== 0 ? (
                <DataGrid
                  rows={domainPlans}
                  columns={columnsDomain}
                  getRowId={(row) => row._id}
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
              {emailPlans.length !== 0 ? (
                <DataGrid
                  rows={emailPlans}
                  columns={columnsEmail}
                  getRowId={(row) => row._id}
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
              {hostingPlans.length !== 0 ? (
                <DataGrid
                  rows={hostingPlans}
                  columns={columnsHosting}
                  getRowId={(row) => row._id}
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
              {sslPlans.length !== 0 ? (
                <DataGrid
                  rows={sslPlans}
                  columns={columnsSsl}
                  getRowId={(row) => row._id}
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

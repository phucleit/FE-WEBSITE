// import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DataGrid } from '@mui/x-data-grid';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';

const LIST_CUSTOMERS = `${config.API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddContracts() {
  // let navigate = useNavigate();

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

  const [contract_code, setContractCode] = useState('');
  const [customer_id, setCustomerId] = useState('');

  const [listCustomers, setListCustomers] = useState([]);

  const [domainServices, setDomainServices] = useState([]);
  const [hostingServices, setHostingServices] = useState([]);
  const [emailServices, setEmailServices] = useState([]);
  const [sslServices, setSslServices] = useState([]);
  const [contentServices, setContentServices] = useState([]);

  // const [open, setOpen] = useState(false);
  const [valueTab, setValueTab] = useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    loadListCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListCustomers = async () => {
    const result = await axios.get(`${LIST_CUSTOMERS}`);
    setListCustomers(result.data);
  };

  const handChangeCustomer = async (e) => {
    setCustomerId(e.target.value);
    try {
      const result = await axios.get(`${LIST_CUSTOMERS}/${e.target.value}`);
      setDomainServices(result.data[0].domain_services);
      setHostingServices(result.data[0].hosting_services);
      setEmailServices(result.data[0].email_services);
      setSslServices(result.data[0].ssl_services);
      setContentServices(result.data[0].content_services);
    } catch (error) {
      console.error('Error fetching customer data: ', error);
    }
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
      headerName: 'Giá dịch vụ / tháng',
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

  const handleAddContracts = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <MainCard title="Thêm mới">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Mã hợp đồng</InputLabel>
                  <Input
                    id="contract_code"
                    name="contract_code"
                    value={contract_code}
                    onChange={(e) => setContractCode(e.target.value)}
                    required={true}
                    placeholder="Nhập mã hợp đồng..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Khách hàng</InputLabel>
                  <Select id="customer_id" value={customer_id} label="Chọn khách hàng..." onChange={handChangeCustomer}>
                    {listCustomers.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.fullname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleAddContracts}>
                Thêm mới
              </Button>
            </Item>
          </Grid>
        </Box>
      </MainCard>
      {customer_id ? (
        <MainCard title="Chi phí thanh toán" sx={{ marginTop: '15px' }}>
          asd
        </MainCard>
      ) : (
        ''
      )}
      {customer_id ? (
        <MainCard title="Danh sách dịch vụ" sx={{ marginTop: '15px' }}>
          <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
            <TabContext value={valueTab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChangeTab}>
                  <Tab label="Dịch vụ tên miền" value="1" />
                  <Tab label="Dịch vụ Hosting" value="2" />
                  <Tab label="Dịch vụ Email" value="3" />
                  <Tab label="Dịch vụ SSL" value="4" />
                  <Tab label="Dịch vụ Content" value="5" />
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
      ) : (
        ''
      )}
      <Snackbar open="" anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Thêm thành công!</Alert>
      </Snackbar>
    </>
  );
}

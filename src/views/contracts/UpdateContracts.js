import { useNavigate, useParams } from 'react-router-dom';
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
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';

const LIST_CUSTOMERS = `${config.API_URL}/customer`;
const LIST_CONTRACT = `${config.API_URL}/contracts`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddContracts() {
  let navigate = useNavigate();
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

  const [contract_code, setContractCode] = useState('');
  const [customer_id, setCustomerId] = useState('');
  const [deposit_amount, setDepositAmount] = useState(0);
  const [remaining_cost, setRemainingCost] = useState(0);
  const [status, setStatus] = useState();

  const [listCustomers, setListCustomers] = useState([]);
  const [customer_detail, setCustomerDetail] = useState([]);

  const [domainServices, setDomainServices] = useState([]);
  const [hostingServices, setHostingServices] = useState([]);
  const [emailServices, setEmailServices] = useState([]);
  const [sslServices, setSslServices] = useState([]);
  const [contentServices, setContentServices] = useState([]);

  const [open, setOpen] = useState(false);
  const [valueTab, setValueTab] = useState('1');

  let total_price = 0;

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    loadDetailContract();
    loadListCustomers();
    const calculatedRemainingCost = total_price - deposit_amount;
    setRemainingCost(calculatedRemainingCost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total_price, deposit_amount]);

  const loadDetailContract = async () => {
    const result = await axios.get(`${LIST_CONTRACT}/${currentId}`);
    setContractCode(result.data.contract_code);
    setCustomerId(result.data.customer_id._id);
    setDepositAmount(result.data.deposit_amount);
    setRemainingCost(result.data.remaining_cost);
    setStatus(result.data.status);

    const result_service = await axios.get(`${LIST_CUSTOMERS}/${result.data.customer_id._id}`);
    setDomainServices(result_service.data[0].domain_services);
    setHostingServices(result_service.data[0].hosting_services);
    setEmailServices(result_service.data[0].email_services);
    setSslServices(result_service.data[0].ssl_services);
    setContentServices(result_service.data[0].content_services);
  };

  const loadListCustomers = async () => {
    const result = await axios.get(`${LIST_CUSTOMERS}`);
    setListCustomers(result.data);
  };

  const handChangeCustomer = async (e) => {
    setCustomerId(e.target.value);
    try {
      const result = await axios.get(`${LIST_CUSTOMERS}/${e.target.value}`);
      setCustomerDetail(result.data);
      setDomainServices(result.data[0].domain_services);
      setHostingServices(result.data[0].hosting_services);
      setEmailServices(result.data[0].email_services);
      setSslServices(result.data[0].ssl_services);
      setContentServices(result.data[0].content_services);
    } catch (error) {
      console.error('Error fetching customer data: ', error);
    }
  };

  if (customer_detail) {
    domainServices.forEach((item) => {
      if (item.domain_plan && item.domain_plan[0] && item.domain_plan[0].price) {
        total_price += item.domain_plan[0].price;
      }
    });

    hostingServices.forEach((item) => {
      if (item.hosting_plan && item.hosting_plan[0] && item.hosting_plan[0].price) {
        total_price += item.hosting_plan[0].price;
      }
    });

    emailServices.forEach((item) => {
      if (item.email_plan && item.email_plan[0] && item.email_plan[0].price) {
        total_price += item.email_plan[0].price;
      }
    });

    sslServices.forEach((item) => {
      if (item.ssl_plan && item.ssl_plan[0] && item.ssl_plan[0].price) {
        total_price += item.ssl_plan[0].price;
      }
    });

    contentServices.forEach((item) => {
      if (item.content_plan && item.content_plan[0] && item.content_plan[0].price) {
        total_price += item.content_plan[0].price;
      }
    });
  }

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

  const handleUpdateContracts = (e) => {
    e.preventDefault();

    if (remaining_cost == 0) {
      const updateContract = {
        contract_code: contract_code,
        customer_id: customer_id,
        total_price: total_price,
        deposit_amount: 0,
        remaining_cost: 0,
        status: 1
      };

      axios
        .put(`${LIST_CONTRACT}/${currentId}`, updateContract)
        .then(() => {
          setOpen(true);
          setInterval(() => {
            navigate('/contracts/list-contracts');
          }, 1500);
        })
        .catch((error) => console.log(error));
    }
    // const updateContract = {
    //   contract_code: contract_code,
    //   customer_id: customer_id,
    //   total_price: total_price,
    //   deposit_amount: deposit_amount,
    //   remaining_cost: remaining_cost
    // };

    // axios
    //   .put(`${LIST_CONTRACT}/${currentId}`, updateContract)
    //   .then(() => {
    //     setOpen(true);
    //     setInterval(() => {
    //       navigate('/contracts/list-contracts');
    //     }, 1500);
    //   })
    //   .catch((error) => {
    //     if (error.response.status == 409) {
    //       alert('Mã hợp đồng đã tồn tại!');
    //     } else {
    //       console.log(error);
    //     }
    //   });
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
                    disabled
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Khách hàng</InputLabel>
                  <Select id="customer_id" value={customer_id} label="Chọn khách hàng..." onChange={handChangeCustomer} disabled>
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
            {status == 2 ? (
              <Item>
                <Button variant="contained" size="medium" onClick={handleUpdateContracts}>
                  Cập nhật
                </Button>
              </Item>
            ) : (
              ''
            )}
          </Grid>
        </Box>
      </MainCard>
      {customer_id ? (
        <MainCard title="Chi phí thanh toán" sx={{ marginTop: '15px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom sx={{ color: '#f00' }}>
                Tổng chi phí cần thanh toán: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total_price)}
              </Typography>
            </Grid>
            {status == 2 ? (
              <Grid item xs={12} sx={{ pt: 0 }}>
                <TextField
                  id="deposit_amount"
                  label="Thanh toán trước"
                  value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(deposit_amount)}
                  variant="standard"
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Grid>
            ) : (
              ''
            )}
            <Grid item xs={12}>
              {status == 2 ? (
                <TextField
                  id="remaining_cost"
                  label="Chi phí còn lại"
                  variant="standard"
                  value={remaining_cost}
                  // value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(remaining_cost)}
                  onChange={(e) => setRemainingCost(e.target.value)}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={12}>
              {status == 1 ? (
                <Button variant="contained" color="success">
                  Đã thanh toán
                </Button>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
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
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Cập nhật thành công!</Alert>
      </Snackbar>
    </>
  );
}

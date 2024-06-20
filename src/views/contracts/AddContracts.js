import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';

import ListDomainById from './services/ListDomainById';
import ListHostingById from './services/ListHostingById';
import ListEmailById from './services/ListEmailById';
import ListSslById from './services/ListSslById';
import ListWebsiteById from './services/ListWebsiteById';
import ListContentById from './services/ListContentById';
import ListToplistById from './services/ListToplistById';
import ListMaintenanceById from './services/ListMaintenanceById';

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

  const [contract_code, setContractCode] = useState('');
  const [customer_id, setCustomerId] = useState('');
  const [note, setNote] = useState('');
  const [deposit_amount, setDepositAmount] = useState(0);
  const [remaining_cost, setRemainingCost] = useState(0);

  const [listCustomers, setListCustomers] = useState([]);
  const [customer_detail, setCustomerDetail] = useState([]);

  const [open, setOpen] = useState(false);
  const [valueTab, setValueTab] = useState('1');

  let total_price = 0;

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    loadListCustomers();
    const calculatedRemainingCost = total_price - deposit_amount;
    setRemainingCost(calculatedRemainingCost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total_price, deposit_amount]);

  const loadListCustomers = async () => {
    const result = await axios.get(`${LIST_CUSTOMERS}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    setListCustomers(result.data);
  };

  const handChangeCustomer = async (e) => {
    setCustomerId(e.target.value);
    try {
      const result = await axios.get(`${LIST_CUSTOMERS}/${e.target.value}`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      setCustomerDetail(result.data);
    } catch (error) {
      console.error('Error fetching customer data: ', error);
    }
  };

  if (customer_detail) {
    // if (domainServices) {
    //   domainServices.forEach((item) => {
    //     if (item.domain_plan && item.domain_plan[0] && item.domain_plan[0].price) {
    //       total_price += item.domain_plan[0].price * item.periods;
    //     }
    //   });
    // }
    // if (hostingServices) {
    //   hostingServices.forEach((item) => {
    //     if (item.hosting_plan && item.hosting_plan[0] && item.hosting_plan[0].price) {
    //       total_price += item.periods * 12 * item.hosting_plan[0].price;
    //     }
    //   });
    // }
    // if (emailServices) {
    //   emailServices.forEach((item) => {
    //     if (item.email_plan && item.email_plan[0] && item.email_plan[0].price) {
    //       total_price += item.periods * 12 * item.email_plan[0].price;
    //     }
    //   });
    // }
    // if (sslServices) {
    //   sslServices.forEach((item) => {
    //     if (item.ssl_plan && item.ssl_plan[0] && item.ssl_plan[0].price) {
    //       total_price += item.periods * 12 * item.ssl_plan[0].price;
    //     }
    //   });
    // }
    // if (websiteServices) {
    //   websiteServices.forEach((item) => {
    //     if (item.price) {
    //       total_price += item.price;
    //     }
    //   });
    // }
    // if (contentServices) {
    //   contentServices.forEach((item) => {
    //     if (item.content_plan && item.content_plan[0] && item.content_plan[0].price) {
    //       total_price += item.periods * item.content_plan[0].price;
    //     }
    //   });
    // }
    // if (toplistServices) {
    //   toplistServices.forEach((item) => {
    //     if (item.price) {
    //       total_price += item.periods * 12 * item.price;
    //     }
    //   });
    // }
  }

  const handleAddContracts = (e) => {
    e.preventDefault();

    if (contract_code == '') {
      alert('Vui lòng nhập mã hợp đồng!');
    }

    const addContract = {
      contract_code: contract_code,
      customer_id: customer_id,
      note: note,
      total_price: total_price,
      deposit_amount: deposit_amount,
      remaining_cost: remaining_cost
    };

    axios
      .post(`${LIST_CONTRACT}`, addContract, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      .then(() => {
        setOpen(true);
        setInterval(() => {
          navigate('/dashboard/contracts/list-contracts');
          window.location.reload(true);
        }, 1500);
      })
      .catch((error) => {
        if (error.response.status == 409) {
          alert('Mã hợp đồng đã tồn tại!');
        } else {
          console.log(error);
        }
      });
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
          <Grid item xs={6}>
            <Item>
              <FormControl variant="standard" fullWidth>
                <TextField
                  id="note"
                  label="Ghi chú"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  multiline
                  rows={4}
                  variant="standard"
                />
              </FormControl>
            </Item>
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom sx={{ color: '#f00' }}>
                Tổng chi phí cần thanh toán: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total_price)}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ pt: 0 }}>
              <TextField
                id="deposit_amount"
                label="Thanh toán trước"
                variant="standard"
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {deposit_amount ? (
                <TextField
                  id="remaining_cost"
                  label="Chi phí còn lại"
                  variant="standard"
                  value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(remaining_cost)}
                  InputProps={{
                    readOnly: true
                  }}
                />
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
                  <Tab label="Dịch vụ Thiết kế Website" value="5" />
                  <Tab label="Dịch vụ Content" value="6" />
                  <Tab label="Dịch vụ Toplist Vũng Tàu" value="7" />
                  <Tab label="Dịch vụ Bảo trì" value="8" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <ListDomainById customer_id={customer_id} />
              </TabPanel>
              <TabPanel value="2">
                <ListHostingById customer_id={customer_id} />
              </TabPanel>
              <TabPanel value="3">
                <ListEmailById customer_id={customer_id} />
              </TabPanel>
              <TabPanel value="4">
                <ListSslById customer_id={customer_id} />
              </TabPanel>
              <TabPanel value="5">
                <ListWebsiteById customer_id={customer_id} />
              </TabPanel>
              <TabPanel value="6">
                <ListContentById customer_id={customer_id} />
              </TabPanel>
              <TabPanel value="7">
                <ListToplistById customer_id={customer_id} />
              </TabPanel>
              <TabPanel value="8">
                <ListMaintenanceById customer_id={customer_id} />
              </TabPanel>
            </TabContext>
          </Box>
        </MainCard>
      ) : (
        ''
      )}
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Thêm thành công!</Alert>
      </Snackbar>
    </>
  );
}

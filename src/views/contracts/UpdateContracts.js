import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';
import { apiGetById, apiUpdate, getRoles, formatCurrency } from '../../utils/formatUtils';
import ListServices from '../../utils/services/ListServices';

const LIST_CONTRACT = `${config.API_URL}/contracts`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateContracts() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionUpdate, setPermissionUpdate] = useState(false);

  const [contract_code, setContractCode] = useState('');
  const [customer, setCustomer] = useState('');
  const [customer_id, setCustomerId] = useState('');
  const [note, setNote] = useState('');
  const [total_price, setTotalPrice] = useState(0);
  const [deposit_amount, setDepositAmount] = useState(0);
  const [remaining_cost, setRemainingCost] = useState(0);
  const [export_vat, setExportVat] = useState(false);
  const [status, setStatus] = useState();

  const [remaining_cost_new, setRemainingCostNew] = useState('');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadDetailContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667463d04bede188dfb46d7c');

      if (filteredUpdate.length > 0) {
        setPermissionUpdate(true);
      } else {
        setPermissionUpdate(false);
      }
    }
  }, [dataRoles]);

  useEffect(() => {
    if (deposit_amount > 0) {
      setRemainingCost(total_price - deposit_amount);
    }
  }, [total_price, deposit_amount]);

  const loadListRoles = async () => {
    const result = await getRoles();
    setDataRoles(result.data);
  };

  const loadDetailContract = async () => {
    const result = await apiGetById(`${LIST_CONTRACT}`, currentId);
    setContractCode(result.data.contract_code);
    setCustomer(result.data.customer_id.fullname);
    setCustomerId(result.data.customer_id._id);
    setTotalPrice(result.data.total_price || 0);
    setDepositAmount(result.data.deposit_amount || 0);
    setRemainingCost(result.data.remaining_cost || 0);
    setNote(result.data.note || '');
    setExportVat(result.data.export_vat || false);
    setStatus(result.data.status);
  };

  const handleChangeExportVat = (e) => {
    setExportVat(e.target.checked);
  };

  const handleChangeRemainingCost = (e) => {
    e.preventDefault();
    setRemainingCostNew(e.target.value);
  };

  const handleUpdateContracts = (e) => {
    e.preventDefault();

    let updateContract = {};

    if (remaining_cost_new) {
      updateContract = {
        deposit_amount: parseFloat(deposit_amount) + parseFloat(remaining_cost_new),
        remaining_cost: 0,
        note: note,
        export_vat: export_vat
      };
    } else {
      updateContract = {
        deposit_amount: parseFloat(deposit_amount),
        remaining_cost: parseFloat(remaining_cost),
        note: note,
        export_vat: export_vat
      };
    }

    apiUpdate(`${LIST_CONTRACT}`, currentId, updateContract)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/dashboard/contracts/list-contracts');
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  const renderTextField = () => {
    if (status === 0 || deposit_amount === 0) {
      return (
        <TextField
          id="remaining_cost"
          label="Chi phí còn lại"
          variant="standard"
          value={formatCurrency(remaining_cost)}
          InputProps={{
            readOnly: true
          }}
        />
      );
    } else if (status === 2) {
      return null;
    } else {
      return (
        <TextField
          id="remaining_cost_new"
          value={remaining_cost_new}
          label="Chi phí còn lại"
          variant="standard"
          onChange={handleChangeRemainingCost}
        />
      );
    }
  };

  return permissionUpdate ? (
    <>
      <MainCard title="Cập nhật">
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
                    disabled
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Khách hàng</InputLabel>
                  <Input id="customer" name="customer" value={customer} onChange={(e) => setCustomer(e.target.value)} disabled />
                </FormControl>
              </Item>
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
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <FormLabel component="legend">Xuất hóa đơn VAT</FormLabel>
                  <Switch checked={export_vat} onChange={handleChangeExportVat} />
                </FormControl>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
      <MainCard title="Chi phí thanh toán" sx={{ marginTop: '15px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom sx={{ color: '#f00' }}>
              Tổng chi phí cần thanh toán: {formatCurrency(total_price)}
            </Typography>
          </Grid>
          {deposit_amount ? (
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom sx={{ color: '#f00' }}>
                Đã thanh toán: {formatCurrency(deposit_amount)}
              </Typography>
            </Grid>
          ) : (
            ''
          )}
          {remaining_cost == 0 ? (
            ''
          ) : (
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom sx={{ color: '#f00' }}>
                Chi phí còn lại: {formatCurrency(remaining_cost)}
              </Typography>
            </Grid>
          )}
          {status == 0 ? (
            <Grid item xs={12} sx={{ pt: 0 }}>
              <TextField id="deposit_amount" label="Thanh toán" variant="standard" onChange={(e) => setDepositAmount(e.target.value)} />
            </Grid>
          ) : (
            ''
          )}
          <Grid item xs={12}>
            {renderTextField()}
          </Grid>
          <Grid item xs={12}>
            {status == 2 ? (
              <Button variant="contained" color="success">
                Đã thanh toán
              </Button>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleUpdateContracts}>
                Cập nhật
              </Button>
            </Item>
          </Grid>
        </Grid>
      </MainCard>
      <ListServices customer_id={customer_id} />
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Cập nhật thành công!</Alert>
      </Snackbar>
    </>
  ) : (
    <div>Bạn không có quyền truy cập!</div>
  );
}

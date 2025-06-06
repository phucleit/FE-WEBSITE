import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import {
  Box,
  Paper,
  Grid,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  Button,
  Alert,
  Snackbar,
  MenuItem,
  Select,
  Switch
} from '@mui/material';

import { apiPostFile, getRoles } from '../../utils/formatUtils';

const fileTypes = ['JPG', 'JPEG', 'PNG', 'jpg', 'jpeg', 'png'];

const LIST_CUSTOMERS = `${process.env.REACT_APP_API_URL}/customer`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddCustomers() {
  let navigate = useNavigate();
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);

  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [company, setCompany] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [addressCompany, setAddressCompany] = useState('');
  const [representative, setRepresentative] = useState('');
  const [representativeHotline, setRepresentativeHotline] = useState('');
  const [mailVat, setMailVat] = useState('');
  const [imageFrontView, setImageFrontView] = useState('');
  const [imageBackView, setImageBackView] = useState('');
  const [typeCustomer, setTypeCustomer] = useState(false);

  const [open, setOpen] = useState(false);
  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    loadListRoles();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667463d04bede188dfb46d7e');
      if (filteredAdd.length > 0) {
        setPermissionAdd(true);
      } else {
        setPermissionAdd(false);
      }
    }
  }, [dataRoles]);

  const loadListRoles = async () => {
    const result = await getRoles();
    setDataRoles(result.data);
  };

  const handleChangeFrontView = (file) => {
    setImageFrontView(file);
  };

  const handleChangeBackView = (file) => {
    setImageBackView(file);
  };

  const handleChangeTypeCustomer = (e) => {
    setTypeCustomer(e.target.checked);
  };

  const handleCloseError = () => {
    setopenError(false);
  };

  const handleAddCustomers = (e) => {
    e.preventDefault();
    if (fullname == '') {
      setMessageError('Vui lòng nhập họ và tên!');
      setopenError(true);
      return;
    }

    if (gender == '') {
      setMessageError('Vui lòng chọn giới tính!');
      setopenError(true);
      return;
    }

    if (idNumber == '') {
      setMessageError('Vui lòng nhập số CCCD!');
      setopenError(true);
      return;
    }

    if (phone == '') {
      setMessageError('Vui lòng nhập số điện thoại!');
      setopenError(true);
      return;
    }

    const formDataCustomer = new FormData();
    formDataCustomer.append('fullname', fullname);
    formDataCustomer.append('email', email);
    formDataCustomer.append('gender', gender);
    formDataCustomer.append('idNumber', idNumber);
    formDataCustomer.append('phone', phone);
    formDataCustomer.append('address', address);
    formDataCustomer.append('company', company);
    formDataCustomer.append('tax_code', taxCode);
    formDataCustomer.append('address_company', addressCompany);
    formDataCustomer.append('representative', representative);
    formDataCustomer.append('representative_hotline', representativeHotline);
    formDataCustomer.append('mail_vat', mailVat);
    formDataCustomer.append('image_front_view', imageFrontView);
    formDataCustomer.append('image_back_view', imageBackView);
    formDataCustomer.append('type_customer', typeCustomer);

    apiPostFile(`${LIST_CUSTOMERS}`, formDataCustomer)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/trang-chu/khach-hang/danh-sach-khach-hang');
        }, 1500);
      })
      .catch((error) => {
        setMessageError(error.response.data.message);
        setopenError(true);
      });
  };

  return permissionAdd ? (
    <>
      <MainCard title="Thêm mới">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Họ và tên</InputLabel>
                  <Input
                    id="fullname"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    required={true}
                    placeholder="Nhập họ và tên..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Địa chỉ email</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập địa chỉ email..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Giới tính</InputLabel>
                  <Select labelId="gender" id="gender" value={gender} required={true} onChange={(e) => setGender(e.target.value)}>
                    <MenuItem value={1}>Nam</MenuItem>
                    <MenuItem value={2}>Nữ</MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>CCCD</InputLabel>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    value={idNumber}
                    type="number"
                    onChange={(e) => setIdNumber(e.target.value)}
                    required={true}
                    placeholder="Nhập số CCCD..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Số điện thoại</InputLabel>
                  <Input
                    id="phone"
                    name="phone"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required={true}
                    placeholder="Nhập số điện thoại..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Địa chỉ</InputLabel>
                  <Input
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nhập địa chỉ..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <InputLabel>Hình CCCD mặt trước</InputLabel>
              </Item>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <FileUploader
                    label="Hình CCCD mặt trước"
                    handleChange={handleChangeFrontView}
                    name="imageFrontView"
                    types={fileTypes}
                    maxSize="10"
                    fullWidth
                  />
                </FormControl>
              </Item>
              <Item>
                {imageFrontView && (
                  <div>
                    <img src={URL.createObjectURL(imageFrontView)} alt="Hình CCCD mặt trước" width={400} height={230} />
                  </div>
                )}
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <InputLabel>Hình CCCD mặt trước</InputLabel>
              </Item>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <FileUploader
                    label="Hình CCCD mặt sau"
                    handleChange={handleChangeBackView}
                    name="imageBackView"
                    types={fileTypes}
                    maxSize="10"
                    fullWidth
                  />
                </FormControl>
              </Item>
              <Item>
                {imageBackView && (
                  <div>
                    <img src={URL.createObjectURL(imageBackView)} alt="Hình CCCD mặt sau" width={400} height={230} />
                  </div>
                )}
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <FormLabel component="legend">Khách hàng doanh nghiệp</FormLabel>
                  <Switch checked={typeCustomer} onChange={handleChangeTypeCustomer} />
                </FormControl>
              </Item>
            </Grid>
            {typeCustomer === true && (
              <>
                <Grid item xs={6}>
                  <Item>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Tên công ty</InputLabel>
                      <Input
                        id="company"
                        name="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Nhập tên công ty..."
                      />
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Mã số thuế</InputLabel>
                      <Input
                        id="taxCode"
                        name="taxCode"
                        value={taxCode}
                        type="number"
                        onChange={(e) => setTaxCode(e.target.value)}
                        placeholder="Nhập mã số thuế..."
                      />
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Địa chỉ công ty</InputLabel>
                      <Input
                        id="addressCompany"
                        name="addressCompany"
                        value={addressCompany}
                        onChange={(e) => setAddressCompany(e.target.value)}
                        placeholder="Nhập địa chỉ công ty..."
                      />
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Người đại diện</InputLabel>
                      <Input
                        id="representative"
                        name="representative"
                        value={representative}
                        onChange={(e) => setRepresentative(e.target.value)}
                        placeholder="Nhập tên người đại diện..."
                      />
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Hotline người đại diện</InputLabel>
                      <Input
                        id="representativeHotline"
                        name="representativeHotline"
                        type="number"
                        value={representativeHotline}
                        onChange={(e) => setRepresentativeHotline(e.target.value)}
                        placeholder="Nhập hotline người đại diện..."
                      />
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Mail VAT</InputLabel>
                      <Input
                        id="mailVat"
                        name="mailVat"
                        value={mailVat}
                        onChange={(e) => setMailVat(e.target.value)}
                        placeholder="Nhập mail VAT..."
                      />
                    </FormControl>
                  </Item>
                </Grid>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleAddCustomers}>
                Thêm mới
              </Button>
            </Item>
          </Grid>
        </Box>
      </MainCard>
      <Snackbar
        open={openError}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1500}
      >
        <Alert severity="error">{messageError}</Alert>
      </Snackbar>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Thêm thành công!</Alert>
      </Snackbar>
    </>
  ) : (
    <div>Bạn không có quyền truy cập!</div>
  );
}

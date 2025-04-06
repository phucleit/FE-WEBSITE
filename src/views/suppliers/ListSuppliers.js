import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { IconEdit } from '@tabler/icons';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { apiGet, apiDelete, formatPhoneNumber, getRoles, maskPhoneNumber } from '../../utils/formatUtils';

const LIST_SUPPLIER = `${process.env.REACT_APP_API_URL}/supplier`;

export default function ListSupplier() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);
  const [permissionUpdate, setPermissionUpdate] = useState(false);
  const [permissionDelete, setPermissionDelete] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    loadListRoles();
    loadListSupplier();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667463d04bede188dfb46d76');
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667463d04bede188dfb46d77');
      const filteredDelete = dataRoles.filter((role_delete) => role_delete.function_id === '667463d04bede188dfb46d78');
      if (filteredAdd.length > 0) {
        setPermissionAdd(true);
      } else {
        setPermissionAdd(false);
      }

      if (filteredUpdate.length > 0) {
        setPermissionUpdate(true);
      } else {
        setPermissionUpdate(false);
      }

      if (filteredDelete.length > 0) {
        setPermissionDelete(true);
      } else {
        setPermissionDelete(false);
      }
    }
  }, [dataRoles]);

  const loadListRoles = async () => {
    const result = await getRoles();
    setDataRoles(result.data);
  };

  const loadListSupplier = async () => {
    const result = await apiGet(`${LIST_SUPPLIER}`);
    setData(result.data);
  };

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleClose = () => {
    setOpenConfirm(false);
    setSelectedId(null);
  };

  const handleCloseError = () => {
    setopenError(false);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      apiDelete(`${LIST_SUPPLIER}`, selectedId)
        .then(() => {
          setOpen(true);
          setData(data.filter((item) => item._id !== selectedId));
          setTimeout(() => {
            setOpen(false);
          }, 1100);
        })
        .catch((error) => {
          setMessageError(error.response.data.message);
          setopenError(true);
        })
        .finally(() => handleClose());
    }
  };

  const columns = [
    { field: 'name', headerName: 'Tên NCC', width: 130 },
    { field: 'company', headerName: 'Tên công ty', width: 250 },
    { field: 'tax_code', headerName: 'Mã số thuế', width: 150 },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      width: 150,
      valueGetter: (params) => maskPhoneNumber(formatPhoneNumber(params.row.phone))
    },
    { field: 'name_support', headerName: 'Hỗ trợ viên', width: 180 },
    {
      field: 'phone_support',
      headerName: 'Hotline hỗ trợ viên',
      width: 150,
      valueGetter: (params) => maskPhoneNumber(formatPhoneNumber(params.row.phone_support))
    },
    { field: 'address', headerName: 'Địa chỉ', width: 350 }
  ];

  if (permissionUpdate || permissionDelete) {
    columns.unshift({
      field: 'action',
      headerName: 'Hành động',
      width: 110,
      renderCell: (params) => {
        return (
          <>
            {permissionUpdate && (
              <Link to={'/trang-chu/nha-cung-cap/cap-nhat-nha-cung-cap/' + params.row._id}>
                <IconEdit />
              </Link>
            )}
            {permissionDelete && (
              <DeleteOutline style={{ cursor: 'pointer', color: '#ff6666' }} onClick={() => handleOpen(params.row._id)} />
            )}
          </>
        );
      }
    });
  }

  return (
    <>
      <MainCard
        title="Danh sách"
        secondary={
          permissionAdd && (
            <Button variant="contained" component={Link} to="/trang-chu/nha-cung-cap/them-nha-cung-cap">
              Thêm mới
            </Button>
          )
        }
      >
        {data.length !== 0 ? (
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20
                }
              }
            }}
            pageSizeOptions={[20]}
            checkboxSelection
            // disableSelectionOnClick
            // disableRowSelectionOnClick
          />
        ) : (
          ''
        )}
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Xóa thành công!</Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1500}
      >
        <Alert severity="error">{messageError}</Alert>
      </Snackbar>
      <Dialog open={openConfirm} onClose={handleClose}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn muốn xóa mục này không?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Huỷ
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

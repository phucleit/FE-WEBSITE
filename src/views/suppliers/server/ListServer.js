import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import MainCard from 'ui-component/cards/MainCard';
import { IconEdit } from '@tabler/icons';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import config from '../../../config';
import { apiGet, apiDelete, formatPhoneNumber, getRoles, maskPhoneNumber } from '../../../utils/formatUtils';

const LIST_SERVER = `${config.API_URL}/server`;

export default function ListServer() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);
  const [permissionUpdate, setPermissionUpdate] = useState(false);
  const [permissionDelete, setPermissionDelete] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadListServer();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667463d04bede188dfb46a81');
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667463d04bede188dfb46e81');
      const filteredDelete = dataRoles.filter((role_delete) => role_delete.function_id === '667463d04bede188dfb46f81');
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

  const loadListServer = async () => {
    const result = await apiGet(`${LIST_SERVER}`);
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      apiDelete(`${LIST_SERVER}`, id)
        .then(() => {
          setOpen(true);
          setData(data.filter((item) => item._id !== id));
          setTimeout(() => {
            setOpen(false);
          }, 1100);
        })
        .catch((error) => console.log(error));
    }
  };

  const columns = [
    { field: 'name', headerName: 'Tên NCC', width: 140 },
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
    { field: 'address', headerName: 'Địa chỉ', width: 380 }
  ];

  if (permissionUpdate || permissionDelete) {
    columns.unshift({
      field: 'action',
      headerName: 'Hành động',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {permissionUpdate && (
              <Link to={'/trang-chu/nha-cung-cap/server/cap-nhat-server/' + params.row._id}>
                <IconEdit />
              </Link>
            )}
            {permissionDelete && (
              <DeleteOutline style={{ cursor: 'pointer', color: '#ff6666' }} onClick={() => handleDelete(params.row._id)} />
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
            <Button variant="contained" component={Link} to="/trang-chu/nha-cung-cap/server/them-server">
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
            disableSelectionOnClick
            disableRowSelectionOnClick
          />
        ) : (
          ''
        )}
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Xóa thành công!</Alert>
      </Snackbar>
    </>
  );
}

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
import { apiGet, apiDelete, getRoles } from '../../../utils/formatUtils';

const LIST_SERVER_PLANS = `${config.API_URL}/plans/server`;

export default function ListServerPlans() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);
  const [permissionUpdate, setPermissionUpdate] = useState(false);
  const [permissionDelete, setPermissionDelete] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadListServerPlans();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '66746678f7f723b779b1b074');
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '66746678f7f723b779b1b075');
      const filteredDelete = dataRoles.filter((role_delete) => role_delete.function_id === '66746678f7f723b779b1b076');
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

  const loadListServerPlans = async () => {
    const result = await apiGet(`${LIST_SERVER_PLANS}`);
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      apiDelete(`${LIST_SERVER_PLANS}`, id)
        .then(() => {
          setOpen(true);
          setData(data.filter((item) => item._id !== id));
          setInterval(() => {
            setOpen(false);
          }, 1100);
        })
        .catch((error) => console.log(error));
    }
  };

  const columns = [
    { field: 'name', headerName: 'Tên IP', width: 300 },
    {
      field: 'supplier_server_id',
      headerName: 'Nhà cung cấp',
      width: 300,
      valueGetter: (params) => `${params.row.supplier_server_id.name}`
    }
  ];

  if (permissionUpdate || permissionDelete) {
    columns.push({
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {permissionUpdate && (
              <Link to={'/dashboard/plans/update-server/' + params.row._id}>
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
            <Button variant="contained" component={Link} to="/dashboard/plans/add-server">
              Thêm mới
            </Button>
          )
        }
      >
        {data.length ? (
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

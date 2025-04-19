import React, { useState, useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';

import { getRoles, apiGet, getCreatedAt } from '../../utils/formatUtils';

const LIST_BACKUPS = `${process.env.REACT_APP_API_URL}/backups`;

export default function ListBackups() {
  const [data, setData] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadListBackups();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '643263d04bede188dfb46d76');
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

  const loadListBackups = async () => {
    const result = await apiGet(`${LIST_BACKUPS}`);
    setData(result.data);
  };

  const handleBackups = () => {
    apiGet(`${LIST_BACKUPS}/backups`)
      .then(() => {
        
      })
      .catch((error) => {
        console.log('error: ', error);
      })
      .finally(() => {
        
      });
  };

  const rows = data.map((item, index) => ({
    ...item,
    stt: index + 1,
  }));

  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      width: 80,
      sortable: false,
      filterable: false,
    },
    { field: 'fileName', headerName: 'Tên File', width: 500 },
    { field: 'createdAt', headerName: 'Ngày tạo', valueGetter: (params) => getCreatedAt(params.row.createdAt), width: 230 },
    { field: 'address', headerName: 'Hành động', width: 200 }
  ];

  return (
    <>
      <MainCard
        title="Danh sách sao lưu dữ liệu"
        secondary={
          permissionAdd && (
            <Button variant="contained" onClick={handleBackups}>
              Thêm mới
            </Button>
          )
        }
      >
        <DataGrid
          rows={rows}
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
          // disableSelectionOnClick
          // disableRowSelectionOnClick
        />
      </MainCard>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import MainCard from 'ui-component/cards/MainCard';
import { IconEdit } from '@tabler/icons';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import config from '../../config';
import { apiGet, apiDelete, getCreatedAt, getRoles } from '../../utils/formatUtils';

const LIST_CONTRACTS = `${config.API_URL}/contracts`;

export default function ListContracts() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  // const [permissionAdd, setPermissionAdd] = useState(false);
  const [permissionUpdate, setPermissionUpdate] = useState(false);
  const [permissionDelete, setPermissionDelete] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadListContracts();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      // const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667463d04bede188dfb46d7b');
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667463d04bede188dfb46d7c');
      const filteredDelete = dataRoles.filter((role_delete) => role_delete.function_id === '667463d04bede188dfb46c7c');
      // if (filteredAdd.length > 0) {
      //   setPermissionAdd(true);
      // } else {
      //   setPermissionAdd(false);
      // }

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

  const loadListContracts = async () => {
    const result = await apiGet(`${LIST_CONTRACTS}`);
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      apiDelete(`${LIST_CONTRACTS}`, id)
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
    { field: 'contract_code', headerName: 'Mã hợp đồng', width: 150 },
    // {
    //   field: 'customer',
    //   headerName: 'Khách hàng',
    //   width: 280,
    //   renderCell: (params) => {
    //     if (params.row.customer_id.gender == 1) {
    //       return (
    //         <span>
    //           Anh {params.row.customer_id.fullname}
    //           <br />
    //           {params.row.customer_id.email} / {params.row.customer_id.phone}
    //         </span>
    //       );
    //     } else {
    //       return (
    //         <span>
    //           Chị {params.row.customer_id.fullname}
    //           <br />
    //           {params.row.customer_id.email} / {params.row.customer_id.phone}
    //         </span>
    //       );
    //     }
    //   }
    // },
    {
      field: 'total_price',
      headerName: 'Tổng chi phí',
      width: 160,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.total_price)
    },
    {
      field: 'deposit_amount',
      headerName: 'Thanh toán trước',
      width: 160,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.deposit_amount)
    },
    {
      field: 'remaining_cost',
      headerName: 'Chi phí còn lại',
      width: 160,
      valueGetter: (params) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.remaining_cost)
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 300,
      renderCell: (params) => {
        if (params.row.status == 1) {
          return (
            <Button variant="contained" size="small">
              Đã thanh toán
            </Button>
          );
        } else if (params.row.status == 2) {
          return (
            <Button variant="contained" size="small" color="error">
              Thanh toán trước {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.deposit_amount)}
            </Button>
          );
        }
      }
    },
    { field: 'createdAt', headerName: 'Ngày tạo', valueGetter: (params) => getCreatedAt(params.row.createdAt), width: 180 }
  ];

  if (permissionUpdate || permissionDelete) {
    columns.push({
      field: 'action',
      headerName: 'Hành động',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {permissionUpdate && (
              <Link to={'/dashboard/contracts/update-contracts/' + params.row._id}>
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
        title="Danh sách hợp đồng"
        // secondary={
        //   permissionAdd && (
        //     <Button variant="contained" component={Link} to="/dashboard/contracts/add-contracts">
        //       Thêm mới
        //     </Button>
        //   )
        // }
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

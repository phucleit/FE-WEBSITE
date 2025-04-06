import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MainCard from 'ui-component/cards/MainCard';
import { IconEdit } from '@tabler/icons';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Button, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { apiGet, apiDelete, getCreatedAt, getRoles, formatCurrency } from '../../utils/formatUtils';

const LIST_CONTRACTS = `${process.env.REACT_APP_API_URL}/contracts`;

export default function ListContracts() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  // const [permissionAdd, setPermissionAdd] = useState(false);
  const [permissionUpdate, setPermissionUpdate] = useState(false);
  const [permissionDelete, setPermissionDelete] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleClose = () => {
    setOpenConfirm(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      apiDelete(`${LIST_CONTRACTS}`, selectedId)
        .then(() => {
          setOpen(true);
          setData(data.filter((item) => item._id !== selectedId));
          setTimeout(() => {
            setOpen(false);
          }, 1100);
        })
        .catch((error) => console.log(error))
        .finally(() => handleClose());
    }
  };

  const columns = [
    { field: 'contract_code', headerName: 'Mã hợp đồng', width: 200 },
    {
      field: 'customer',
      headerName: 'Khách hàng',
      width: 260,
      renderCell: (params) => {
        if (params.row.customer_id.gender == 1) {
          return (
            <span>
              Anh {params.row.customer_id.fullname}
              <br />
              {params.row.customer_id.email} / {params.row.customer_id.phone}
            </span>
          );
        } else {
          return (
            <span>
              Chị {params.row.customer_id.fullname}
              <br />
              {params.row.customer_id.email} / {params.row.customer_id.phone}
            </span>
          );
        }
      }
    },
    {
      field: 'type_customer',
      headerName: 'Loại khách hàng',
      width: 170,
      renderCell: (params) => {
        if (params.row.customer_id.type_customer == true) {
          return (
            <Button variant="contained" size="small" color="warning">
              Khách doanh nghiệp
            </Button>
          );
        } else {
          return (
            <Button variant="contained" size="small">
              Khách cá nhân
            </Button>
          );
        }
      }
    },
    {
      field: 'total_price',
      headerName: 'Tổng chi phí',
      width: 160,
      valueGetter: (params) => formatCurrency(params.row.total_price)
    },
    {
      field: 'deposit_amount',
      headerName: 'Đã thanh toán',
      width: 160,
      valueGetter: (params) => formatCurrency(params.row.deposit_amount)
    },
    {
      field: 'remaining_cost',
      headerName: 'Chi phí còn lại',
      width: 160,
      valueGetter: (params) => formatCurrency(params.row.remaining_cost)
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 300,
      renderCell: (params) => {
        if (params.row.status == 0) {
          return (
            <Button variant="contained" size="small" color="success">
              Hợp đồng mới tạo
            </Button>
          );
        } else if (params.row.status == 1) {
          return (
            <Button variant="contained" size="small" color="error">
              Thanh toán trước {formatCurrency(params.row.deposit_amount)}
            </Button>
          );
        } else if (params.row.status == 2) {
          return (
            <Button variant="contained" size="small">
              Đã thanh toán
            </Button>
          );
        }
      }
    },
    {
      field: 'export_vat',
      headerName: 'Xuất HĐ VAT',
      width: 200,
      renderCell: (params) => {
        if (params.row.export_vat == false) {
          return (
            <Button variant="contained" size="small" color="success">
              Chưa xuất
            </Button>
          );
        } else {
          return (
            <Button variant="contained" size="small">
              Đã xuất
            </Button>
          );
        }
      }
    },
    { field: 'createdAt', headerName: 'Ngày tạo', valueGetter: (params) => getCreatedAt(params.row.createdAt), width: 180 }
  ];

  if (permissionUpdate || permissionDelete) {
    columns.unshift({
      field: 'action',
      headerName: 'Hành động',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {permissionUpdate && (
              <Link to={'/trang-chu/hop-dong/cap-nhat-hop-dong/' + params.row._id}>
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
        title="Danh sách hợp đồng"
        // secondary={
        //   permissionAdd && (
        //     <Button variant="contained" component={Link} to="/trang-chu/contracts/add-contracts">
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

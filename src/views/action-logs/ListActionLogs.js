import React, { useState, useEffect, useCallback } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';

import { apiGet, getCreatedAt } from '../../utils/formatUtils';

const LIST_ACTION_LOGS = `${process.env.REACT_APP_API_URL}/action-logs`;

export default function ListActionLogs() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  const loadListActionLogs = useCallback(async () => {
    setLoading(true);
    try {
      const result = await apiGet(`${LIST_ACTION_LOGS}?page=${page + 1}&limit=${pageSize}`);
      setData(result.data.data || []);
      setTotalRows(result.data.totalRecords || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    loadListActionLogs();
  }, [loadListActionLogs]);

  const columns = [
    {
      field: 'scloud',
      headerName: 'Nguồn thông báo',
      width: 250,
      renderCell: () => <span>Scloud.vn</span>
    },
    {
      field: 'noi_dung',
      headerName: 'Nội dung',
      width: 1000,
      renderCell: (params) => (
        <span>
          {getCreatedAt(params.row.createdAt)}: Tài khoản {params.row.user_id.display_name} {params.row.action} {params.row.object}
        </span>
      )
    }
  ];

  return (
    <MainCard title="Danh sách">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._id}
        pagination
        paginationMode="server"
        rowCount={totalRows}
        pageSize={pageSize}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        loading={loading}
        disableColumnMenu
        hideFooterSelectedRowCount
      />
    </MainCard>
  );
}

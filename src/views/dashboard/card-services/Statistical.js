import React, { useState, useEffect } from 'react';

import { MenuItem, Select, FormControl, InputLabel, Snackbar, Alert, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { apiGet, convertPrice } from '../../../utils/formatUtils';

export default function Statistical() {
  const [year, setYear] = useState('');
  const [years, setYears] = useState([]);
  const [service, setService] = useState('');
  const [chartData, setChartData] = useState([]);
  const [importPrice, setImportPrice] = useState('');
  const [price, setPrice] = useState('');
  const [profit, setProfit] = useState('');

  const [openError, setopenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const getServiceName = (id) => {
    const map = {
      1: 'TÊN MIỀN',
      2: 'HOSTING',
      3: 'SSL',
      4: 'EMAIL',
      5: 'THIẾT KẾ WEBSITE',
      6: 'CONTENT & PR',
      7: 'TOPLIST VŨNG TÀU',
      8: 'BẢO TRÌ',
      9: 'NHÀ MẠNG'
    };
    return map[id] || '';
  };

  useEffect(() => {
    const fetchYearsByService = async () => {
      if (!service) return;

      try {
        const resultYears = await apiGet(`${process.env.REACT_APP_API_URL}/statistics/years?service=${service}`);
        setYears(resultYears.data);
        setYear('');
        setChartData([]);
      } catch (error) {
        setMessageError(error.response.data.message);
        setopenError(true);
      }
    };

    fetchYearsByService();
  }, [service]);

  useEffect(() => {
    const fetchStatistics = async () => {
      if (!service && !year) return;

      try {
        const resultStatistics = await apiGet(`${process.env.REACT_APP_API_URL}/statistics?service=${service}&year=${year}`);
        setChartData(resultStatistics.data.data || []);
        setImportPrice(resultStatistics.data.total.import_price || 0);
        setPrice(resultStatistics.data.total.price || 0);
        setProfit(resultStatistics.data.total.profit || 0);
      } catch (error) {
        setMessageError(error.response.data.message);
        setopenError(true);
      }
    };

    fetchStatistics();
  }, [year, service]);

  const handleCloseError = () => {
    setopenError(false);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 160, mb: 5, mr: 2 }}>
        <InputLabel id="service-select">Chọn dịch vụ...</InputLabel>
        <Select id="service-select" value={service} label="Chọn dịch vụ..." onChange={(e) => setService(e.target.value)}>
          <MenuItem value={1}>Tên miền</MenuItem>
          <MenuItem value={2}>Hosting</MenuItem>
          <MenuItem value={3}>SSL</MenuItem>
          <MenuItem value={4}>Email</MenuItem>
          <MenuItem value={5}>Thiết kế website</MenuItem>
          <MenuItem value={6}>Viết bài Content & PR</MenuItem>
          <MenuItem value={7}>Toplist Vũng Tàu</MenuItem>
          <MenuItem value={8}>Bảo trì</MenuItem>
          <MenuItem value={9}>Nhà mạng</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel id="year-select">Chọn năm...</InputLabel>
        <Select id="year-select" label="Chọn năm..." value={year} onChange={(e) => setYear(e.target.value)}>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {chartData.length > 0 && (
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => convertPrice(value)} />
              <Legend />
              <Bar dataKey="import_price" fill="#0693e3" name="Giá nhập" />
              <Bar dataKey="price" fill="#ff6900" name="Giá bán" />
              <Bar dataKey="profit" fill="#00d084" name="Lợi nhuận" />
            </BarChart>
          </ResponsiveContainer>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: 2 }}>
            BIỂU ĐỒ DOANH SỐ DỊCH VỤ {getServiceName(service)} TỪ THÁNG 1 ĐẾN THÁNG 12 NĂM {year}
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            TỔNG GIÁ NHẬP ĐÃ THANH TOÁN:
            <span style={{ color: 'red', marginLeft: '5px' }}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(importPrice)}
            </span>
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            TỔNG GIÁ BÁN ĐÃ THANH TOÁN:
            <span style={{ color: 'red', marginLeft: '5px' }}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
            </span>
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            TỔNG LỢI NHUẬN DỊCH VỤ {getServiceName(service)}:
            <span style={{ color: 'red', marginLeft: '5px' }}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(profit)}
            </span>
          </Typography>
        </div>
      )}

      <Snackbar
        open={openError}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1500}
      >
        <Alert severity="error">{messageError}</Alert>
      </Snackbar>
    </div>
  );
}

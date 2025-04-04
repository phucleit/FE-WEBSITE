import React, { useState } from 'react';

import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dữ liệu thống kê theo năm và dịch vụ
const dataSets = {
  2023: {
    1: [
      { month: 'Tháng 1', giaNhap: 100, giaBan: 150 },
      { month: 'Tháng 2', giaNhap: 120, giaBan: 170 },
      { month: 'Tháng 3', giaNhap: 140, giaBan: 190 }
    ],
    2: [
      { month: 'Tháng 1', giaNhap: 200, giaBan: 250 },
      { month: 'Tháng 2', giaNhap: 220, giaBan: 270 },
      { month: 'Tháng 3', giaNhap: 240, giaBan: 290 }
    ]
  },
  2024: {
    1: [
      { month: 'Tháng 1', giaNhap: 110, giaBan: 160 },
      { month: 'Tháng 2', giaNhap: 130, giaBan: 180 },
      { month: 'Tháng 3', giaNhap: 150, giaBan: 200 }
    ],
    2: [
      { month: 'Tháng 1', giaNhap: 220, giaBan: 270 },
      { month: 'Tháng 2', giaNhap: 240, giaBan: 290 },
      { month: 'Tháng 3', giaNhap: 260, giaBan: 310 }
    ]
  }
};

export default function Statistical() {
  const [year, setYear] = useState('');
  const [service, setService] = useState('');

  // Lấy danh sách năm từ dataSets
  const years = Object.keys(dataSets);

  return (
    <div>
      {/* Chọn năm */}
      <FormControl sx={{ minWidth: 160, mr: 2 }}>
        <InputLabel id="year-select">Chọn năm...</InputLabel>
        <Select id="year-select" label="Chọn năm..." value={year} onChange={(event) => setYear(event.target.value)}>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Chọn dịch vụ */}
      <FormControl sx={{ minWidth: 160, mb: 5 }}>
        <InputLabel id="service-select">Chọn dịch vụ...</InputLabel>
        <Select id="service-select" value={service} label="Chọn dịch vụ..." onChange={(event) => setService(event.target.value)}>
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

      {/* Hiển thị biểu đồ nếu cả năm và dịch vụ được chọn */}
      {year && service && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataSets[year]?.[service] || []}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="giaNhap" fill="#8884d8" name="Giá nhập" />
            <Bar dataKey="giaBan" fill="#82ca9d" name="Giá bán" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

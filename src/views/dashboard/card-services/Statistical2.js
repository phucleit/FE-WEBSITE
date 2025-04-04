import React, { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function Statistical2() {
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 160 }}>
      <InputLabel id="value-services">Chọn dịch vụ...</InputLabel>
      <Select id="value-services" value={value} label="Chọn dịch vụ..." onChange={handleChange}>
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
  );
}

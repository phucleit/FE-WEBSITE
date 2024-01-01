import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import config from '../../../config';

const LIST_CONTRACTS = `${config.API_URL}/contracts`;

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

export default function TotalPriceServices() {
  const theme = useTheme();
  let navigate = useNavigate();

  const [data, setData] = useState([]);

  let totalPrice = 0;
  let depositAmount = 0;
  let remainingCost = 0;

  useEffect(() => {
    loadListContracts();
  }, []);

  const loadListContracts = async () => {
    const result = await axios.get(`${LIST_CONTRACTS}`);
    setData(result.data);
  };

  if (data) {
    data.forEach((item) => {
      totalPrice += item.total_price;
      depositAmount += item.deposit_amount;
      remainingCost += item.remaining_cost;
    });
  }

  const handleClick = () => {
    navigate('/contracts/list-contracts');
  };

  return (
    <CardWrapper border={false} content={false}>
      <Box sx={{ p: 2.25 }}>
        <Grid container direction="column">
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item lg={11} md={11} sm={11} xs={11}>
                <Grid container>
                  <Grid item lg={2} md={2} sm={2} xs={2}>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.secondary[800],
                        mt: 1
                      }}
                    >
                      <img src={EarningIcon} alt="Notification" />
                    </Avatar>
                  </Grid>
                  <Grid item lg={10} md={10} sm={10} xs={10}>
                    <Typography sx={{ fontSize: '20px', fontWeight: 500, ml: -2, mr: 1, mt: 1.75, mb: 0.75 }}>
                      Tổng chi phí hợp đồng
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={1} md={1} sm={1} xs={1}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    backgroundColor: theme.palette.secondary.dark,
                    color: theme.palette.secondary[200],
                    zIndex: 1
                  }}
                  aria-controls="menu-earning-card"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreHorizIcon fontSize="inherit" />
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography sx={{ fontSize: '18px', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                  • Tổng chi phí:<span> </span>
                  {totalPrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice) : '0 ₫'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography sx={{ fontSize: '18px', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                  • Đã thanh toán:<span> </span>
                  {depositAmount ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(depositAmount) : '0 ₫'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography sx={{ fontSize: '18px', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                  • Chưa thanh toán:<span> </span>
                  {remainingCost ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(remainingCost) : '0 ₫'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </CardWrapper>
  );
}

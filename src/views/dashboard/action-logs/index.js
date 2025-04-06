import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MainCard from 'ui-component/cards/MainCard';
import CommentIcon from '@mui/icons-material/Comment';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider, Box } from '@mui/material';

import { getCreatedAt, apiGet } from '../../../utils/formatUtils';

const LIST_ACTION_LOGS = `${process.env.REACT_APP_API_URL}/action-logs`;

export default function ListActionLogs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadListActionLogs();
  }, []);

  const loadListActionLogs = async () => {
    try {
      const result = await apiGet(`${LIST_ACTION_LOGS}`);
      if (result.data.data.length > 0) {
        setData(result.data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const renderListItemText = (item) => {
    const text = `${getCreatedAt(item.createdAt)}: Tài khoản ${item.user_id.display_name} ${item.action} ${item.object}`;
    if (item.link) {
      return (
        <Link to={`${item.link}`}>
          <ListItemText primary={text} />
        </Link>
      );
    }
    return <ListItemText primary={text} />;
  };

  return (
    <MainCard title="Lịch sử thao tác" sx={{ mb: 2 }}>
      <Box sx={{ maxHeight: 250, overflow: 'auto' }}>
        <List sx={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem component="div" disablePadding>
                <ListItemButton sx={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                  <ListItemIcon sx={{ color: 'inherit', pr: 0 }}>
                    <CommentIcon />
                  </ListItemIcon>
                  {renderListItemText(item)}
                </ListItemButton>
              </ListItem>
              {index < data.length - 1 && <Divider sx={{ margin: '8px 0' }} />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </MainCard>
  );
}

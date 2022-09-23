import { Add, DevicesOther } from '@mui/icons-material';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';

const GatewaySkeleton = () => {
  const [devices] = useState([1, 2, 3]);
  return (
    <>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center">
        <Stack width="25%">
          <Typography variant="h3">
            <Skeleton width="" />
          </Typography>
          <Typography variant="caption">
            <Skeleton />
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rounded" width="95px" height="38px" />
          <Skeleton variant="rounded" width="70px" height="38px" />
          <Skeleton variant="rounded" width="85px" height="38px" />
        </Stack>
      </Stack>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        subheader={
          <ListSubheader>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Devices</Typography>
              <IconButton disabled>
                <Add />
              </IconButton>
            </Stack>
          </ListSubheader>
        }
      >
        {devices.map((i) => (
          <ListItem key={`device-${i}`}>
            <ListItemIcon>
              <DevicesOther />
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" primary={<Skeleton width="40%" />} secondary={<Skeleton width="25%" />} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GatewaySkeleton;

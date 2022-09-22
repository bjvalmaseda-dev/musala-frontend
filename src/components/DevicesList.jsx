import useApi from '@hooks/useApi';
import { Add, Delete, DevicesOther } from '@mui/icons-material';
import { FormControlLabel, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Stack, Switch, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddDeviceModal from '../containers/AddDeviceModal';
import FormDevices from '../containers/AddDeviceModal';

const DevicesList = (props) => {
  const { devices = [], updateData } = props;
  const [openAdd, setOpenAdd] = useState(false);
  const { deleteDevice, updateDevice } = useApi();

  const handleDelete = async (uid) => {
    await deleteDevice(uid);
    await updateData();
  };

  const handleActivate = async (status, uid) => {
    const newStatus = !status;
    const data = {
      status: newStatus,
    };
    console.log(data);
    await updateDevice(uid, data);
    await updateData();
  };

  const handleAdd = () => {
    setOpenAdd(true);
  };

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={
        <ListSubheader>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Devices</Typography>
            <IconButton disabled={devices.length >= 10} onClick={handleAdd}>
              <Add />
            </IconButton>
          </Stack>
        </ListSubheader>
      }
    >
      {devices?.map((device) => (
        <ListItem key={device.uid}>
          <ListItemIcon>
            <DevicesOther />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary={device.vendor} secondary={device.dateCreated} />
          <FormControlLabel control={<Switch checked={device.status} onChange={() => handleActivate(device.status, device.uid)} />} label="Active" />
          <IconButton onClick={() => handleDelete(device.uid)}>
            <Delete />
          </IconButton>
        </ListItem>
      ))}
      <FormDevices />
      <AddDeviceModal open={openAdd} setOpen={setOpenAdd} updateData={updateData} />
    </List>
  );
};

export default DevicesList;

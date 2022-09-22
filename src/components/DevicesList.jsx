import useApi from '@hooks/useApi';
import useToast from '@hooks/useToast';
import { Add, Delete, DevicesOther } from '@mui/icons-material';
import { FormControlLabel, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Stack, Switch, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddDeviceModal from '../containers/AddDeviceModal';
import FormDevices from '../containers/AddDeviceModal';

const DevicesList = (props) => {
  const { devices, updateData } = props;
  const [openAdd, setOpenAdd] = useState(false);
  const { loading, deleteDevice, updateDevice } = useApi();
  const toast = useToast();

  const handleDelete = async (uid) => {
    await deleteDevice(uid);
    await updateData();
    toast({ message: 'Device deleted correctly', severity: 'success' });
  };

  const handleActivate = async (status, uid) => {
    const newStatus = !status;
    const data = {
      status: newStatus,
    };
    const response = await updateDevice(uid, data);
    await updateData();
    const message = `The status is changed to ${response.status ? 'Active' : 'Inactive'}`;
    toast({ message, severity: 'success' });
  };

  const handleAdd = () => {
    setOpenAdd(true);
  };

  return (
    <>
      {loading ? null : (
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          subheader={
            <ListSubheader>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Devices</Typography>
                <IconButton disabled={devices?.length >= 10} onClick={handleAdd}>
                  <Add />
                </IconButton>
              </Stack>
            </ListSubheader>
          }
        >
          {devices?.length > 0
            ? devices.map((device) => (
                <ListItem key={device.uid}>
                  <ListItemIcon>
                    <DevicesOther />
                  </ListItemIcon>
                  <ListItemText id="switch-list-label-wifi" primary={device.vendor} secondary={device.dateCreated} />
                  <FormControlLabel
                    control={<Switch disabled={loading} checked={device.status} onChange={() => handleActivate(device.status, device.uid)} />}
                    label="Active"
                  />
                  <IconButton onClick={() => handleDelete(device.uid)} disabled={loading}>
                    <Delete />
                  </IconButton>
                </ListItem>
              ))
            : null}
          <FormDevices />
          <AddDeviceModal open={openAdd || false} setOpen={setOpenAdd} updateData={updateData} />
        </List>
      )}
    </>
  );
};

export default DevicesList;

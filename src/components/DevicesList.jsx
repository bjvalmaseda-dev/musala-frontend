import useApi from '@hooks/useApi';
import useToast from '@hooks/useToast';
import { Add, Delete, DevicesOther } from '@mui/icons-material';
import { FormControlLabel, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Stack, Switch, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddDeviceModal from '../containers/AddDeviceModal';
import FormDevices from '../containers/AddDeviceModal';

const DevicesList = (props) => {
  const { vendors } = props;
  const [devices, setDevices] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const { loading, deleteDevice, updateDevice } = useApi();
  const toast = useToast();

  const handleAdd = () => {
    setOpenAdd(true);
  };

  useEffect(() => {
    setDevices(vendors);
  }, [vendors]);

  const handleDelete = async (uid) => {
    try {
      const response = await deleteDevice(uid);
      if (response.status === 200) {
        const updated = devices.filter((item) => item.uid != uid);
        setDevices(updated);
        toast({ message: 'Device deleted correctly', severity: 'success' });
      }
    } catch (e) {
      return null;
    }
  };

  const handleActivate = async (status, uid) => {
    const newStatus = !status;
    const data = {
      status: newStatus,
    };
    try {
      const response = await updateDevice(uid, data);
      if (response.status === 200) {
        const newDevices = devices.map((item) => {
          if (item.uid === uid) return { ...item, status: newStatus };
          return item;
        });
        setDevices(newDevices);
        const message = `The status is changed to ${newStatus ? 'Active' : 'Inactive'}`;
        toast({ message, severity: 'success' });
      }
    } catch (e) {
      return null;
    }
  };

  return (
    <>
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
        <AddDeviceModal open={openAdd} setOpen={setOpenAdd} setDevices={setDevices} devices={devices} />
      </List>
    </>
  );
};

export default DevicesList;

import { Delete } from '@mui/icons-material';
import { FormControlLabel, IconButton, Switch, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const AddDeviceForm = (props) => {
  const { register, index, remove } = props;
  const handleRemove = () => {
    remove(index);
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <TextField label="Vendor" variant="outlined" {...register(`devices.${index}.vendor`)}></TextField>
      <FormControlLabel control={<Switch defaultChecked {...register(`devices.${index}.status`)} label="Active" />} />
      <IconButton onClick={handleRemove}>
        <Delete />
      </IconButton>
    </Stack>
  );
};

export default AddDeviceForm;

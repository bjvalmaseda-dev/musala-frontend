import BasicModal from '@components/BasicModal';
import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import useApi from '@hooks/useApi';
import { useRouter } from 'next/router';
import { ToastContext } from 'contexts/ToastContext';

const AddDeviceModal = (props) => {
  const { setOpen, open, updateData } = props;
  const { toast } = useContext(ToastContext);
  const {
    query: { id },
  } = useRouter();
  const { addDevice } = useApi();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await addDevice({ ...data, gatewayId: id });
    await updateData();
    resetForm();
    toast({ open: true, message: 'Device added correctly' });
  };

  const resetForm = () => {
    reset();
    setOpen(false);
  };

  return (
    <BasicModal open={open} title="New Device" setOpen={setOpen}>
      <Box marginTop={2}>
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="row" justifyContent="space-between">
            <TextField
              label="Vendor"
              variant="standard"
              {...register('vendor', {
                required: {
                  value: true,
                  message: 'The vendor name is required',
                },
              })}
              error={errors.vendor != null}
              helperText={errors.vendor ? errors.vendor.message : ''}
            ></TextField>
            <FormControlLabel control={<Switch defaultChecked {...register('status')} />} label="Active" />
          </Stack>
          <Stack width="100%" direction="row" marginTop={2} justifyContent="end" spacing={2}>
            <Button variant="outlined" color="error" onClick={resetForm}>
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit">
              Add
            </Button>
          </Stack>
        </form>
      </Box>
    </BasicModal>
  );
};

export default AddDeviceModal;

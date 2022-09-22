import BasicModal from '@components/BasicModal';
import { Button, FormLabel, IconButton, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import validations from '@utils/validations';
import useApi from '@hooks/useApi';
import AddDeviceForm from '@components/AddDeviceForm';
import { Add } from '@mui/icons-material';

const AddGatewaysForm = (props) => {
  const { setOpen, fetchGateways } = props;
  const { addGateway } = useApi();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'devices',
  });

  const watchFieldArray = watch('devices');

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const handleAddDevice = () => {
    append({
      vendor: '',
      status: true,
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
    await addGateway(data);
    fetchGateways();
    resetForm();
  };

  const resetForm = () => {
    reset();
    setOpen(false);
  };

  return (
    <BasicModal open={props.open} title="New Gateway" setOpen={props.setOpen}>
      <Box marginTop={2}>
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2}>
            <TextField
              error={errors.name ? true : false}
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              {...register('name', { required: true })}
            />
            <TextField
              error={errors.ip ? true : false}
              label="Ip(v4)"
              variant="outlined"
              fullWidth
              name="ip"
              placeholder="xxx.xxx.xxx.xxx"
              helperText={errors.ip?.message}
              {...register('ip', {
                required: true,
                pattern: {
                  value: validations.ipv4,
                  message: 'Entered a valid ip(v4) address',
                },
              })}
            />
          </Stack>
          <Box marginTop={2}>
            <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
              <FormLabel component="legend">Devices</FormLabel>
              <IconButton aria-label="delete" onClick={handleAddDevice} disabled={fields.length >= 10}>
                <Add />
              </IconButton>
            </Stack>
            <Stack direction="column" spacing={2}>
              {controlledFields.map((field, index) => (
                <AddDeviceForm register={register} key={`device-${index}`} index={index} remove={remove} control={control} />
              ))}
            </Stack>
          </Box>
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

export default AddGatewaysForm;

import BasicModal from '@components/BasicModal';
import { Button, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import validations from '@utils/validations';
import useApi from '@hooks/useApi';

const AddGatewaysForm = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { addGateway } = useApi();

  const { setOpen, fetchGateways } = props;

  const onSubmit = async (data) => {
    const response = await addGateway(data);
    fetchGateways();
    resetForm();
  };

  const resetForm = () => {
    reset({ name: '', ip: '' });
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

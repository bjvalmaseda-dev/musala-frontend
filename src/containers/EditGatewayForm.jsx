import useApi from '@hooks/useApi';
import useToast from '@hooks/useToast';
import { LoadingButton } from '@mui/lab';
import { Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import validations from '@utils/validations';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

const EditGatewayForm = (props) => {
  const { gateway, setIsEditing, setGateway } = props;
  const toast = useToast();
  const { updateGateway } = useApi();
  const {
    query: { id },
  } = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitEdit = async (data) => {
    try {
      const response = await updateGateway(id, data);
      if (response.status === 200) {
        reset();
        setGateway(response.data);
        setIsEditing(false);
        toast({ message: 'Change saved correctly', severity: 'success' });
      }
    } catch (e) {
      return null;
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitEdit)}>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={1}>
          <TextField
            defaultValue={gateway.name}
            variant="standard"
            size="medium"
            disabled={false}
            name="name"
            {...register('name', { required: true })}
            error={errors.name ? true : false}
          />
          <TextField
            defaultValue={gateway.ip}
            variant="standard"
            size="small"
            disabled={false}
            name="ip"
            placeholder="xxx.xxx.xxx.xxx"
            helperText={errors.ip?.message}
            error={errors.ip ? true : false}
            {...register('ip', {
              required: true,
              pattern: {
                value: validations.ipv4,
                message: 'Entered a valid ip(v4) address',
              },
            })}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="error" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <LoadingButton loading={false} variant="contained" color="success" type="submit">
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default EditGatewayForm;

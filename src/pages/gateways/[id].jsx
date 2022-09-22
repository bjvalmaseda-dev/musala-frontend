import DevicesList from '@components/DevicesList';
import GatewaySkeleton from '@components/GatewaySkeleton';
import useApi from '@hooks/useApi';
import useToast from '@hooks/useToast';
import { LoadingButton } from '@mui/lab';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import validations from '@utils/validations';
import DeleteDialog from 'containers/DeleteDialog';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Gateway() {
  const [gateway, setGateway] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { loading, updateGateway, getGateway, deleteGateway } = useApi();
  const [openDelete, setOpenDelete] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const {
    query: { id },
  } = router;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const destroy = async () => {
    await deleteGateway(id);
    await router.push('/');
    toast({ message: 'Gateway deleted', severity: 'success' });
  };

  const onSubmitEdit = async (data) => {
    await updateGateway(id, data);
    reset();
    await fetchData();
    setIsEditing(false);
    toast({ message: 'Change saved correctly', severity: 'success' });
  };

  const fetchData = async () => {
    const response = await getGateway(id);
    setGateway(response);
  };

  useEffect(() => {
    (async () => {
      if (id) {
        await fetchData();
      }
    })();
  }, [id]);

  return (
    <Container>
      <Paper sx={{ m: 2, p: 1 }}>
        {loading ? (
          <GatewaySkeleton />
        ) : (
          <>
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmitEdit)}>
                <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center">
                  <Stack spacing={1}>
                    <TextField
                      defaultValue={gateway.name}
                      variant="standard"
                      size="medium"
                      disabled={loading}
                      name="name"
                      {...register('name', { required: true })}
                      error={errors.name ? true : false}
                    />
                    <TextField
                      defaultValue={gateway.ip}
                      variant="standard"
                      size="small"
                      disabled={loading}
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
                    <LoadingButton loading={loading} variant="contained" color="success" type="submit">
                      Save
                    </LoadingButton>
                  </Stack>
                </Stack>
              </form>
            ) : (
              <>
                <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center">
                  <Stack>
                    <Typography variant="h4">{gateway.name}</Typography>
                    <Typography variant="caption">{gateway.ip}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Link href="/">
                      <Button variant="contained" color="info">
                        Back to List
                      </Button>
                    </Link>
                    <Button variant="contained" color="warning" onClick={handleEdit}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                      Delete
                    </Button>
                  </Stack>
                </Stack>
                <DevicesList devices={gateway.devices} updateData={fetchData} />
              </>
            )}
          </>
        )}
      </Paper>
      <DeleteDialog open={openDelete || false} setOpen={setOpenDelete} action={destroy} />
    </Container>
  );
}

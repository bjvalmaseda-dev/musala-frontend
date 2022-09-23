/* eslint-disable react-hooks/rules-of-hooks */
import DevicesList from '@components/DevicesList';
import EditGatewayForm from '@containers/EditGatewayForm';
import useApi from '@hooks/useApi';
import useToast from '@hooks/useToast';
import { Button, Paper, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import DeleteDialog from 'containers/DeleteDialog';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { gateway as gatewayApi } from '@services/gateways';
import axios from 'axios';

export default function Gateway({ data }) {
  const [gateway, setGateway] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const { deleteGateway } = useApi();
  const [openDelete, setOpenDelete] = useState(false);
  const toast = useToast();

  const router = useRouter();
  const {
    query: { id },
  } = router;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const destroy = async () => {
    await deleteGateway(id);
    await router.push('/');
    toast({ message: 'Gateway deleted', severity: 'success' });
  };

  return (
    <Container>
      <Paper sx={{ m: 2, p: 1 }}>
        {isEditing ? (
          <EditGatewayForm gateway={gateway} setIsEditing={setIsEditing} setGateway={setGateway} />
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
          </>
        )}
        <DevicesList vendors={gateway.devices} />
      </Paper>
      <DeleteDialog open={openDelete || false} setOpen={setOpenDelete} action={destroy} />
    </Container>
  );
}

export async function getServerSideProps({ params: { id } }) {
  try {
    const response = await axios.get(gatewayApi.GET_GATEWAY(id));
    const data = response.data;
    return {
      props: { data },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

/* eslint-disable react-hooks/exhaustive-deps */
import useApi from '@hooks/useApi';
import useToast from '@hooks/useToast';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import AddGatewaysForm from '@containers/AddGatewaysForm';
import DeleteDialog from '@containers/DeleteDialog';
import { GlobalContext } from '@contexts/GlobalContext';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import GatewaysListSkeleton from '@components/GatewaysListSkeleton';

export default function Home() {
  const { getGateways, deleteGateway } = useApi();
  const [loading, setLoading] = useState(true);
  const { state, setGateways } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const toast = useToast();
  const fetchGateways = async () => {
    const gateways = await getGateways();
    setGateways(gateways);
  };

  const handleModal = () => {
    setOpen(true);
  };

  const handleDelete = (gateway) => {
    setToDelete(gateway);
    setOpenDelete(true);
  };

  const deleteAction = async () => {
    await deleteGateway(toDelete.id);
    toast({ message: 'Gateway deleted', severity: 'success' });
    fetchGateways();
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      await fetchGateways();
    })();
    setLoading(false);
  }, []);

  return (
    <>
      <Stack direction="row" sx={{ justifyContent: 'end', margin: '20px' }} width="100%">
        <Button variant="contained" onClick={handleModal} color="success">
          Add Gateway
        </Button>
      </Stack>
      <AddGatewaysForm open={open} setOpen={setOpen} fetchGateways={fetchGateways} />
      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Ip(v4)</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              state.gateways ? (
                state.gateways.map((gateway) => (
                  <TableRow key={`gateway-${gateway.id}`}>
                    <TableCell component="th" scope="row">
                      {gateway.id}
                    </TableCell>
                    <TableCell align="left">{gateway.name}</TableCell>
                    <TableCell align="left">{gateway.ip}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} sx={{ justifyContent: 'end' }}>
                        <Link href={`/gateways/${gateway.id}`} passHref>
                          <Button variant="contained">Details</Button>
                        </Link>
                        <Button variant="contained" color="error" onClick={() => handleDelete(gateway)}>
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    <Stack alignItems="center">
                      <Typography variant="h6" color="error">
                        No devices
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            ) : (
              <GatewaysListSkeleton />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog open={openDelete} setOpen={setOpenDelete} action={deleteAction} />
    </>
  );
}

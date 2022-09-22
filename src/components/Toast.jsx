import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { ToastContext } from '@contexts/ToastContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast() {
  const { state, closeToast } = useContext(ToastContext);

  const { open, message, duration, severity } = state;

  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={closeToast}>
      <Alert onClose={closeToast} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

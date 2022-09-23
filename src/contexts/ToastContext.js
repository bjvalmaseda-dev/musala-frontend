import React, { createContext, useState } from 'react';

const initial = {
  open: false,
  duration: 3000,
  message: '',
  severity: 'info',
};

export const ToastContext = createContext();

const useInitial = () => {
  const [state, setState] = useState(initial);
  const toast = (payload) => {
    setState({ ...state, open: true, ...payload });
  };
  const closeToast = () => {
    setState({ ...state, open: false });
  };
  return { state, toast, closeToast };
};

const ToastContextProvider = ({ children }) => {
  const value = useInitial();

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export default ToastContextProvider;

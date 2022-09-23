import { ToastContext } from './../contexts/ToastContext';
import { useContext } from 'react';

const useToast = () => {
  const { toast } = useContext(ToastContext);

  return toast;
};

export default useToast;

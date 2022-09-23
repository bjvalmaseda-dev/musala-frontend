import { gateway, devices } from '@services/gateways';
import axios from 'axios';
import useToast from './useToast';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const useApi = () => {
  const toast = useToast();

  const getGateways = async () => {
    try {
      const response = await axios.get(gateway.GET_GATEWAYS);
      return response.data;
    } catch (e) {
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  const getGateway = async (id) => {
    try {
      const response = await axios.get(gateway.GET_GATEWAY(id));
      return response.data;
    } catch (e) {
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  const addGateway = async (data) => {
    try {
      const response = await axios.post(gateway.ADD_GATEWAY, data, options);
      return response.data;
    } catch (e) {
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  const updateGateway = async (id, data) => {
    try {
      const response = await axios.patch(gateway.UPDATE_GATEWAY(id), data, options);
      return response;
    } catch (e) {
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  const deleteGateway = async (id) => {
    try {
      const response = await axios.delete(gateway.DELETE_GATEWAY(id), options);
      return response.data;
    } catch (e) {
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  //devices
  const addDevice = async (data) => {
    try {
      const response = await axios.post(devices.ADD_DEVICE, data, options);
      return response;
    } catch (e) {
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };
  const deleteDevice = async (id) => {
    try {
      const response = await axios.delete(devices.DELETE_DEVICE(id), options);
      return response;
    } catch (e) {
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  const updateDevice = async (id, data) => {
    try {
      const response = await axios.patch(devices.UPDATE_DEVICE(id), data, options);
      return response;
    } catch (e) {
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  return { getGateways, getGateway, addGateway, updateGateway, deleteGateway, addDevice, deleteDevice, updateDevice };
};

export default useApi;

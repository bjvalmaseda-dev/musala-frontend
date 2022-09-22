import { useState } from 'react';
import { gateway, devices } from '@services/gateways';
import axios from 'axios';
import useToast from './useToast';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const getGateways = async () => {
    try {
      setLoading(true);
      const response = await axios.get(gateway.GET_GATEWAYS);
      setLoading(false);
      return response.data;
    } catch (e) {
      setLoading(false);
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  const getGateway = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(gateway.GET_GATEWAY(id));
      setLoading(false);
      return response.data;
    } catch (e) {
      setLoading(false);
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  const addGateway = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(gateway.ADD_GATEWAY, data, options);
      setLoading(false);
      return response.data;
    } catch (e) {
      setLoading(false);
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  const updateGateway = async (id, data) => {
    try {
      setLoading(true);
      const response = await axios.patch(gateway.UPDATE_GATEWAY(id), data, options);
      setLoading(false);
      return response.data;
    } catch (e) {
      setLoading(false);
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  const deleteGateway = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(gateway.DELETE_GATEWAY(id), options);
      setLoading(false);
      return response.data;
    } catch (e) {
      setLoading(false);
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  //devices
  const addDevice = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(devices.ADD_DEVICE, data, options);
      setLoading(false);
      return response.data;
    } catch (e) {
      setLoading(false);
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };
  const deleteDevice = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(devices.DELETE_DEVICE(id), options);
      setLoading(false);
      return response.data;
    } catch (e) {
      setLoading(false);
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  const updateDevice = async (id, data) => {
    try {
      setLoading(true);
      const response = await axios.patch(devices.UPDATE_DEVICE(id), data, options);
      setLoading(false);
      return response.data;
    } catch (e) {
      setLoading(false);
      toast({ open: true, message: e.message, severity: 'error' });
    }
  };

  return { loading, getGateways, getGateway, addGateway, updateGateway, deleteGateway, addDevice, deleteDevice, updateDevice };
};

export default useApi;

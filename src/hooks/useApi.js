import {} from 'react';
import { gateway, devices } from '@services/gateways';
import axios from 'axios';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const useApi = () => {
  const getGateways = async () => {
    const response = await axios.get(gateway.GET_GATEWAYS);
    return response.data;
  };

  const getGateway = async (id) => {
    const response = await axios.get(gateway.GET_GATEWAY(id));
    return response.data;
  };

  const addGateway = async (data) => {
    const response = await axios.post(gateway.ADD_GATEWAY, data, options);
    return response.data;
  };

  const updateGateway = async (id, data) => {
    const response = await axios.patch(gateway.UPDATE_GATEWAY(id), data, options);
    return response.data;
  };

  const deleteGateway = async (id) => {
    const response = await axios.delete(gateway.DELETE_GATEWAY(id), options);
    return response.data;
  };

  //devices
  const addDevice = async (data) => {
    const response = await axios.post(devices.ADD_DEVICE, data, options);
    return response.data;
  };
  const deleteDevice = async (id) => {
    const response = await axios.delete(devices.DELETE_DEVICE(id), options);
    return response.data;
  };

  const updateDevice = async (id, data) => {
    const response = await axios.patch(devices.UPDATE_DEVICE(id), data, options);
    return response.data;
  };

  return { getGateways, getGateway, addGateway, updateGateway, deleteGateway, addDevice, deleteDevice, updateDevice };
};

export default useApi;

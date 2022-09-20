import {} from 'react';
import { gateway } from '@services/gateways';
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

  const addGateway = async (data) => {
    const response = await axios.post(gateway.ADD_GATEWAY, data, options);
    return response.data;
  };

  const deleteGateway = async (id) => {
    const response = await axios.delete(gateway.DELETE_GATEWAY(id), options);
    return response.data;
  };

  return { getGateways, addGateway, deleteGateway };
};

export default useApi;

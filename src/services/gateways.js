const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const gateway = {
  GET_GATEWAYS: `${API_URL}gateways`,
  GET_GATEWAY: (id) => `${API_URL}gateways/${id}`,
  ADD_GATEWAY: `${API_URL}gateways`,
  UPDATE_GATEWAY: (id) => `${API_URL}gateways/${id}`,
  DELETE_GATEWAY: (id) => `${API_URL}gateways/${id}`,
};

export const devices = {
  ADD_DEVICE: `${API_URL}devices/`,
  DELETE_DEVICE: (uid) => `${API_URL}devices/${uid}`,
  UPDATE_DEVICE: (id) => `${API_URL}devices/${id}`,
};

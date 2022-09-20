const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const gateway = {
  GET_GATEWAYS: `${API_URL}gateways`,
  ADD_GATEWAY: `${API_URL}gateways`,
  DELETE_GATEWAY: (id) => `${API_URL}gateways/${id}`,
};

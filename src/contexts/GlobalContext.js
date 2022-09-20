import { createContext, useState } from 'react';

const initialState = {
  gateways: [],
};

export const GlobalContext = createContext();

export const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const setGateways = (payload) => {
    setState({ ...state, gateways: payload });
  };

  return {
    state,
    setGateways,
  };
};

const GlobalContextProvider = ({ children }) => {
  const value = useInitialState();
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export default GlobalContextProvider;

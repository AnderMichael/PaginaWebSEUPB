"use client";
import { createContext, useContext, useReducer } from "react";
import { initalValues, storeReducer } from "./storeReducer";

export const StoreContext = createContext({});

interface Props {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: Props) => {
  return (
    <StoreContext.Provider value={useReducer(storeReducer, initalValues)}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext<any>(StoreContext)[0];
};

export const useDispatch = () => useContext<any>(StoreContext)[1];

export default StoreProvider;

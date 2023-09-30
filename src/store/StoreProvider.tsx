"use client";
import { createContext, useState } from "react";

export const StoreContext = createContext({});

interface Props {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: Props) => {
  const [sideBarOpened, setSideBarOpened] = useState<boolean>(false);
  const [textHeader, setTextHeader] = useState<string>("Menu del Día");

  return (
    <StoreContext.Provider
      value={{
        sideBarOpened,
        setSideBarOpened,
        textHeader,
        setTextHeader,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// export const useStore = () => {
//   return useContext<any>(StoreContext)[0];
// };

// export const useDispatch = () => useContext<any>(StoreContext)[1];

export default StoreProvider;

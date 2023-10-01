"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const StoreContext = createContext({});

interface Props {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: Props) => {
  const [sideBarOpened, setSideBarOpened] = useState<boolean>(false);
  const [textHeader, setTextHeader] = useState<string>("Menu del Día");

  const [widthScreen, setWidthScreen] = useState<number>(0);
  const [heightScreen, setHeightScreen] = useState<number>(0);

  const handleResize = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setWidthScreen(window.innerWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setHeightScreen(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth, window.innerHeight]);

  // useReducer(storeReducer, initalValues)
  return (
    <StoreContext.Provider
      value={{
        sideBarOpened,
        setSideBarOpened,
        textHeader,
        setTextHeader,
        widthScreen,
        setWidthScreen,
        heightScreen,
        setHeightScreen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext<any>(StoreContext)[0];
};

export const useDispatch = () => useContext<any>(StoreContext)[1];

export default StoreProvider;

"use client";
import { PlatesTypes } from "@/app/home/cafeteria/menu/types/platesType";
import { createContext, useContext, useEffect, useState } from "react";

export const StoreContext = createContext({});

interface Props {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: Props) => {
  const [sideBarOpened, setSideBarOpened] = useState<boolean>(false);
  const [textHeader, setTextHeader] = useState<string>("Cafeteria");

  const [widthScreen, setWidthScreen] = useState<number>(0);
  const [heightScreen, setHeightScreen] = useState<number>(0);
  const [menuPageHeight, setMenuPageHeight] = useState<number>(0);

  const [dataPlateToReserve, setDataPlateToReserve] = useState<PlatesTypes>({
    id: "",
    plateName: "",
    platePrice: 0,
    plateAvailable: false,
    plateDescription: "",
    plateImage: "",
  });

  const handleResize = () => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setWidthScreen(window.innerWidth);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setHeightScreen(window.innerHeight);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      window.addEventListener("resize", handleResize);
    }
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    typeof window !== "undefined" ? window.innerWidth : widthScreen,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    typeof window !== "undefined" ? window.innerHeight : heightScreen,
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setWidthScreen(window.innerWidth);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setHeightScreen(window.innerHeight);
    }
  }, []);

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
        dataPlateToReserve,
        setDataPlateToReserve,
        menuPageHeight,
        setMenuPageHeight,
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

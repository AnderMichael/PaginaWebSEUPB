"use client";
import { PlatesTypes } from "@/app/home/cafeteria/menu/types/platesType";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { json } from "stream/consumers";

export const StoreContext = createContext({});

interface Props {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: Props) => {
  const pathname = usePathname();

  const [sideBarOpened, setSideBarOpened] = useState<boolean>(false);
  const [textHeader, setTextHeader] = useState<string>("");

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
    plateQuantity: 0,
  });

  const [generalLoading, setGeneralLoading] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<boolean>(false);

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

      if (!pathname.includes("cafeteria")) {
        setTextHeader(
          localStorage.getItem("headerTitle")
            ? JSON.parse(localStorage.getItem("headerTitle") || "{}")
                .headerTitle
            : ""
        );
      } else {
        setTextHeader("cafeteria");
      }
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
        generalLoading,
        setGeneralLoading,
        generalError,
        setGeneralError,
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

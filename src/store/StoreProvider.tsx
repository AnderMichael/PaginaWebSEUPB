"use client";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { PlatesTypes } from "../app/(routes)/home/cafeteria/menu/types/platesType";

export const StoreContext = createContext({});

interface Props {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: Props) => {
  const [authNormal, setAuthNormal] = useState<boolean>(false);
  const [authAdmin, setAuthAdmin] = useState<boolean>(false);

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

  const [platesData, setPlatesData] = useState<PlatesTypes[]>([]);

  const [generalLoading, setGeneralLoading] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<boolean>(false);

  const [orderMade, setOrderMade] = useState<boolean>(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useReducer(storeReducer, initalValues)
  return (
    <StoreContext.Provider
      value={{
        authNormal,
        setAuthNormal,
        authAdmin,
        setAuthAdmin,
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
        platesData,
        setPlatesData,
        menuPageHeight,
        setMenuPageHeight,
        generalLoading,
        setGeneralLoading,
        generalError,
        setGeneralError,
        orderMade,
        setOrderMade,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

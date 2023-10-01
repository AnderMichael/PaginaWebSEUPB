import React, { useContext, useEffect } from "react";
import { ListPlatesCards } from "./components/ListPlatesCards";
import { StoreContext } from "@/store/StoreProvider";

export const MenuPage = () => {
  const context: any = useContext(StoreContext);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      context.setWidthScreen(window.innerWidth);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      context.setHeightScreen(window.innerHeight);
      context.setMenuPageHeight(window.innerHeight - 80 || 400);
    }
  }, []);
  return (
    <main
      className={`absolute right-0 flex flex-row justify-center h-[${context.menuPageHeight}px]`}
    >
      <ListPlatesCards />
    </main>
  );
};

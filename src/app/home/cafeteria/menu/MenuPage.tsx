"use client";
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
    <main className={`flex absolute inset-0`}>
      <section className="w-full flex flex-col justify-center items-center">
        <div className="flex h-[60px] bg-[#4752B7] items-center max-[541px]:justify-center px-7 ">
          <h1 className="text-white text-4xl font-bold">Cafeteria</h1>
        </div>
        <ListPlatesCards />
      </section>
    </main>
  );
};

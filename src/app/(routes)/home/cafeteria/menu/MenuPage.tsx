"use client";
import React, { useContext, useEffect, useState } from "react";
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={`flex absolute inset-0`}>
      <section className="w-full flex flex-col justify-center items-center">
        <div
          className="flex h-[60px] mb-[24px] bg-transparent items-center max-[541px]:justify-center
        sticky px-7 top-0"
        >
          <h1 className="text-transparent text-4xl font-bold">Cafeteria</h1>
        </div>
        <ListPlatesCards />
      </section>
    </main>
  );
};

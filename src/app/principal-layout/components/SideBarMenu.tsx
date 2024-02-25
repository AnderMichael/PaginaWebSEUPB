"use client";
import React, { useContext } from "react";
import { ListOptionsSideBar } from "./ListOptionsSideBar";
import { StoreContext } from "@/store/StoreProvider";

export const SideBarMenu = () => {
  const context: any = useContext(StoreContext);
  return (
    <div
      className={`w-[200px] bg-secondary-one fixed h-full z-40 ease-linear
  duration-300 bg-[#fdd095] ${
    context.sideBarOpened ? "translate-x-0" : "-translate-x-60"
  }
  `}
    >
      <ListOptionsSideBar />
    </div>
  );
};

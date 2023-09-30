"use client";
import React, { useContext } from "react";
import ListOptionsSideBar from "./ListOptionsSideBar";
import { StoreContext } from "@/store/StoreProvider";
import "@/app/globals.css";

const SideBarMenu = () => {
  const context: any = useContext(StoreContext);
  // console.log(context.sideBarOpened);
  // ${context.sideBarOpened ? "translate-x-0" : "-translate-x-60"}
  return (
    <div
      className={`w-[200px] bg-secondary-one fixed h-full z-40 ease-linear
      duration-300 bg-[#6F6FC8] -translate-x-60
      `}
    >
      <ListOptionsSideBar />
    </div>
  );
};

export { SideBarMenu };

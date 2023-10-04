"use client";
import React from "react";
import { HeaderMenu } from "./components/HeaderMenu";
import { SideBarMenu } from "./components/SideBarMenu";
import { MenuPage } from "../cafeteria/menu/MenuPage";

export const PrincipalLayout = () => {
  return (
    <>
      <div className="flex flex-col bg-slate-50 h-max w-full font-google-font-one">
        <HeaderMenu />
        <div className={`flex flex-row justify-start`}>
          <SideBarMenu />
          <MenuPage />
          {/* <Outlet /> */}
        </div>
      </div>
    </>
  );
};

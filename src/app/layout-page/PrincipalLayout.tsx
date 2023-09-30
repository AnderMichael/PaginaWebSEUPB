"use client";
import React from "react";
import HeaderMenu from "@/app-components/HeaderMenu";
import { SideBarMenu } from "@/app-components/SideBarMenu";
import { Outlet } from "react-router-dom";

const PrincipalLayout = () => {
  return (
    <div className="flex flex-col bg-slate-50 h-full w-full">
      <HeaderMenu />
      <div className="flex flex-row justify-start">
        <SideBarMenu />
        <Outlet />
      </div>
    </div>
  );
};

export default PrincipalLayout;

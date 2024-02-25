"use client";
import React from "react";
import { HeaderMenu } from "./components/HeaderMenu";
import { SideBarMenu } from "./components/SideBarMenu";

export const PrincipalLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="flex flex-col bg-slate-50 h-max w-full font-cabin">
        <HeaderMenu />
        <div className={`flex flex-row justify-start`}>
          <SideBarMenu />
          {children}
        </div>
      </div>
    </>
  );
};

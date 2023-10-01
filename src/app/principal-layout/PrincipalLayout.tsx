"use client";
import React from "react";
import { HeaderMenu } from "./components/HeaderMenu";
import { SideBarMenu } from "./components/SideBarMenu";
import { Outlet } from "react-router-dom";

export const PrincipalLayout = () => {
  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Bruno+Ace&family=Jost&display=swap")
        .Jost-Font {
          font-family: "Jost", sans-serif;
        }
      `}</style>
      <div className="flex flex-col bg-slate-50 h-full w-full">
        <HeaderMenu />
        <div className="flex flex-row justify-start">
          <SideBarMenu />
          <Outlet />
        </div>
      </div>
    </>
  );
};

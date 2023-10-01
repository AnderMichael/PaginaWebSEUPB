"use client";
import React, { ReactElement } from "react";
import { HeaderMenu } from "./components/HeaderMenu";
import { SideBarMenu } from "./components/SideBarMenu";

export const PrincipalLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Bruno+Ace&family=Jost&display=swap")
        .Jost-Font {
          font-family: "Jost", sans-serif;
        }
      `}</style>
      <div className="flex flex-col bg-slate-50 h-max w-full">
        <HeaderMenu />
        <div className={`flex flex-row justify-start`}>
          <SideBarMenu />
          {children}
        </div>
      </div>
    </>
  );
};

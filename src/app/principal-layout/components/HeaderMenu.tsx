"use client";
import { StoreContext } from "@/store/StoreProvider";
import React, { useContext } from "react";
import { ShowOptionsPrincipalLayout } from "./ShowOptionsPrincipalLayout";
import { TitleMenu } from "./TitleMenu";

export const HeaderMenu = () => {
  const context: any = useContext(StoreContext);

  return (
    <div className="flex flex-row justify-start items-center z-10 bg-[#4752B7] h-20 w-full">
      <div className="flex justify-start items-center w-full h-20">
        {!context.sideBarOpened && <ShowOptionsPrincipalLayout />}
        <div
          className={`flex flex-row justify-start items-center w-[200px] h-20 mr-3 ease-linear
          duration-300 fixed ${
            context.sideBarOpened ? "translate-x-0" : "-translate-x-60"
          }`}
          style={{ backgroundColor: "#2C2C84" }}
        >
          <ShowOptionsPrincipalLayout />
          <TitleMenu id={"drawer-navigation-label"} titleText={"SEUPB"} />
        </div>
        <div
          className={`ease-linear duration-300 ${
            context.sideBarOpened ? "translate-x-60" : "translate-x-10"
          }`}
        >
          <TitleMenu id={""} titleText={context.textHeader} />
        </div>
      </div>
    </div>
  );
};

"use client";
import { StoreContext } from "@/store/StoreProvider";
import React, { useContext } from "react";
import ShowOptionsPrincipalLayout from "./ShowOptionsPrincipalLayout";
import TitleMenu from "./TitleMenu";
import "@/app/globals.css";

const HeaderMenu = () => {
  const context: any = useContext(StoreContext);

  return (
    <div className="flex flex-row justify-start items-center z-10 bg-[#4752B7] h-[200px] w-full">
      <div className="flex justify-start items-center w-full">
        {!context.sideBarOpened && <ShowOptionsPrincipalLayout />}
        {context.sideBarOpened && (
          <div
            className="flex flex-row justify-start items-center w-[200px] h-full mr-3"
            style={{ backgroundColor: "#2C2C84" }}
          >
            <ShowOptionsPrincipalLayout />
            <TitleMenu id={"drawer-navigation-label"} titleText={"SEUPB"} />
          </div>
        )}
        <TitleMenu id={""} titleText={context.textHeader} />
      </div>
    </div>
  );
};

export default HeaderMenu;

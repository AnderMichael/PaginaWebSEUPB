"use client";
import React, { ReactElement, useContext } from "react";
import { HeaderMenu } from "./components/HeaderMenu";
import { SideBarMenu } from "./components/SideBarMenu";
import { StoreContext } from "@/store/StoreProvider";
import ModalPage from "@/modals/ModalPage";
import ModalLoading from "@/modals/ModalLoading";
import ModalMessage from "@/modals/ModalMessage";

export const PrincipalLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context: any = useContext(StoreContext);
  return (
    <>
      {/* {(context.generalLoading || context.generalError) && (
        <ModalPage>
          <>
            {context.generalLoading && <ModalLoading />}
            {context.generalError !== null && (
              <ModalMessage
                title={"Error 404!"}
                message={`Ocurrió un error inesperado, recargue la páguina o inténtelo nuevamente`}
              />
            )}
          </>
        </ModalPage>
      )} */}
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

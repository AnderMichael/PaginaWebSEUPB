"use client";
import React, { useContext } from "react";
import { redirect } from "next/navigation";
import { StoreContext } from "../../../store/StoreProvider";

const GuardHome = ({ children }: { children: React.ReactNode }) => {
  const context:any = useContext(StoreContext);
  const {authNormal} = context;
  if(!authNormal){
    redirect('/');
  }
  return (
    <>
      {children}
    </>
  );
};

export default GuardHome;

"use client";
import React, { useContext } from "react";
import HomePage from "./HomePage";
import { PrincipalLayout } from "../../principal-layout/PrincipalLayout";
import { redirect } from "next/navigation";
import { StoreContext } from "../../../store/StoreProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  const context:any = useContext(StoreContext);
  const {authNormal} = context;
  if(!authNormal){
    redirect('/');
  }
  return (
    <>
      <PrincipalLayout>
        <HomePage>{children}</HomePage>
      </PrincipalLayout>
    </>
  );
};

export default layout;

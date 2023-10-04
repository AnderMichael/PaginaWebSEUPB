"use client";
import React from "react";
import { PrincipalLayout } from "../principal-layout/PrincipalLayout";
import HomePage from "./HomePage";
import StoreProvider from "@/store/StoreProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StoreProvider>
        <PrincipalLayout>
          <HomePage>{children}</HomePage>
        </PrincipalLayout>
      </StoreProvider>
    </>
  );
};

export default layout;

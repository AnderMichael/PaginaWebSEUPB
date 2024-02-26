"use client";
import React from "react";
import StoreProvider from "@/store/StoreProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StoreProvider>
        {children}
      </StoreProvider>
    </>
  );
};

export default layout;

"use client";
import React from "react";
import HomePage from "./HomePage";
import { PrincipalLayout } from "../../principal-layout/PrincipalLayout";
import GuardHome from "./GuardHome";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GuardHome>
      <PrincipalLayout>
        <HomePage>{children}</HomePage>
      </PrincipalLayout>
    </GuardHome>
  );
};

export default layout;

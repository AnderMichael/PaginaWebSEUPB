"use client";
import React from "react";
import { PrincipalLayout } from "../principal-layout/PrincipalLayout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <PrincipalLayout>{children}</PrincipalLayout>;
};

export default layout;

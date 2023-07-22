"use client";
import { URL_APP } from "@/models/principalUrl";
import Link from "next/link";
// import { NextResponse } from "next/server";
import React from "react";

interface Props {
  condition: boolean;
  children: React.ReactNode;
}

const Middleware = ({ condition, children }: Props) => {
  if (condition) {
    return <>{children}</>;
  } else {
    return <Link href={URL_APP}>regresar a Login</Link>;
  }
};

export default Middleware;

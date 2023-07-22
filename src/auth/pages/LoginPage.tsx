"use client";
import Middleware from "@/guards/Middleware";
import { URL_APP } from "@/models/principalUrl";
import { useDispatch, useStore } from "@/store/StoreProvider";
import { types } from "@/store/storeReducer";
import Link from "next/link";
import { NextResponse } from "next/server";
import React from "react";
import "tailwindcss/tailwind.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const click = () => {
    dispatch({ type: types.login });
  };

  return (
    <Link href={`${URL_APP}/dinamic-path/equipo-dinamita-alpha-lobo-C++`}>
      <button
        className="hover:bg-red-600 active:bg-red-400 bg-red-500"
        onClick={click}
      >
        Login Page
      </button>
    </Link>
  );
};

export default LoginPage;

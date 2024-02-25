"use client";
import React, { useContext } from "react";
import LoginForm from "./components/LoginForm";
import Image from "next/image";
import seupb  from "@/assets/seupb.jpg"
const LoginPage = () => {

  return (
<div className="bg-[#fff8ec] flex flex-col max-[426px]:overflow-auto max-[426px]:h-max absolute inset-0 justify-center items-center p-4">
  <div className="flex flex-col md:flex-row bg-[#f28b42] divide-y md:divide-y-0 divide-x-0 md:divide-x-2 divide-white p-5 md:p-10 align-center shadow-2xl rounded-3xl shadow-[#FD9C55] w-full max-w-4xl">
    <div className="flex flex-1 flex-col justify-center items-center px-12 max-[426px]:px-4 py-5">
      <h1 className="text-3xl md:text-[40px] text-white my-5 text-left font-bold font-josefin">
        CABRITA HUB
      </h1>
      <Image src={seupb} alt={"uwu"} className="rounded-3xl w-40 md:w-40 shadow-2xl shadow-black"/>
    </div>
    
    <div className="flex flex-col justify-center items-center px-4 md:px-16 py-5">
      <h1 className="text-3xl md:text-[40px] text-white my-5 text-left font-bold font-jost">
        Iniciar Sesión
      </h1>
      <LoginForm />
    </div>
  </div>
</div>
  );
};

export default LoginPage;
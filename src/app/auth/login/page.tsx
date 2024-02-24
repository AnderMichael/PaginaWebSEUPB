"use client";
import React from "react";
import LoginForm from "./components/LoginForm";
import Image from "next/image";
import seupb  from "@/assets/seupb.jpg"
const LoginPage = () => {
  return (
    <div className="bg-[#F2F2F2] flex flex-col absolute h-full w-full justify-center items-center">
      <div className="flex flex-row bg-[#384293] divide-x-2 divide-white p-10 align-center shadow-2xl rounded-3xl shadow-[#302E46]">
        <div className="flex flex-1 flex-col justify-center items-center px-16 py-5 mx-10">
        <h1 className="text-[40px] text-white my-5 text-left font-bold font-josefin mt-10">
            SEUPBweb
          </h1>
          <Image src={seupb} alt={"uwu"} className="rounded-3xl w-60 shadow-2xl shadow-black"/>
          
        </div>
        
        <div className="flex flex-1 flex-col px-16">
          <h1 className="text-[40px] text-white my-5 text-left font-bold font-jost">
            Iniciar Sesión
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
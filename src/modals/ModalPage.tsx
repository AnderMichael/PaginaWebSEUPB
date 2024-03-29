"use client";
import React from "react";

interface Props {
  children: JSX.Element;
}

const ModalPage = ({ children }: Props) => {
  return (
    <div
      className="fixed w-full h-full inset-0 flex justify-center items-center bg-opacity-5 z-10"
      style={{ backgroundColor: "rgb(107 114 128)" }}
    >
      {children}
    </div>
  );
};

export default ModalPage;

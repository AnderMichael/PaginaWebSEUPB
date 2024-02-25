"use client";
import React from "react";

interface Props {
  id: string;
  titleText: string;
}

export const TitleMenu = ({ id, titleText }: Props) => {
  return (
    <h1
      id={id}
      className="text-center text-3xl text-white font-medium font-cabin"
    >
      {titleText}
    </h1>
  );
};

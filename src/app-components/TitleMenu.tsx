import React from "react";

interface Props {
  id: string;
  titleText: string;
}

const TitleMenu = ({ id, titleText }: Props) => {
  return (
    <h1
      id={id}
      className="text-center text-6xl text-white font-medium font-['Jost']"
    >
      {titleText}
    </h1>
  );
};

export default TitleMenu;

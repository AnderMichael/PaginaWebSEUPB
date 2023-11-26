import { StoreContext } from "@/store/StoreProvider";
import Image from "next/image";
import React, { useContext } from "react";

interface Props {
  imageUrl: string;
}

export const ImagePlate = ({ imageUrl }: Props) => {
  // el width de la imagen debe venir en formato de 'px';
  const context: any = useContext(StoreContext);
  const SRC: string = imageUrl;

  return (
    <figure
      className={`${
        context.widthScreen >= 890
          ? "rounded-tl-3xl rounded-bl-3xl"
          : "rounded-tr-3xl rounded-br-3xl"
      } w-[250px]`}
    >
      <img src={SRC} className="w-[250px] h-full" />
    </figure>
  );
};

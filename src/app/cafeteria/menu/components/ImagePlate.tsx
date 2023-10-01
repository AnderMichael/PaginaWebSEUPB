import { StoreContext } from "@/store/StoreProvider";
import Image from "next/image";
import React, { useContext } from "react";

interface Props {
  imageUrl: string;
  imageWidth: string;
  imageHeight: string;
}

export const ImagePlate = ({ imageUrl, imageWidth, imageHeight }: Props) => {
  // el width de la imagen debe venir en formato de 'px';
  const context: any = useContext(StoreContext);

  const WIDTH_IMAGE: number = Number(imageWidth.slice(0, -2));
  const HEIGHT_IMAGE: number = Number(imageWidth.slice(0, -2));
  const SRC: string = imageUrl;

  return (
    <figure
      className={`${
        context.widthScreen >= 890
          ? "rounded-tl-3xl rounded-bl-3xl"
          : "rounded-tl-3xl rounded-tr-3xl"
      } w-[${imageWidth}] h-[${imageHeight}]`}
    >
      <Image
        loader={() => SRC}
        src={SRC}
        width={WIDTH_IMAGE}
        height={HEIGHT_IMAGE}
        alt={""}
        className={`${
          context.widthScreen >= 890
            ? "rounded-tl-3xl rounded-bl-3xl"
            : "rounded-tl-3xl rounded-tr-3xl"
        } w-[${imageWidth}] h-[${imageHeight}]`}
      />
    </figure>
  );
};

import Image from "next/image";
import React from "react";

interface Props {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}

export const ImagePlate = ({ imageUrl, imageWidth, imageHeight }: Props) => {
  return (
    <figure className={`w-[${imageWidth}] h-[${imageHeight}]`}>
      <Image
        src={imageUrl}
        alt={""}
        className={`w-[${imageWidth}] h-[${imageHeight}]`}
      />
    </figure>
  );
};

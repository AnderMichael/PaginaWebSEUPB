import { StoreContext } from "@/store/StoreProvider";
import React, { useContext, useEffect } from "react";
import { ImagePlate } from "./ImagePlate";
import { ButtonSavePlate } from "./ButtonSavePlate";
import { PlatesTypes } from "../types/platesType";

interface Props {
  plate: PlatesTypes;
}

export const PlateCard = ({ plate }: Props) => {
  const {
    plateName,
    platePrice,
    plateAvailable,
    plateDescription,
    plateImage,
  } = plate;

  const context: any = useContext(StoreContext);

  const biggerEqualThan: boolean = context.widthScreen >= 890;
  const smallerThan: boolean = context.widthScreen < 890;

  return (
    <section className="flex flex-row m-5">
      <div
        className={`flex shadow-lg rounded-3xl
        ${biggerEqualThan ? "w-[700px] h-[250px]" : "w-[250px] h-[700px]"}
        ${smallerThan ? "flex-col" : "flex-row"}`}
      >
        <ImagePlate
          imageUrl={plateImage}
          imageWidth={"250px"}
          imageHeight={"250px"}
        />
        <div
          className={`flex flex-col text-black ${
            biggerEqualThan ? "w-[450px]" : "w-[250px] h-full"
          }`}
        >
          <h3
            className={`${
              biggerEqualThan ? "rounded-tr-3xl" : ""
            } w-full h-[50px] bg-[#0A8D76] p-[6px] font-semibold text-center text-white text-xl
            `}
          >
            {plateName}
          </h3>
          <div
            className={`flex justify-around ${
              biggerEqualThan
                ? "rounded-br-3xl"
                : "flex-col rounded-bl-3xl rounded-br-3xl"
            } bg-[#E2F7ED] w-full h-full`}
          >
            <p className="h-full w-[90%] overflow-y-auto m-2 text-base font-thin">
              Descripción del platillo:
              <br />
              <br />
              {plateDescription}
            </p>
            <div className="flex flex-col">
              <div
                className={`flex justify-center items-center ${
                  plateAvailable && biggerEqualThan
                    ? "flex-col m-5"
                    : "flex-row m-1"
                } ${biggerEqualThan ? "h-[85%]" : "h-[100px]"}
                ${!plateAvailable && biggerEqualThan && "mt-3 mr-6"}`}
              >
                <p className="text-base font-semibold w-max">Bs {platePrice}</p>
                <p
                  className={`text-base font-medium ml-5 ${
                    !plateAvailable && "text-red-600"
                  }`}
                >
                  {plateAvailable ? "Disponible" : "Agotado"}
                </p>
              </div>
              {smallerThan && plateAvailable && (
                <ButtonSavePlate
                  buttonText={"Reservar plato"}
                  action={() => context.setDataPlateToReserve(plate)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {biggerEqualThan && plateAvailable && (
        <ButtonSavePlate
          buttonText={"Reservar plato"}
          action={() => context.setDataPlateToReserve(plate)}
        />
      )}
    </section>
  );
};

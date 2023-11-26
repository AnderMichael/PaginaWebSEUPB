"use client";
import { StoreContext } from "@/store/StoreProvider";
import React, { useContext } from "react";
import { ImagePlate } from "./ImagePlate";
import { useRouter } from "next/navigation";
import { PlatesTypes } from "@/app/home/cafeteria/menu/types/platesType";
import TrashIcon from "@/assets/TrashIcon";
import EditIcon from "@/assets/EditIcon";
import { PlateInterface } from "@/models/plateModel";

interface Props {
  plate: PlatesTypes;
  deleteAction: (plate: any) => void;
}

export const PlateCard = ({ plate, deleteAction }: Props) => {
  const {
    plateName,
    platePrice,
    plateAvailable,
    plateDescription,
    plateImage,
    plateQuantity,
  } = plate;

  const router = useRouter();

  const context: any = useContext(StoreContext);

  const biggerEqualThan: boolean = context.widthScreen >= 890;
  const smallerThan: boolean = context.widthScreen < 890;

  const setPlateToDelete = () => {
    deleteAction(plate);
  };

  return (
    <section className="flex flex-row m-5 w-max">
      <div
        className={`flex shadow-lg rounded-3xl
        ${biggerEqualThan ? "w-[90%] h-full" : "w-full h-[90%]"}
        ${smallerThan ? "flex-col" : "flex-row"}`}
      >
        <div
          className={`flex ${
            smallerThan ? "flex-row w-full" : "flex-col w-[100px] h-full"
          }`}
        >
          <button
            onClick={setPlateToDelete}
            className={`flex ${
              smallerThan ? "w-[50%]" : "h-[50%]"
            } bg-[#D93939] items-center justify-center hover:opacity-80`}
          >
            <TrashIcon />
          </button>
          <button
            className={`flex ${
              smallerThan ? "w-[50%]" : "h-[50%]"
            } bg-[#E69424] items-center justify-center hover:opacity-80 text-white`}
          >
            <EditIcon />
          </button>
        </div>
        <ImagePlate imageUrl={plateImage} />
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
                className={`flex justify-between items-center ${
                  plateAvailable && biggerEqualThan
                    ? "flex-col m-5"
                    : "flex-row m-1"
                } ${biggerEqualThan ? "h-[85%]" : "h-[100px]"}
                ${!plateAvailable && biggerEqualThan && "mt-3 mr-6"}`}
              >
                <p className="font-semibold w-max text-center text-xl">
                  Bs {platePrice}
                </p>

                <p
                  className={`text-base font-medium text-center ${
                    !plateAvailable && "text-red-600"
                  }`}
                >
                  Cantidad <br />
                  Disponible:
                  <br />
                  {plateQuantity}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

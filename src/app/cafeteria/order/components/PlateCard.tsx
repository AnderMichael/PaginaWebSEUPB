import { StoreContext } from "@/store/StoreProvider";
import React, { useContext, useEffect } from "react";

interface OrderType {
    plateName: String,
    platePrice: Number,
    plateDescription: String
}
interface Props {
  plate: OrderType;
}

export const PlateCard = ({ plate }: Props) => {
  const {
    plateName,
    platePrice,
    plateDescription,
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
            
          </div>
        </div>
      </div>
    </section>
  );
};

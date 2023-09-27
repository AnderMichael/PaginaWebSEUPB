import React from "react";

interface DetailsEventProps {
  hour: string;
  date: string;
}

const DetailsEvent: React.FC<DetailsEventProps> = ({ hour, date }) => {
  return (
    <div className="flex flex-col flex-1 px-3 py-3 h-full justify-between">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-center font-semibold">{date}</h1>
          <h1 className="text-center font-semibold">{hour}</h1>
        </div>
        <h1 className="text-center font-semibold">
          Cupos
          <br />
          disponibles
        </h1>
      </div>
      <button className="bg-[#087820] hover:opacity-50 text-white text-xl font-bold rounded h-1/4">
        REGISTRARSE
      </button>
    </div>
  );
};

export default DetailsEvent;

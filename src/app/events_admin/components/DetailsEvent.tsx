import React from "react";

interface DetailsEventProps {
  hour: string;
  date: string;
}

const DetailsEvent: React.FC<DetailsEventProps> = ({ hour, date }) => {
  return (
    <div className="flex flex-1 px-3 py-3 h-full justify-around">
        <div className="flex flex-col justify-center">
          <h1 className="text-center font-semibold">{date}</h1>
          <h1 className="text-center font-semibold">{hour}</h1>
        </div>
        <div className="flex flex-col justify-around">
          <button className="flex bg-[#087820] hover:opacity-50 text-white text-xl font-bold rounded h-1/4 items-center justify-center">
            B1
          </button>
          <button className="flex bg-[#087820] hover:opacity-50 text-white text-xl font-bold rounded h-1/4 items-center justify-center">
            B2
          </button>
        </div>
    </div>
  );
};

export default DetailsEvent;

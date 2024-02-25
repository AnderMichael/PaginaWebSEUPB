import React from "react";

interface DetailsEventProps {
  hour: string;
  date: string;
  hasLink: boolean;
  linkForm: string;
}

const DetailsEvent: React.FC<DetailsEventProps> = ({
  hour,
  date,
  hasLink,
  linkForm,
}) => {
  return (
    <div className="flex flex-col flex-1 px-3 py-3 h-full justify-center">
      <div
        className={`flex flex-col h-full w-full ${
          hasLink ? "justify-between" : "justify-around"
        }`}
      >
        <h1 className="text-center font-semibold text-xl">{date}</h1>
        <h1 className="text-center font-semibold text-xl">{hour}</h1>
        {hasLink && (
          <a
            className="flex bg-[#087820] hover:opacity-50 text-white text-xl font-bold rounded h-1/4 items-center justify-center"
            href={linkForm}
          >
            REGISTRARSE
          </a>
        )}
      </div>
    </div>
  );
};

export default DetailsEvent;

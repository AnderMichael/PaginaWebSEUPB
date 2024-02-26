import React from "react";

interface Props {
  action: () => void;
  title: string;
  message: string;
}

const ModalMessageWithButton = ({ action, title, message }: Props) => {
  return (
    <div
      id={"ModalMessageNorica"}
      className="relative p-4 bg-white rounded-lg shadow
    dark:bg-gray-800 sm:p-5 max-[426px]:w-[280px] max-[769px]:w-[350px]
    w-[400px]"
    >
      <div className="flex justify-between mb-4 rounded-t sm:mb-5">
        <div className="text-lg text-gray-900 md:text-xl dark:text-white">
          <h3 className="font-semibold ">{title}</h3>
        </div>
        <div></div>
      </div>
      <dl>
        <dd
          className="mb-4 font-light text-gray-500 sm:mb-5
        dark:text-gray-400 whitespace-pre-line"
        >
          {message}
        </dd>
      </dl>
      <div className="flex justify-start items-center">
        <button
          onClick={action}
          type="button"
          className="inline-flex items-center text-white bg-red-600
        hover:bg-red-500 active:bg-red-700 font-medium rounded-lg
        text-sm px-5 py-2.5 text-center"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default ModalMessageWithButton;

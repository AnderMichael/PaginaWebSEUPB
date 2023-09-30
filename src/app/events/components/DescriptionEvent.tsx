import React from "react";
interface DescriptionEventProps {
  description: string;
}
const DescriptionEvent: React.FC<DescriptionEventProps> = ({ description }) => {
  return (
    <div className="flex-col px-3 py-2">
      <h1 className="font-bold">Descripción del Evento:</h1>
      <p>{description}</p>
    </div>
  );
};

export default DescriptionEvent;

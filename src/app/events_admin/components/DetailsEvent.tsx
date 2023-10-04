import EditIcon from "@/assets/EditIcon";
import TrashIcon from "@/assets/TrashIcon";
import { EventInterface } from "@/models/eventModel";
import { useRouter } from "next/navigation";
import React from "react";

interface DetailsEventProps {
  hour: string;
  date: string;
  eventData: EventInterface;
  deleteMethod: (eventData: EventInterface) => void;
}

const DetailsEvent: React.FC<DetailsEventProps> = ({
  hour,
  date,
  eventData,
  deleteMethod,
}) => {
  const router = useRouter();

  const tryToDelete = () => {
    deleteMethod(eventData);
  };

  const handleEdit = () => {
    router.push(`/events_admin/edit_event/${eventData.id}`);
  };

  return (
    <div className="flex max-[541px]:flex-col flex-1 px-3 py-2 h-full justify-around">
      <div className="flex flex-col justify-center max-[541px]:justify-start">
        <h1 className="text-center font-semibold">{date}</h1>
        <h1 className="text-center font-semibold">{hour}</h1>
        <h1
          className={`text-center font-semibold ${
            eventData.hasLink ? "text-lime-700" : "text-red-700"
          }`}
        >
          {eventData.hasLink ? "Con Registro" : "Sin Registro"}
        </h1>
      </div>
      <div className="flex min-[541px]:flex-col justify-around">
        <button
          className="flex bg-[#087820] text-white hover:opacity-50 rounded h-[40px] w-[40px] items-center justify-center shadow-xl"
          onClick={handleEdit}
        >
          <EditIcon />
        </button>
        <button
          className="flex bg-[#D93939] text-white hover:opacity-50 rounded h-[40px] w-[40px] items-center justify-center shadow-xl"
          onClick={tryToDelete}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default DetailsEvent;

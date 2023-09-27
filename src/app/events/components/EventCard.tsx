import React from "react";
import EventUPB from "../types/EventUPB";
import TitleCard from "./TitleCard";
import DescriptionEvent from "./DescriptionEvent";
import DetailsEvent from "./DetailsEvent";

interface EventCardProps {
  eventData: EventUPB;
}

const EventCard: React.FC<EventCardProps> = ({ eventData }) => {
  return (
    <div className="flex mx-7 my-2 bg-[#E2F7ED] h-[30%] rounded-xl overflow-hidden">
      <div className="w-[30%]">Image</div>
      <div className="flex flex-col w-[70%]">
        <TitleCard title={eventData.name} />
        <div className="flex h-[75%]">
          <div className="w-[55%] overflow-y-auto">
            <DescriptionEvent description={eventData.description} />
          </div>
          <div className="w-[45%] overflow-y-auto">
            <DetailsEvent hour={eventData.hour} date={eventData.date} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

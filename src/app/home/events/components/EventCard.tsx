import React from "react";

import TitleCard from "./TitleCard";
import DescriptionEvent from "./DescriptionEvent";
import DetailsEvent from "./DetailsEvent";
import EventUPB from "../types/EventUPB";
import { EventInterface } from "@/models/eventModel";

interface EventCardProps {
  eventData: EventInterface;
}

const EventCard: React.FC<EventCardProps> = ({ eventData }) => {
  return (
    <div className="flex mx-7 my-4 bg-[#E2F7ED] min-[541px]:h-[30%] max-[541px]:h-[100%] rounded-xl overflow-hidden max-[541px]:flex-col shadow-lg">
      <div className="flex flex-1 min-[541px]:w-[30%] max-[541px]:h-[40%] justify-center">
        <img className="h-full" src={eventData.img} />
      </div>
      <div className="flex flex-col min-[541px]:w-[70%] max-[541px]:h-[60%]">
        <TitleCard title={eventData.name} />
        <div className="flex min-[541px]:h-[75%] max-[541px]:h-[80%] max-[541px]:flex-col">
          <div className="min-[541px]:w-[55%] max-[541px]:h-[55%] overflow-y-auto">
            <DescriptionEvent description={eventData.description} />
          </div>
          <div className="min-[541px]:w-[45%] max-[541px]:h-[45%] min-[541px]:overflow-y-auto">
            <DetailsEvent
              hour={eventData.hour}
              date={eventData.date}
              hasLink={eventData.hasLink}
              linkForm={eventData.linkForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

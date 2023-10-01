import React from "react";
import EventUPB from "../../types/EventUPB";
import TitleCard from "./TitleCard";
import DescriptionEvent from "./DescriptionEvent";
import DetailsEvent from "./DetailsEvent";

interface EventCardProps {
  eventData: EventUPB;
  deleteMethod: (eventData: EventUPB) => void;
}

const EventCard: React.FC<EventCardProps> = ({ eventData, deleteMethod }) => {
  return (
    <div className="flex mx-7 my-4 bg-[#E2F7ED] min-[541px]:h-[30%] max-[541px]:h-[100%] rounded-xl overflow-hidden max-[541px]:flex-col shadow-lg">
      <div className="flex flex-1 min-[541px]:w-[30%] max-[541px]:h-[40%] justify-center">
        <img
          className="h-full"
          src="https://scontent.flpb3-2.fna.fbcdn.net/v/t39.30808-6/327326673_567893995211980_3063958075022409817_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=9G9eyf_dNsYAX-zmZOZ&_nc_ht=scontent.flpb3-2.fna&oh=00_AfA9Fkrf4TZVcUOfP388LFSFtGzF2UIqZvK69cBpVanemA&oe=651E1E43"
        />
      </div>
      <div className="flex flex-col min-[541px]:w-[70%] max-[541px]:h-[60%]">
        <TitleCard title={eventData.name} />
        <div className="flex min-[541px]:h-[75%] max-[541px]:h-[80%] max-[541px]:flex-col">
          <div className="min-[541px]:w-[55%] max-[541px]:h-[55%] overflow-y-auto">
            <DescriptionEvent description={eventData.description} />
          </div>
          <div className="min-[541px]:w-[45%] max-[541px]:h-[45%] min-[541px]:overflow-y-auto">
            <DetailsEvent hour={eventData.hour} date={eventData.date} eventData={eventData} deleteMethod={deleteMethod} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

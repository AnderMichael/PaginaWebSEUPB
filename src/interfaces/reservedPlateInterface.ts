import { ReservedModelBackend, ReservedModelFrontend } from "@/models/reservedPlateModel";

export const reservedPlateFrontendToBackend = (reservedPLate:ReservedModelFrontend):ReservedModelBackend => {
  const { clientCode, clientName, clientSchedule, plateId, plateAvailable, plateDescription,
    plateImage, plateName, platePrice, plateQuantity } = reservedPLate;
    
  return {
    client_code:clientCode,
    client_name:clientName,
    client_schedule:clientSchedule,
    plate_id:plateId,
    plate_available:plateAvailable,
    plate_description:plateDescription,
    plate_image:plateImage,
    plate_name:plateName,
    plate_price:platePrice,
    plate_quantity:plateQuantity,
  };
};

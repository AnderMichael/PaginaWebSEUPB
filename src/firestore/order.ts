import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConnection";
import { ReservedModelBackend, ReservedModelFrontend } from "@/models/reservedPlateModel";
import { reservedPlateFrontendToBackend } from "@/interfaces/reservedPlateInterface";
import { updatePlateFS } from "./plates";

const reserved_plates = collection(db,"reserved_plates");

export const setReservedPlateFS = async (order:ReservedModelFrontend) => {
  try {
    const newOrder:ReservedModelBackend = reservedPlateFrontendToBackend(order);

    const { plate_id, plate_quantity } = newOrder;
    console.log("Sending order");
    await updatePlateFS( plate_id, plate_quantity);
    await addDoc(reserved_plates,newOrder);
    console.log("Order Sent");
    return false;
  } catch (error) {
    console.error(error);
    return true;
  }
}

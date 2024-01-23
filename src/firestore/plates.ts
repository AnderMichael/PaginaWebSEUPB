import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConnection";
import { PlateInterface } from "@/models/plateModel";

export const plates = collection(db,"plates");

export const getPlatesFS = async () => {
  try{
    const data = await getDocs(plates);
    const filterData = data.docs.map((doc:any) => ({
      ...doc.data(),
      id: doc.id
    }));
    let platesGotten:any = [];
    if(filterData){
      platesGotten = [...filterData];
      return platesGotten;
    }else{
      return null;
    }
  }catch(err){
    console.error(err);
    return null;
  }
};

export const updatePlateFS = async (id:string,quantity:number) => {
  try{
    console.log(quantity);
    const newPlateQuantity:number = quantity - 1;
    console.log(newPlateQuantity);
    const plateDoc = doc(db, "plates", id);
    let updatedPlate;
    if(newPlateQuantity === 0){
      updatedPlate = {plateQuantity:0, plateAvailable: false};
    }
    else{
      updatedPlate = {plateQuantity:newPlateQuantity};
    }
    await updateDoc(plateDoc, updatedPlate);
    return false;
  }catch(err){
    console.error(err);
    return true;
  }
}

export const setPlateFS = async (plate:PlateInterface) => {
  try {
    const newPlate:PlateInterface = plate;

    //const { plate_id, plate_quantity } = newPlate;
    console.log("Sending plate");
   // await updatePlateFS( plate_id, plate_quantity);
    await addDoc(plates,newPlate);
    console.log("Plate Sent");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
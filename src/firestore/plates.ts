import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConnection";

const plates = collection(db,"plates");

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
    const newPlateQuantity:number = quantity - 1;
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

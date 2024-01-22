import { collection, doc, getDocs, updateDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, realTimeDb } from "./firebaseConnection";
import { getDatabase, onValue, ref, set, child } from "firebase/database";
import { get } from "http";

export const plates = collection(db, "plates");

export const getPlatesFS = async () => {
  try {
    const data = await getDocs(plates);
    // const queryPlates = query(
    //   collection(db, "plates"),
    // );

    // const platesToGet: any = [];

    // onSnapshot(queryPlates, (querySnapshot) => {
    //   querySnapshot.forEach((doc: any) => {
    //     platesToGet.push({
    //       ...doc.data(),
    //       id: doc.id
    //     })
    //   });
    // })



    const filterData = data.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id
    }));

    let platesGotten: any = [];
    if (filterData) {
      platesGotten = [...filterData];
      return platesGotten;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updatePlateFS = async (id: string, quantity: number) => {
  try {
    console.log(quantity);
    const newPlateQuantity: number = quantity - 1;
    console.log(newPlateQuantity);
    const plateDoc = doc(db, "plates", id);
    let updatedPlate;
    if (newPlateQuantity === 0) {
      updatedPlate = { plateQuantity: 0, plateAvailable: false };
    }
    else {
      updatedPlate = { plateQuantity: newPlateQuantity };
    }
    await updateDoc(plateDoc, updatedPlate);
    return false;
  } catch (err) {
    console.error(err);
    return true;
  }
}

// export const getRealTimePlateFD = (id: string, setValue: any) => {
  
// };



// export const updateRealTimePlateFD = (id: string, quantity: number) => {
//   getRealTimePlateFD(id, data.getData);

//   if (!data) {
//     throw new Error("id not found!");
//   }

//   const reference = ref(realTimeDb, "plates/" + id)

//   set(reference, {
//     plateQuantity: data.plateQuantity - quantity
//   });
// };

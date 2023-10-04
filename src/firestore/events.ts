import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConnection";
import { EventInterface } from "@/models/eventModel";

const events = collection(db,"events");

export const getEventsFS = async () => {
  let data;
  try{
    data = await getDocs(events);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    let eventsGotten:any[] = [];
    if(filterData){
      eventsGotten = [...filterData];
      return eventsGotten;
    }else{
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const postEventFS = async (event:EventInterface) => {
  try{
    await addDoc(events,event);
    return false;
  }catch(error){
    console.error(error);
    return true;
  }
};

export const updateEventFS = async (event:EventInterface) => {
  // pasar un evento con todos los siguientes datos:
  /**
   * id:string (el cual NO debería cambiarse en la ejecución de todo el programa)
   * name:string
   * date:string
   * hour:string
   * img:string (url)
   * linkForm:string (url)
   * hasLink:boolean
   */
  try {
    const { id } = event;
    const newEvent = {
      name:event.name,
      description:event.description,
      date:event.date,
      hour:event.hour,
      img:event.img,
      linkForm:event.linkForm,
      hasLink:event.hasLink
    };
    const eventDoc = doc(db, "events", id || "");
    // console.log(newEvent);
    // id: eventData.id,
    //       name: data.eventName,
    //       description: data.eventDescription,
    //       date: data.eventDate,
    //       hour: data.eventTime,
    //       img: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //       linkForm: data.registrationLink ? data.linkForm : "",
    //       hasLink: data.registrationLink,
    await updateDoc(eventDoc,newEvent);
    // await updateDoc(eventDoc, {name:event.name});
    // await updateDoc(eventDoc, {description:event.description});
    // await updateDoc(eventDoc, {date:event.date});
    // await updateDoc(eventDoc, {hour:event.hour});
    // await updateDoc(eventDoc, {img:event.img});
    // await updateDoc(eventDoc, {linkForm:event.linkForm});
    // await updateDoc(eventDoc, {hasLink:event.hasLink});
    return false;
  } catch (error) {
    console.error(error);
    return true;
  }
}

export const deleteEventFS = async (id:string) => {
  try {
    const eventDoc = doc(db, "events", id);
    await deleteDoc(eventDoc);
    return false;    
  } catch (error) {
    console.error(error);
    return true;
  }
}

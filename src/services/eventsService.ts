import { organizerEventsAPI } from './organizerInstance';

export const getEvents = async () => {
    return await organizerEventsAPI.get("");
  };

  
  export const addEvent = async (event:any) => {
    return await organizerEventsAPI.post("/", event);
  };

  
  export const getEventById = async (id:any) => {
    return await organizerEventsAPI.get(`/${id}`);
  };
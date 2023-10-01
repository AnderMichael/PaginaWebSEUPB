import { organizerEventsAPI } from './organizerInstance';

export const getEvents = async () => {
    return await organizerEventsAPI.get("");
  };

  
  export const addEvent = async (event) => {
    return await organizerEventsAPI.post("/", event);
  };

  
  export const getEventById = async (id) => {
    return await organizerEventsAPI.get(`/${id}`);
  };
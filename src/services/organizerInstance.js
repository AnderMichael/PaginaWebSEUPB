import axios from 'axios';
const EVENTS_URL = import.meta.env.EVENTS_API;
const MENU_URL = import.meta.env.MENU_API;

export const organizerEventsAPI = axios.create({
  baseURL: EVENTS_URL,
});

export const organizerMenuAPI = axios.create({
    baseURL: MENU_URL,
  });
  
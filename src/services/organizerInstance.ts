import axios from 'axios';
const EVENTS_URL = process.env.EVENTS_API;
const MENU_URL = process.env.MENU_API;

export const organizerEventsAPI = axios.create({
  baseURL: EVENTS_URL,
});

export const organizerMenuAPI = axios.create({
    baseURL: MENU_URL,
  });

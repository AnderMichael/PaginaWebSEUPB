import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4vKBbPJHyqf-nN_UkCID8ufIBsgpaeYY",
  authDomain: "upb-web-app.firebaseapp.com",
  projectId: "upb-web-app",
  storageBucket: "upb-web-app.appspot.com",
  messagingSenderId: "868750507346",
  appId: "1:868750507346:web:d397098d4d9b54425fce8b",
  measurementId: "G-PY97R1W47Z"
};

const gettingApp = () => {
  return initializeApp(firebaseConfig);
}

// const instanceOfAuth = (app:any) => {
//   return getAuth(app);
// }

const instanceOfFireStore = (app:any) => {
  return getFirestore(app);
}

export const app = gettingApp();
// export const auth = instanceOfAuth(app);
export const db = instanceOfFireStore(app);
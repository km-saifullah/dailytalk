import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAqowcqQ86r-f2KzbA3yuJhgic2d3C44vs",
  authDomain: "dailytalk-9294f.firebaseapp.com",
  projectId: "dailytalk-9294f",
  storageBucket: "dailytalk-9294f.appspot.com",
  messagingSenderId: "41374356192",
  appId: "1:41374356192:web:ddf145669343c21cc0f685",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();

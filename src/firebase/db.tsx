import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAY7F-mQL5hGNRZM5KpeysN454L9HM9bY4",
  authDomain: "devshop-4b7a2.firebaseapp.com",
  projectId: "devshop-4b7a2",
  storageBucket: "devshop-4b7a2.firebasestorage.app",
  messagingSenderId: "271827255097",
  appId: "1:271827255097:web:2761252e2ca8e3f45fb2e8",
  measurementId: "G-WMDK7FD95R",
};

const firebaseApp = initializeApp(firebaseConfig);

export const Db = getFirestore(firebaseApp);

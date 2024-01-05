import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDRoMPflVTs9ihx-TSyE46CuxDnSi0u4cw",
  authDomain: "naac-fd101.firebaseapp.com",
  projectId: "naac-fd101",
  storageBucket: "naac-fd101.appspot.com",
  messagingSenderId: "177685735130",
  appId: "1:177685735130:web:010d922a995d23b2fea7e3",
  measurementId: "G-BG1PH65XXE"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {getStorage};

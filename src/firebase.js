import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBeln_p8oix5S1QYIoM15-boQ2iEWhVrVk",
  authDomain: "todo-app-e2a17.firebaseapp.com",
  projectId: "todo-app-e2a17",
  storageBucket: "todo-app-e2a17.appspot.com",
  messagingSenderId: "495841417648",
  appId: "1:495841417648:web:7dbc79c32ab6577d565e75"
};


//firebase giriş
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); /* firestore uyg gecmis oldu  */
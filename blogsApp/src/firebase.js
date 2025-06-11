import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSIoBzJhCVuZHwz0PRyxcjHfAmvOB6uIs",
  authDomain: "my-blogsapp-e380a.firebaseapp.com",
  projectId: "my-blogsapp-e380a",
  storageBucket: "my-blogsapp-e380a.firebasestorage.app",
  messagingSenderId: "792910153101",
  appId: "1:792910153101:web:c0bd88fde4f91d95a329c4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { app, auth, db };

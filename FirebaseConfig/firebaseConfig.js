// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXPaCgXpD3JO6CBSwoBdJQwyLVZqCEuqA",
  authDomain: "appigreja-9c603.firebaseapp.com",
  projectId: "appigreja-9c603",
  storageBucket: "appigreja-9c603.appspot.com",
  messagingSenderId: "646295927614",
  appId: "1:646295927614:web:87989a25cfa4b3b9060a6f",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Serviços
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

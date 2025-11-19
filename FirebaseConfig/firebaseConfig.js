// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
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

// Inicializa Auth com persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firestore
const db = getFirestore(app);

export { auth, db };

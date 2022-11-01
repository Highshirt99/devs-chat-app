import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAoM4iIcFdejkGs3-styprQon4T6uvjcpE",
  authDomain: "devs-chat-app.firebaseapp.com",
  projectId: "devs-chat-app",
  storageBucket: "devs-chat-app.appspot.com",
  messagingSenderId: "569370738795",
  appId: "1:569370738795:web:d1fa00320336fe8829312e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);
export const db = getFirestore()
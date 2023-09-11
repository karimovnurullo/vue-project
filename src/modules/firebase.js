import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4pXe1PHkF1Yrop-kgiF5GrN_vt7kkD1Y",
  authDomain: "dev-nurullo.firebaseapp.com",
  projectId: "dev-nurullo",
  storageBucket: "dev-nurullo.appspot.com",
  messagingSenderId: "58114059181",
  appId: "1:58114059181:web:f79c5b6b4186b88f3bcf24",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, googleProvider, db, storage };

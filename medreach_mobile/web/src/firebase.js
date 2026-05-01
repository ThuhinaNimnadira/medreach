import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAVfV2YP11d9a74MNBDmuDFd2hFSRU2ByE",
    authDomain: "medreach-940fa.firebaseapp.com",
    projectId: "medreach-940fa",
    storageBucket: "medreach-940fa.firebasestorage.app",
    messagingSenderId: "223884013960",
    appId: "1:223884013960:web:c3a8a275b4171d99ce8a3d",
    measurementId: "G-8KJFFL00TM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

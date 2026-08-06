import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyCsjwROLzmWbL1UXr4un_bImz7m-Hfzm38",
  authDomain: "school-management-system-a8435.firebaseapp.com",
  projectId: "school-management-system-a8435",
  storageBucket: "school-management-system-a8435.firebasestorage.app",
  messagingSenderId: "728029838878",
  appId: "1:728029838878:web:aebbca1be1dcc02bdbf80f",
  measurementId: "G-DGLZZ4L0DM"
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export async function testFirebaseConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, '_connection_test', 'ping'));
    console.log("Firebase Firestore connected successfully.");
    return true;
  } catch (error) {
    console.warn("Firebase online sync warning (using responsive local store fallback):", error);
    return false;
  }
}

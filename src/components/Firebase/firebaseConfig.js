import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyAja77YOvpTKqM2293Q-4u_XaWBAccFUAQ",
  authDomain: "hero-quiz-57f40.firebaseapp.com",
  projectId: "hero-quiz-57f40",
  storageBucket: "hero-quiz-57f40.appspot.com",
  messagingSenderId: "575835359146",
  appId: "1:575835359146:web:469b3fc02a14a14ff4cdd3",
  measurementId: "G-3LMBTY5X1P",
};

const app = initializeApp(config);

export const auth = getAuth(app);

export const dbFirestore = getFirestore();

export const user = (uid) => doc(dbFirestore, `users/${uid}`);

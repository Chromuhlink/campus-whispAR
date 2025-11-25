import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBE06YuzOKgQh-5pwUMeZderuO_Cuc_Ih0",
  authDomain: "campus-whispar.firebaseapp.com",
  projectId: "campus-whispar",
  storageBucket: "campus-whispar.firebasestorage.app",
  messagingSenderId: "258530045606",
  appId: "1:258530045606:web:cf7fbaab73835c1af24e67",
  measurementId: "G-21S2PKM1MZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

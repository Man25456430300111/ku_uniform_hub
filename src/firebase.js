// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // นำเข้า Firebase Authentication
import { getFirestore } from "firebase/firestore"; // นำเข้า Firestore (ถ้าคุณต้องการใช้ Firestore)
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlT_tlCKJiq9d4qCKlY6ecy7UZVgD_LIw",
  authDomain: "backend-ku-uniform-hub.firebaseapp.com",
  projectId: "backend-ku-uniform-hub",
  storageBucket: "backend-ku-uniform-hub.appspot.com",
  messagingSenderId: "871324555296",
  appId: "1:871324555296:web:48c3853ad33372cb9f4445",
  measurementId: "G-QCYEFXFC8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app); // Firebase Authentication
const db = getFirestore(app); // Firestore (ถ้าคุณต้องการใช้ Firestore)

// Export Authentication and Firestore
export { auth, db }; // ส่งออก auth และ db เพื่อให้ใช้ในไฟล์อื่นๆ ได้

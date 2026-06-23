import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQek73dtXONuIBy2xNqruVQR3d5f_qCx0",
  authDomain: "studentqrsystem-ca764.firebaseapp.com",
  projectId: "studentqrsystem-ca764",
  storageBucket: "studentqrsystem-ca764.firebasestorage.app",
  messagingSenderId: "402332150734",
  appId: "1:402332150734:web:937d96e511963bc1d9199f",
  measurementId: "G-XGEFGVQN7M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase connected!");
console.log(db);

export { db };
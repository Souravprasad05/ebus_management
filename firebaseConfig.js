// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx8xohQoZ2lNahlm0C5Kwl9DNNQSs57rU",
  authDomain: "ebus-management-7bcd5.firebaseapp.com",
  projectId: "ebus-management-7bcd5",
  storageBucket: "ebus-management-7bcd5.appspot.com",
  messagingSenderId: "450920819282",
  appId: "1:450920819282:web:75517cc315c63dff0bcd8b",
  measurementId: "G-G0N4HM874N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initializing the services
export const database = getDatabase(app);
export const auth = getAuth(app);
// export const analytics = getAnalytics(app);

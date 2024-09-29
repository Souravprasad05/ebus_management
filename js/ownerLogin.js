import { auth, database } from "../firebaseConfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("ownerEmail").value;
  const password = document.getElementById("ownerPassword").value;

  try {
    // Signin with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // User successfully authenticated
    alert("Owner Logged in successfully!");
    console.log("Owner Logged in:", user);

    window.location.href = "/HTML/ownerDashboard.html";
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Error: ${errorMessage}`);
    console.error("Error Code:", errorCode, "Message:", errorMessage);
  }
});

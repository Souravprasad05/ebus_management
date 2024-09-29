import { auth, database } from "../firebaseConfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;

  try {
    // Signin with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // User successfully authenticated
    alert("User Logged in successfully!");
    console.log("User Logged in:", user);

    window.location.href = "/HTML/userDashboard.html";
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Error: ${errorMessage}`);
    console.error("Error Code:", errorCode, "Message:", errorMessage);
  }
});

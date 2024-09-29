import { auth, database } from "../firebaseConfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { set, ref } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

async function registerUser() {
    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
    const age = document.getElementById('age').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const verifyPassword = document.getElementById('verifyPassword').value;

    // Validation for empty fields
    if (!name || !city || !age || !contact || !email || !password || !verifyPassword) {
        alert('All fields are required!');
        return;
    }

    // Password match validation
    if (password !== verifyPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Save user data in localStorage
    // const userData = {
    //     name,
    //     city,
    //     age,
    //     contact,
    //     email,
    //     password
    // };

    // localStorage.setItem('registeredUser', JSON.stringify(userData));

    try {
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
          // User successfully created and authenticated
          alert("User created and authenticated successfully!");
          console.log("User created:", user);
  
        //   saving other data in the realtime db 
        await set(ref(database, 'user/' + user.uid), {
          id : user.uid,
          name : name,
          city : city,
          age : age,
          contact : contact,
          email : email,
        })
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
        console.error("Error Code:", errorCode, "Message:", errorMessage);
    }
    
    // alert('Registration successful!');
    window.location.href = '/html/userDashboard.html';
}

document.getElementById("registerBtn").addEventListener("click", ()=>{
    registerUser()
})
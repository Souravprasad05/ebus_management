import { auth, database } from "../firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
  ref,
  get,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

let loginCount = 0;

let defaultOwners = [
  // {
  //   name: "Jane Smith",
  //   age: "30",
  //   licenseNumber: "DEF456",
  //   vehicleNumber: "UVW123",
  //   contactNumber: "987-654-3210",
  //   email: "jane@example.com",
  // },
  // {
  //   name: "Mike Johnson",
  //   age: "28",
  //   licenseNumber: "GHI789",
  //   vehicleNumber: "RST456",
  //   contactNumber: "555-555-5555",
  //   email: "mike@example.com",
  // },
];

// Function to toggle the owner form modal
document.getElementById("addOwnerButton").addEventListener("click", () => {
  const modal = document.getElementById("ownerModal");
  modal.style.display = modal.style.display === "none" ? "block" : "none";
});

document.getElementById("closeButton").addEventListener("click", () => {
  const modal = document.getElementById("ownerModal");
  modal.style.display = modal.style.display === "none" ? "block" : "none";
});

// Function to create login for owner
document
  .getElementById("createOwnerBtn")
  .addEventListener("click", async () => {
    const name = document.getElementById("ownerName").value;
    const age = document.getElementById("ownerAge").value;
    const licenseNumber = document.getElementById("licenseNumber").value;
    const vehicleNumber = document.getElementById("vehicleNumber").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const email = document.getElementById("ownerEmail").value;
    const password = document.getElementById("ownerPassword").value;

    // Basic validation
    if (
      name &&
      age &&
      licenseNumber &&
      vehicleNumber &&
      contactNumber &&
      email &&
      password
    ) {
      console.log(password);

      loginCount++;

      try {
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await signOut(auth);
        // alert("You have been signed out. You can log in later.");

        // User successfully created and authenticated
        alert("Owner added successfully!");

        await set(ref(database, "owner/" + user.uid), {
          id: user.uid,
          name: name,
          age: age,
          email: email,
          licenseNumber: licenseNumber,
          vehicleNumber: vehicleNumber,
          contactNumber: contactNumber,
        });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
        console.error("Error Code:", errorCode, "Message:", errorMessage);
      }

      // Create a new row in the owner login table
      const tableBody = document.getElementById("loginTableBody");
      const newRow = document.createElement("tr");

      newRow.innerHTML = `
            <td>${loginCount}</td>
            <td>${name}</td>
            <td>${age}</td>
            <td>${licenseNumber}</td>
            <td>${vehicleNumber}</td>
            <td>${contactNumber}</td>
            <td>${email}</td>
            <td><button onclick="deleteUser(this)">Delete</button></td>
        `;

      tableBody.appendChild(newRow);

      // Clear input fields
      document.getElementById("createLoginForm").reset();
      toggleOwnerForm(); // Hide the modal after creation
    } else {
      alert("Please fill in all fields.");
    }
  });

// Function to handle logout
document.getElementById("logoutButton").addEventListener("click", () => {
  alert("Logging out...");
  // Redirect to the login page (change the URL if necessary)
  window.location.href = "/index.html";
});

// Close the modal when the user clicks outside of it
window.onclick = function (event) {
  const modal = document.getElementById("ownerModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Close the modal when the user clicks the close button
document.addEventListener("DOMContentLoaded", function () {
  const closeButton = document.querySelector(".close");
  if (closeButton) {
    closeButton.addEventListener("click", toggleOwnerForm);
  }
});

// Function to delete a user from the registered users table
function deleteUser(button) {
  const row = button.parentNode.parentNode; // Get the row of the button clicked
  row.parentNode.removeChild(row); // Remove the row from the table
  updateRegisteredUserSerials(); // Update serial numbers after deletion
}

// Function to update the serial numbers in the registered users table
function updateRegisteredUserSerials() {
  const rows = document.querySelectorAll("#loginTableBody tr");
  rows.forEach((row, index) => {
    row.cells[0].innerText = index + 1; // Update serial number
  });
  
}
async function fetchOwners() {
    const userRef = ref(database, "owner/");
    try {
      // Retrieve data from the database
      const snapshot = await get(userRef);
  
      if (snapshot.exists()) {
        const userData = snapshot.val();
  
        // Clear the existing owners array if needed (optional)
        // defaultOwners = []; // Uncomment if you want to clear previous data
  
        // Push each owner's data into the existing owners array
        Object.keys(userData).forEach((key) => {
          defaultOwners.push({
            id: key, // Use the Firebase key as the owner id
            ...userData[key],
          });
        });
  
        console.log(defaultOwners);
        // Call a function to update the UI or table if necessary
        updateOwnersTable();
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  // Function to update the owners table with the latest data
  function updateOwnersTable() {
    const tableBody = document.getElementById("loginTableBody");
    tableBody.innerHTML = ""; // Clear the existing table rows
  
    defaultOwners.forEach((owner, index) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${owner.name}</td>
        <td>${owner.age}</td>
        <td>${owner.licenseNumber}</td>
        <td>${owner.vehicleNumber}</td>
        <td>${owner.contactNumber}</td>
        <td>${owner.email}</td>
        <td><button onclick="deleteUser(this)">Delete</button></td>
      `;
      tableBody.appendChild(newRow);
    });
  }
  
  // Call this function to fetch owners when the page loads
  document.addEventListener("DOMContentLoaded", fetchOwners);
  
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
import { auth, database } from "../firebaseConfig.js";

// Move functions outside the DOMContentLoaded scope
const logoutButton = document.querySelector("#logoutBtn");
logoutButton.addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
  window.location.href = "/index.html"; // Redirect to index.html
});

const ownerName = document.getElementById("ownerName");

onAuthStateChanged(auth, async (user) => {
  console.log(user.uid);
  const userRef = ref(database, "owner/" + user.uid);

  try {
    // Retrieve data from the database
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();

      // Display user data in the frontend
      ownerName.innerText = userData.name;

    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Sample Data for Testing
function addSampleData() {
  const busTableBody = document.getElementById('busTableBody');
  const bookingsTableBody = document.getElementById('bookingsTableBody');

  // Adding two sample rows to the Bus Table
  busTableBody.innerHTML += `
        <tr>
            <td>101</td>
            <td>John Doe</td>
            <td>City A</td>
            <td>City B</td>
            <td>10:00 AM - 1:00 PM</td>
            <td>AC Sleeper</td>
            <td>40</td>
            <td>Daily</td>
            <td>500</td>
        </tr>
        <tr>
            <td>102</td>
            <td>Jane Smith</td>
            <td>City C</td>
            <td>City D</td>
            <td>2:00 PM - 5:00 PM</td>
            <td>Non-AC Seating</td>
            <td>30</td>
            <td>Daily</td>
            <td>300</td>
        </tr>
    `;

  // Adding two sample rows to the Bookings Table
  bookingsTableBody.innerHTML += `
        <tr>
            <td>101</td>
            <td>City A</td>
            <td>City B</td>
            <td>2</td>
            <td>1000</td>
        </tr>
        <tr>
            <td>102</td>
            <td>City C</td>
            <td>City D</td>
            <td>1</td>
            <td>300</td>
        </tr>
    `;
}

// Call the function to add sample data when the page loads
window.onload = addSampleData;

document.getElementById('busForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const busNo = document.getElementById('busNo').value;
  const driverName = document.getElementById('driverName').value;
  const source = document.getElementById('source').value;
  const destination = document.getElementById('destination').value;
  const timeFrom = document.getElementById('timeFrom').value;
  const timeTo = document.getElementById('timeTo').value;
  const busType = document.getElementById('busType').value;
  const noOfSeats = document.getElementById('noOfSeats').value;
  const runs = document.getElementById('runs').value;
  const fare = document.getElementById('fare').value;

  const tableBody = document.getElementById('busTableBody');
  const newRow = tableBody.insertRow();

  newRow.innerHTML = `
        <td>${busNo}</td>
        <td>${driverName}</td>
        <td>${source}</td>
        <td>${destination}</td>
        <td>${timeFrom} - ${timeTo}</td>
        <td>${busType}</td>
        <td>${noOfSeats}</td>
        <td>${runs}</td>
        <td>${fare}</td>
    `;

  toggleBusForm(); // Close modal after submission

  alert("Bus information added successfully!")
});
const postBusButton = document.getElementById("postBusButton")
postBusButton.addEventListener("click", toggleBusForm())

const closeBtn = document.getElementById("closeBtn")
closeBtn.addEventListener("click", toggleBusForm())

// Corrected event listeners for buttons
const postBusButton = document.getElementById("postBusButton");
postBusButton.addEventListener("click", toggleBusForm);  // Do not invoke immediately

const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", toggleBusForm);  // Do not invoke immediately

// Toggle modal display for bus form
function toggleBusForm() {
  const modal = document.getElementById('busModal');
  modal.style.display = modal.style.display === 'none' || modal.style.display === '' ? 'block' : 'none';
}

const logoutBtn=document.getElementById("logoutBtn")
logoutBtn.addEventListener("click", logout())

function logout() {
  alert("Logged out successfully!");
  window.location.href = "/index.html"
}

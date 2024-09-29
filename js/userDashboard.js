import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
import { auth, database } from "../firebaseConfig.js";

document.addEventListener("DOMContentLoaded", function () {
  const locations = ["Chennai", "Kolkata", "Mumbai", "Delhi"];
  const busTypes = [
    "AC Sleeper",
    "AC Sitting",
    "Non AC Sleeper",
    "Non AC Sitting",
  ];
  const numberOfSeatsOptions = [40, 45, 50];

  function getRandomTime() {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    const ampm = Math.random() < 0.5 ? "AM" : "PM";
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  }

  function createBusCards() {
    const container = document.querySelector(".all-buses-container");

    let cardsHTML = "";
    for (let i = 0; i < 24; i++) {
      const source = locations[i % locations.length];
      const destination = locations[(i + 1) % locations.length];
      const busType = busTypes[Math.floor(Math.random() * busTypes.length)];
      const numberOfSeats =
        numberOfSeatsOptions[
          Math.floor(Math.random() * numberOfSeatsOptions.length)
        ];
      const fare = Math.floor(Math.random() * 1000) + 100;
      const departureTime = getRandomTime();
      const reachingTime = getRandomTime();

      cardsHTML += `
                <div class="bus-card">
                    <div class="left-div">
                        <div class="image-row">
                            <div class="image-container">
                                <img src="/images/${source.toLowerCase()}.jpg" alt="Source" class="bus-image">
                                <label>${source}</label>
                            </div>
                            <div class="arrow">→</div>
                            <div class="image-container">
                                <img src="/images/${destination.toLowerCase()}.jpg" alt="Destination" class="bus-image">
                                <label>${destination}</label>
                            </div>
                        </div>
                        <div class="time-info">
                            <p>Departure Time: ${departureTime}</p>
                            <p>Reaching Time: ${reachingTime}</p>
                        </div>
                    </div>
                    <div class="right-div">
                        <p>Fare: ₹${fare}</p>
                        <p>Runs On: Daily</p>
                        <p>Bus Type: ${busType}</p>
                        <p>No of Seats: ${numberOfSeats}</p>
                        <p>Contact Number: 123-456-7890</p>
                    </div>
                </div>
            `;
    }

    container.innerHTML = cardsHTML;
  }

  createBusCards();
});

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

const userName = document.getElementById("userName");

onAuthStateChanged(auth, async (user) => {
  console.log(user.uid);
  const userRef = ref(database, "user/" + user.uid);

  try {
    // Retrieve data from the database
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();

      // Display user data in the frontend
      userName.innerText = userData.name;
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

function search() {
  const firstDropdownValue = document.getElementById("firstDropdown").value;
  const secondDropdownValue = document.getElementById("secondDropdown").value;

  if (firstDropdownValue && secondDropdownValue) {
    // Redirect to the booking page with the selected values
    alert(`Booking Bus from ${firstDropdownValue} to ${secondDropdownValue}`);
    const url = `/html/booking.html?source=${firstDropdownValue}&destination=${secondDropdownValue}`;
    window.open(url, "_blank"); // Open in a new tab
  } else {
    alert("Please select both source and destination.");
  }
}

// Temporary data storage
let users = [];
let buses = [];

// Login function
function login(role) {
    alert(role + " logged in!");
    if (role === "admin") {
        window.location.href = "adminDashboard.html";
    } else if (role === "owner") {
        window.location.href = "ownerDashboard.html";
    } else {
        window.location.href = "userDashboard.html";
    }
}

// Post bus details
function postBusDetails() {
    const busType = document.getElementById("busType").value;
    const busContact = document.getElementById("busContact").value;
    buses.push({ type: busType, contact: busContact });
    alert("Bus details posted!");
}

// Search bus location
function searchBusLocation() {
    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    document.getElementById("busResults").innerHTML = `Bus found from ${source} to ${destination}`;
}

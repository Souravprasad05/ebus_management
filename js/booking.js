// Function to retrieve and display booking details from URL parameters
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('source');
    const destination = params.get('destination');
    
    // Generate random departure and reaching times, bus number, available seats, and fare
    const departureTime = getRandomTime();
    const reachingTime = getRandomTime();
    const busNumber = Math.floor(Math.random() * 10000) + 1; // Random bus number
    const seatsAvailable = Math.floor(Math.random() * (50 - 45 + 1)) + 45; // Random seats (between 45 and 50)
    const fare = Math.floor(Math.random() * 1000) + 100; // Random fare

    // Display the values
    document.getElementById('source').textContent = source;
    document.getElementById('destination').textContent = destination;
    document.getElementById('departureTime').textContent = departureTime;
    document.getElementById('reachingTime').textContent = reachingTime;
    document.getElementById('busNumber').textContent = busNumber;
    document.getElementById('seatsAvailable').textContent = seatsAvailable;
    document.getElementById('fare').textContent = fare;
});

// Function to generate a random time
function getRandomTime() {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    const ampm = Math.random() < 0.5 ? 'AM' : 'PM';
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
}

// Function to open the confirmation modal
function openConfirmModal() {
    document.getElementById('modalSource').textContent = document.getElementById('source').textContent;
    document.getElementById('modalDestination').textContent = document.getElementById('destination').textContent;
    document.getElementById('totalFare').textContent = document.getElementById('fare').textContent;
    document.getElementById('confirmModal').style.display = 'flex';
}

// Function to calculate total fare based on seat count
function calculateTotal() {
    const fare = parseInt(document.getElementById('fare').textContent);
    const seatCount = document.getElementById('seatCount').value;
    document.getElementById('totalFare').textContent = fare * seatCount;
}

// Function to confirm the bus booking
function confirmOrder() {
    const seatCount = document.getElementById('seatCount').value;
    showCustomAlert(`Bus booked successfully! \nJourney from ${document.getElementById('modalSource').textContent} to ${document.getElementById('modalDestination').textContent} for ${seatCount} seat(s). Check your "My Booking" section for tickets.`);
    
    // Close the booking modal
    document.getElementById('confirmModal').style.display = 'none';
}

// Function to show a custom alert and dissolve the page
function showCustomAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';
    alertBox.textContent = message;

    // Append to body
    document.body.appendChild(alertBox);

    // Start fade-out effect after showing the alert
    setTimeout(() => {
        alertBox.remove(); // Remove the alert after 5 seconds
        dissolvePage(); // Call dissolve function
    }, 4000); // Alert duration
}

// Function to dissolve the page
function dissolvePage() {
    document.body.classList.add('dissolve');
    setTimeout(() => {
        window.location.href = '/html/myBookings.html'; // Redirect after dissolve
    }, 500); // Adjust time to match your CSS transition duration
}

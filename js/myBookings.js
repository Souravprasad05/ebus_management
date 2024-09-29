// Sample booking data (you would typically fetch this from a server or local storage)
const bookings = [
    {
        source: 'City A',
        destination: 'City B',
        departureTime: '10:00 AM',
        journeyDate: '29 september, 2024',
        busType: 'AC Sleeper',
        busNumber: '1234',
        contactNumber: '9876543210',
        seatsBooked: 2,
        totalAmount: 1200,
    },
    {
        source: 'City C',
        destination: 'City D',
        departureTime: '3:00 PM',
        journeyDate: '29 september, 2024',
        busType: 'Non AC Sitting',
        busNumber: '5678',
        contactNumber: '9123456780',
        seatsBooked: 1,
        totalAmount: 600,
    }
];

// Function to display bookings
function displayBookings() {
    const bookingCards = document.getElementById('bookingCards');
    bookingCards.innerHTML = ''; // Clear previous cards

    bookings.forEach(booking => {
        const card = document.createElement('div');
        card.className = 'booking-card';

        const leftDiv = document.createElement('div');
        leftDiv.className = 'left-div';
        leftDiv.innerHTML = `
            <p><strong>Source Location:</strong> ${booking.source}</p>
            <p><strong>Destination Location:</strong> ${booking.destination}</p>
            <p><strong>Departure Time:</strong> ${booking.departureTime}</p>
            <p><strong>Reaching Time:</strong> ${booking.reachingTime}</p>
            <p><strong>Bus Type:</strong> ${booking.busType}</p>
        `;

        const rightDiv = document.createElement('div');
        rightDiv.className = 'right-div';
        rightDiv.innerHTML = `
            <p><strong>Bus Number:</strong> ${booking.busNumber}</p>
            <p><strong>Contact Number:</strong> ${booking.contactNumber}</p>
            <p><strong>Total Seats Booked:</strong> ${booking.seatsBooked}</p>
        `;

        const totalAmount = document.createElement('p');
        totalAmount.className = 'amount';
        totalAmount.innerHTML = `Total Amount Paid: ₹${booking.totalAmount}`;

        card.appendChild(leftDiv);
        card.appendChild(rightDiv);
        card.appendChild(totalAmount);
        bookingCards.appendChild(card);
    });
}

// Function to go back to the dashboard
function goToDashboard() {
    window.location.href = "/HTML/userDashboard.html"; // Adjust the path as necessary
}


// Call the function to display bookings on page load
document.addEventListener('DOMContentLoaded', displayBookings);

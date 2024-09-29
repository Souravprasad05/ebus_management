document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  // Default admin email and password
  const defaultEmail = "admin@gmail.com";
  const defaultPassword = "admin123";

  if (email === defaultEmail && password === defaultPassword) {
    alert("Login successful!");
    // Redirect to admin dashboard or another page
    window.location.href = "adminDashboard.html";
  } else {
    alert("Invalid email or password. Please try again.");
  }
});
export const storedPassword = "Finance2000";

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const togglePasswordSlash = document.getElementById("togglePasswordSlash");
  const errorMessage = document.getElementById("errorMessage");

  // Toggle password visibility
  togglePassword.addEventListener("click", function() {
    passwordInput.type = "text";
    togglePassword.style.display = "none";
    togglePasswordSlash.style.display = "inline";
  });

  // Toggle password visibility off
  togglePasswordSlash.addEventListener("click", function() {
    passwordInput.type = "password";
    togglePasswordSlash.style.display = "none";
    togglePassword.style.display = "inline";
  });

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    errorMessage.textContent = "";  // Clear any existing error messages
    
    // Credentials stored in the code (modify only here)
    const storedUsername = "Financial Freedom";
    const storedPassword = "Finance2000";
    
    // Making username case insensitive by converting both to lower case
    if (usernameInput.value.toLowerCase() === storedUsername.toLowerCase() && 
    passwordInput.value === storedPassword) {
      // Save the login status to local storage
      localStorage.setItem("loggedIn", "true");

      // Alert on successful login
      alert("Login successful!");

      // Redirect to main webpage
      window.location.href = "index.html";  // Replace 'main.html' with the URL of your main webpage
    } else {
      errorMessage.textContent = "Invalid username or password.";
    }
  });
});

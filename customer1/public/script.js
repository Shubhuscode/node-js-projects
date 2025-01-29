// public/script.js
document.getElementById("resetButton").addEventListener("click", () => {
    const inputField = document.querySelector('input[name="address"]');
    inputField.value = ""; // Clear the input field
    inputField.closest("form").submit(); // Submit the form
  });
  
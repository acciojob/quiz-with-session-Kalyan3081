//your JS code here. If required.
// Function to get a cookie value by name
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to apply preferences from cookies
function applyPreferences() {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize) {
    document.documentElement.style.setProperty(
      "--fontsize",
      savedFontSize + "px"
    );
    document.getElementById("fontsize").value = savedFontSize;
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty("--fontcolor", savedFontColor);
    document.getElementById("fontcolor").value = savedFontColor;
  }
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form from submitting normally

  const fontSizeInput = document.getElementById("fontsize");
  const fontColorInput = document.getElementById("fontcolor");

  let fontSize = parseInt(fontSizeInput.value, 10);
  const fontColor = fontColorInput.value;

  // Validate font size
  if (isNaN(fontSize) || fontSize < 8) {
    fontSize = 8;
  } else if (fontSize > 72) {
    fontSize = 72;
  }

  // Apply the preferences to CSS variables
  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);

  // Save preferences in cookies for 30 days
  setCookie("fontsize", fontSize, 30);
  setCookie("fontcolor", fontColor, 30);

  alert("Preferences saved successfully!");
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  applyPreferences(); // Apply saved preferences on page load

  const form = document.getElementById("preferences-form");
  form.addEventListener("submit", handleFormSubmit); // Attach event listener to form
});
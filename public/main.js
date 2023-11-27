let storedEmail = "";
let storedPassword = "";

function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if ((password === confirmPassword) && (String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )) && (!password.length == 0)) {
    storedEmail = email;
    storedPassword = password;
    console.log("User eamil is: "+ storedEmail);
    console.log("User password is: "+ storedPassword);
    alert("Account created successfully!");
  } else {
    alert("Invalid email or password");
  }
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (email === storedEmail && password === storedPassword) {
    alert("Successfully signed in!");
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password");
  }
}

function cart() {
    window.location.href = "/cart.html";
}

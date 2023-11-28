let storedEmail = "";
let storedPassword = "";
let slideIndex = 0;
showSlides();

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

function showSlides() {
  const seconds = 8;

  let i;
  let timer = seconds * 1000;
  let slides = document.getElementsByClassName("banner-slide");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, timer);
}


document.addEventListener('DOMContentLoaded', function(){
  const ThemeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  const CurrentTheme = localStorage.getItem('theme');
  if(CurrentTheme){
    body.classList.add(CurrentTheme);
  }

  ThemeToggle.addEventListener('click' , function(){
    body.classList.toggle('dark-theme');

    const theme = body.classList.contains('dark-theme') ? 'dark-theme' : '';
    localStorage.setItem('theme', theme);
  });

});
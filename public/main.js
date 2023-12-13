let slideIndex = 0;
showSlides();

function signup() {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);

      if (data.message === 'Registration successful') {
        window.location.href = '/login.html';
      }
    })
    .catch((error) => {
      console.error('Error during registration:', error);
    });
}

function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);

      if (data.message === 'Login successful') {
        window.location.href = '/index.html';
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
    });
}


function cart() {
    window.location.href = "/cart.html";
}

function showSlides() {
  const seconds = 6;

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
"use strict";
import { toastNotification } from "../scripts/toastNotification.js";


//TODO:post to API
//TODO: check that the password contains 8 characters and bith numbers and letters.
//TODO: add a boolean to the local storage that the user is logged in.
//TODO: redirect to homeplage.
//TODO: make profile btn in header go to sign in page when pressed and not logged in.
//TODO: make profile page go tp a profile page when pressed and logged in.

// The URL for the register endpoint
// const registerUrl= "https://v2.api.noroff.dev/auth/register";

// function getUserInput() {
//   const nameInput = document.getElementById("username").value;
//   const emailInput = document.getElementById("email").value;
//   const password1Input = document.getElementById("password1").value;
//   const password2Input = document.getElementById("password2").value;
//   let uniquePassword = "";

//   if (password1Input === password2Input) {
//     uniquePassword = password1Input;
//   }
//   console.log("name: ", nameInput);

//   const userData = {
//     name: nameInput,
//     email: emailInput,
//     password: uniquePassword,
//   };
// console.log(userData)
//   return userData
// }

async function registerUser(url, userData) {
  // clearErrormessage()
  //  const userData = getUserInput();
  try {
    // 1. Construct the options object for the POST request
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // 2. Stringify the user data
    };

    const response = await fetch(url, postOptions);

    if (!response.ok) {
      // Log the response body to see error details from the API
      const errorData = await response.json();
      // setErrorMessage(errorData)
      throw new Error(`Registration failed: ${JSON.stringify(errorData)}`);
      // ------------------------------
    }

    // 4. Parse the successful response JSON
    const data = await response.json();

    console.log("User registered successfully:", data);
    return data;
  } catch (error) {
    console.error("There was an error:", error);
  }
}

//toastnotafication
// function setErrorMessage(alert, message){
// alert.innerHtml
//   alertEmail.classList.add("alert");
// }

// function clearErrormessage(){

// }

// Call the function to register the user

const registersubmitBtn = document.getElementById("registerBtn");
registersubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  console.log("click");
  const nameInput = document.getElementById("username").value;
  const emailInput = document.getElementById("registration-email").value;
  const password1Input = document.getElementById("password1").value;
  const password2Input = document.getElementById("password2").value;
  let uniquePassword = "";
  const alertPassword = document.getElementById("password-error");
  // trenger jeg denne?
  // alert.classList.remove("alert") 
const emailCriteria = "stud.noroff.no"

  if(!emailInput.includes(emailCriteria)) {
   const alertEmail = document.getElementById("email-error")
  alertEmail.innerHTML= 'Email must contain "stud.noroff.no"';
  alertEmail.classList.add("alert");}

  if (password1Input === password2Input) {
    if (password1Input.length < 8) {
      console.log("length error")
      alertPassword.innerHTML = "Passwords must be at least 8 characters long";
      alertPassword.classList.add("alert");
    } else {
      uniquePassword = password1Input;
    }
  } else {
    alertPassword.innerHTML = "Passwords do not match";
    alertPassword.classList.add("alert");
  }

  const registerUrl = "https://v2.api.noroff.dev/auth/register";

  console.log("name: ", nameInput);

  const userData = {
    name: nameInput,
    email: emailInput,
    password: uniquePassword,
  };
  

const icon = document.createElement("div");
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>`;
  const info = document.createElement("p");
  info.textContent = `You are logged in!`;


  toastNotification(icon, info)
  registerUser(registerUrl, userData);



//  displayUserToastNotification();
//   setTimeout(() => {
//     removeToastNotification();
//   }, 2000);

  // location.href="../index.html"
});

// const registersubmitBtn1 = document.getElementById("registerBtn1");
// registersubmitBtn1.addEventListener("click", (e) => {
//   e.preventDefault()
//   console.log("eventlistener works!")
// })


// function displayUserToastNotification() {
//   const toastDiv = document.createElement("div");
//   toastDiv.classList.add("toastNotification");

//   const checkmark = document.createElement("div");
//   checkmark.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>`;
//   const info = document.createElement("p");
//   info.textContent = `You are logged in!`;

//   toastDiv.append(checkmark, info);
//   document.querySelector(".toast-parent").append(toastDiv);
// }

// function removeToastNotification() {
//   document.querySelector(".toastNotification").remove();
// }
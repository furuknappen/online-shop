async function registerUser(url, userData) {

  try {
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
    }

    // 4. Parse the successful response JSON
    const data = await response.json();

    console.log("User login successfull:", data);
    return data;
  } catch (error) {
    console.error("There was an error:", error);
  }
}

async function loginUser(url, userData) {
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
      throw new Error(`Login failed: ${JSON.stringify(errorData)}`);
      // ------------------------------
    }

    // 4. Parse the successful response JSON
    const data = await response.json();

    console.log("User logged in successfully:", data);
    return data.data;
  } catch (error) {
    console.error("There was an error:", error);
  }
}



const loginsubmitBtn = document.getElementById("loginBtn");
loginsubmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  console.log("click");
  const emailInput = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;


  const loginUrl = "https://v2.api.noroff.dev/auth/login";

  const userData = {
    email: emailInput,
    password: password,
  };
  

  const userInfo = await loginUser(loginUrl, userData);

 addUserInfoLocalStorage(userInfo)

  location.href="../index.html"
});

function addUserInfoLocalStorage(userInfo) {
  let storage = JSON.parse(localStorage.getItem("userInfo")) || {};
  storage= {...storage, ...userInfo}
  localStorage.setItem("userInfo", JSON.stringify(storage));
 console.log("storage: ", storage)
 console.log("userInfo: ", userInfo)
}

const user = JSON.parse(localStorage.getItem("userInfo"))

const userAccessToken = user.accessToken;
console.log("Access : " + userAccessToken)
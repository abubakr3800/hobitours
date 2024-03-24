// Define a function that returns a promise
// to fetch data from an API
  function sendApi(url, data, method) {
    // Create a new promise
    return new Promise((resolve, reject) => {
      // Create a new XHR object
      const xhr = new XMLHttpRequest();
      // Set the response type to JSON
      xhr.responseType = "json";
      // Open the request with the given url
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-type", "application/json");
      // Define what to do when the request is loaded
      xhr.onload = function () {
        // Check if the status is 200 (OK)
        if (this.status === 200) {
          // Resolve the promise with the response object
          resolve(this.response);
        } else {
          // Reject the promise with the status text
          reject(new Error(this.statusText));
        }
      };
      // Define what to do in case of an error
      xhr.onerror = function () {
        // Reject the promise with the status text
        reject(new Error("An error occurred while making the request"));
      };
      // Send the request
      xhr.send(JSON.stringify(data));
    });
  }
  
  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  }
  
  function loadPage(href) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    if (xmlhttp.status === 200) {
      return xmlhttp.responseText;
    } else {
      throw new Error(xmlhttp.statusText);
    }
  }
  
function checkAuth() {
    // var accessToken = localStorage.getItem("token");
    var expireDate = new Date(user["exp"] * 1000),
      currentDate = new Date();
    // console.log(token);
    console.log(currentDate);
    if (localStorage.getItem("token") != null || undefined) {
      if (expireDate > currentDate) {
        // console.log(`Access token value: ${accessToken}`);
        console.log(expireDate);
        return true;
      } else {
        logout();
        // console.log('Access token not found.');
        return false;
      }
    } else {
      return false;
    }
  }
  
  // checkAuth();
  
  function logout() {
    localStorage.removeItem("token");
    checkAuth() ? "" : (location.href = "./sign-in.html");
  }
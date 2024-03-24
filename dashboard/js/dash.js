class User {
  claim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";
  token;
  id;
  name;
  email;
  exp;
  constructor(token) {
    this.token = token;
    this.id = parseJwt(token)[this.claim + "id"];
    this.name = parseJwt(token)[this.claim + "name"];
    this.email = parseJwt(token)[this.claim + "emailaddress"];
    this.exp = parseJwt(token)["exp"];
  }
}
var user;

var languages = ["it", "en"],
  allOffers = [], alldests = [];

class Offer {
  name;
  day_night;
  description;
  image;
  languageCode;
}

class Dest {
  name;
  places = [];
  description;
  image;
  languageCode;
}


// Define a function that returns a promise
function postApi(url, str_json, img) {
  // Send the JSON data to your PHP script
  // var url = 'capilot.php';
  var nOff = JSON.parse(str_json);

  // ************ add text ************
  fetch(url, {
    method: "POST",
    body: str_json,
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  })
    .then((response) => {
      // console.log(response.text());
      // *************************** newly added *****************************
      console.log(response)
      // addOffImage("https://localhost:7181/Offer/img/" + response.data, img);
      addOffImage("https://hobitours.somee.com/Offer/img/" + response.data, img);
      // *************************** newly added *****************************
      return response;
    })
    .then((data) => {
      // Handle the response from the server
      console.log(data);
    })
    .then((txt) => {
      // Handle the response from the server
      console.log(txt);
    });
}

function addOffImage(url, img) {
  var inputFile = img;
  var data = new FormData();
  data.append("imgName", inputFile.files[0].name);
  data.append("img", inputFile.files[0]);
  console.log(inputFile.files[0]);
  // ************ add image ************
  fetch(url, {
    method: "PUT",
    body: data,
    headers: {
      // 'Content-Type': 'application/json'
      "Accept": "*/*",
    },
  })
    .then((response) => {
      response.text();
      return response;
    })
    .then((txt) => {
      // Handle the response from the server
      console.log(txt);
    });
}

// Define a function that returns a promise
function deleteApi(url, str_json) {
  // Send the JSON data to your PHP script
  // var url = 'capilot.php';
  fetch(url, {
    method: "DELETE",
    body: str_json,
  })
    .then((response) => {
      response.text();
      return response;
    })
    .then((txt) => {
      // Handle the response from the server
      console.log(txt);
    });
}

// Define a function that returns a promise

function putApi(url, data, img) {
  // console.log(data);
  // Create a new promise
  return new Promise(function (resolve, reject) {
    // Create a new XHR object
    var xhr = new XMLHttpRequest();
    // Set the response type to JSON
    xhr.responseType = "json";

    // Open the request with the given url
    xhr.open("PUT", url, true);
    // xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader("Accept", "*/*");
    // Define what to do when the request is loaded
    xhr.onload = function () {
      // Check if the status is 200 (OK)
      if (this.status === 200) {
        // Resolve the promise with the response object
        resolve(this.response);
      } else {
        // Reject the promise with the status text
        reject(this.statusText);
      }
    };
    // Send the request
    xhr.send(JSON.stringify(data));
  });
}

// Define a function that returns a promise
function reqApi(url) {
  // Create a new promise
  return new Promise(function (resolve, reject) {
    // Create a new XHR object
    var xhr = new XMLHttpRequest();
    // Set the response type to JSON
    xhr.responseType = "json";
    // Open the request with the given url
    xhr.open("GET", url, true);
    // Define what to do when the request is loaded
    xhr.onload = function () {
      // Check if the status is 200 (OK)
      if (this.status === 200) {
        // Resolve the promise with the response object
        resolve(this.response);
      } else {
        // Reject the promise with the status text
        reject(this.statusText);
      }
    };
    // Send the request
    xhr.send();
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

// if ( Number(token) != NaN ) {
//     // updatePass(Number(result.data));
//     alert("you didn't confirm your identity yet please return and change your password");
//     window.location.href = "./sign-in.html"
// }

function sendApi(url, data, method) {
  console.log(url);
  console.log(data);
  console.log(method);
  // Create a new promise
  return new Promise(function (resolve, reject) {
    // Create a new XHR object
    var xhr = new XMLHttpRequest();
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
        reject(this.statusText);
      }
    };
    // Send the request
    xhr.send(data);
  });
}

function loadPage(href)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}
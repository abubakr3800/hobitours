class User {
    token;
    name;
    email;
    id;
    exDate;
    constructor (token){
        this.token = token;
    }
}

var logUser = new User() ;

document.getElementById("logForm").onsubmit = function (e) {
    e.preventDefault();
    // location.href = "./index.html"

    // console.log(this.email.value);
    if (this.email.value == "" || this.password.value == "") {
        alert("please fill boxes with right info");
    }else {
        var userData ={
            email : this.email.value,
            password: this.password.value
        };
        // Convert the object to a JSON string
        // var str_json = JSON.stringify(userData);
        // console.log(str_json);
        var signUser = signApi("https://hobitours.somee.com/user/login/" , userData);
        // console.log(signUser);
        signUser.then((result)=>{
            console.log(result);
            if (result.status === 400) {
                alert('Wrong Email or Password');
            } else if (result.status === 500) {
                alert('Server Error')
            } else {
                // console.log(result.data.length);
                // console.log(result.data);
                // let userInfo = parseJwt(result.data) , claim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";
                // console.log(userInfo[claim + "emailaddress"]);
                token = result.data;
                localStorage.setItem("token", result.data);
                if ( isNaN(Number(result.data)) ) {
                    console.log(token);
                    window.location.replace("./index.html");
                } else{
                    updatePass(Number(result.data));
                }
            }
        })
         .catch((err)=>console.log(err));
    }

}

function updatePass(userId) {
    console.log(userId);
    let upForm = document.getElementById("logForm"),
        newPass = document.createElement("input"),
        newPassLabel = document.createElement("label"),
        confPass = document.createElement("input"),
        confPassLabel = document.createElement("label"),
        btnSubmit = document.createElement("button");
    
        newPass.setAttribute("class" , "form-control mt-3");
        newPassLabel.setAttribute("class" , "form-label ");
        confPass.setAttribute("class" , "form-control mt-3");
        confPassLabel.setAttribute("class" , "form-label ");
        
        upForm.innerHTML = "";
        newPass.textContent = "Set New Password";
        confPass.textContent = "Confirm Your Password";
        newPass.setAttribute("type","password")
        newPass.placeholder="New Password";
        confPass.setAttribute("type","password");
        confPass.placeholder="Confirm New Password";
        btnSubmit.textContent= "Update" ;
        btnSubmit.className ="btn btn-primary mt-3 ";
        btnSubmit.addEventListener("click", function(){
            checkPassword();
        });

        upForm.appendChild(newPassLabel);
        upForm.appendChild(newPass);
        // upForm.appendChild(document.createElement("br"));
        upForm.appendChild(confPassLabel);
        upForm.appendChild(confPass);
        // upForm.appendChild(document.createElement("br"));
        // upForm.appendChild(document.createElement("br"));
        upForm.appendChild(btnSubmit);

    function checkPassword() {
        if (newPass.value === confPass.value && newPass.value !== "" && confPass.value!== ""){
            // sendReq(userId, newPass.value);
            var newUser = {
                id: userId,
                password :  newPass.value
            }
            putApi( 'https://hobitours.somee.com/user/updatePassword' , newUser);
            alert ("Password Updated Successfully!");
            window.location.replace("./sign-in.html");
        } else {
            alert("Please enter a valid password or leave both fields empty to reset the password.")
        }
    }
}

// function sendReq(id , pass){
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("PUT", "/user/updatePassword", true);
//     xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhttp.send();
// }

function signApi(url , data) {
    console.log(data);
    // Create a new promise
  return new Promise(function(resolve, reject) {
    
    // Create a new XHR object
    var xhr = new XMLHttpRequest();
    // Set the response type to JSON
    xhr.responseType = "json";
    
    // Open the request with the given url
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    // Define what to do when the request is loaded
    xhr.onload = function() {
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

function putApi(url , data) {
    console.log(data);
    // Create a new promise
  return new Promise(function(resolve, reject) {
    
    // Create a new XHR object
    var xhr = new XMLHttpRequest();
    // Set the response type to JSON
    xhr.responseType = "json";
    
    // Open the request with the given url
    xhr.open("PUT", url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    // Define what to do when the request is loaded
    xhr.onload = function() {
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
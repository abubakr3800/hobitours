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
    // localStorage.setItem("token" , "112233")
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
        var str_json = JSON.stringify(userData);
        // console.log(str_json);
        var signUser = signApi("https://hobitours.somee.com/user/login/" , str_json);
        console.log(signUser);
        signUser.then((result)=>{
            console.log(result);
            if (result.status === 400) {
                alert('Wrong Email or Password');
            } else if (result.status === 500) {
                alert('Server Error')
            } else {
                logUser.token = result.token;
                logUser.name = result.data.username;
                logUser.id= result.data._id;
                logUser.exDate = new Date().getTime() + parseInt(result.data.expiresIn);
                setCookie("token", logUser.token , logUser.exDate );
                setCookie("userId", logUser.id , logUser.exDate );
                window.location.replace("./index.html");
            }
        })
         .catch((err)=>console.log(err));
    }

}


// Define a function that returns a promise
function signApi(url,str_json) {
    
    // Send the JSON data to your PHP script
    // var url = 'capilot.php';
    fetch(url, {
      method: 'POST',
      body: str_json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(
        (response) => {
            response.text()
            return response
        })
    .then(txt => {
      // Handle the response from the server
      console.log(txt);
    });
  }
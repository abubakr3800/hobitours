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
    localStorage.setItem("token" , "112233")
    location.href = "./index.html"
}
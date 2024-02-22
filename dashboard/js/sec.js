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
function Auth() {
    e.preventDefault();
    localStorage.setItem("token" , "112233")
    location.href = "./"
}
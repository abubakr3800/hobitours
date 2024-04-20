class User {
  claim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";
  token;
  id;
  name;
  email;
  exp;
  constructor (token){
    this.token = token;
    this.id = parseJwt(token)[this.claim + "id"];
    this.name = parseJwt(token)[this.claim + "name"];
    this.email = parseJwt(token)[this.claim + "emailaddress"];
    this.exp = parseJwt(token)["exp"];
  }
}
var user;
window.onload = function () {
  document.getElementById("sidebar").innerHTML = loadPage('sidenav.html');
  token = localStorage.getItem("token");
  // language = (parseURLParams(window.location.href).lan == null || undefined ? "it" : parseURLParams(window.location.href).lan[0] ) ;
  // getObject("https://hobitours.somee.com/Offer/all/" + language);
  if (token == null || undefined || "") {
    alert("please sign in first");
    window.location.replace("./sign-in.html");
  }else{
    if ( isNaN(Number(token)) ) {
      // console.log(token);
      user = new User(token);
      document.getElementById("user-name").textContent=user.name;
      checkAuth();
      // window.location.replace("./index.html");
    } else{
      // updatePass(Number(result.data));
      alert("please confirm your identity");
      window.location.replace("./sign-in.html");
    }
  }
}

function reloadOffers() {
  selectoffers = reqApi("https://hobitours.somee.com/Offer/all/it/");
  return selectoffers;
}
var selectoffers = reqApi("https://hobitours.somee.com/Offer/all/it/");

function checkAuth() {
  // var accessToken = localStorage.getItem("token");
  var expireDate = new Date(user['exp'] * 1000) ,
      currentDate = new Date();
  // console.log(token);
  console.log(currentDate);
  if (localStorage.getItem("token") != null || undefined) {  
    if (expireDate > currentDate) {
    // console.log(`Access token value: ${accessToken}`);
    console.log(expireDate);
      return true
    } else {
      logout();
      // console.log('Access token not found.');
      return false
    }
  }else {
    return false
  }
}

// checkAuth();

function logout() {
  localStorage.removeItem("token")
  checkAuth() ? "" : location.href="./sign-in.html";
}

var languages = ["it" , "en", "ar"], allOffers = [];

class Offer {
  name;
  day_night;
  description;
  image;
  languageCode;
}

function loadOffers() {
  document.getElementById("secTitle").innerHTML = 'Watch Offers';
  document.getElementById('content').innerHTML = `<div class="table-responsive small"><table id="offers" class="display" width="100%"></table></div>`;
  // Iterate over each language and make an API call for offers in that language
  if (offtab == null || undefined) {
    var offtab = new DataTable('#offers', {
      columns: [
          { title: 'id' },
          { title: 'offer head' },
          { title: 'offer' },
          { title: 'Days' },
          { title: 'Nights' },
          { title: 'Language' },
          { title: 'mange' },
      ],
        data: []
    });
  }

  var offersTable , offers ;
  languages.forEach(lan=> {
    offersTable = [] ; 
    // console.log(e);
    offers = reqApi("https://hobitours.somee.com/Offer/all/" + lan);
    offers.then(d=>{
    // selectoffers.then(d=>{
      // var ofNum = d.data.length;
      // console.log(ofNum);
      var singleOffer = [];
      d.data.forEach(e => {
        // offersTable.push(e);
        singleOffer = []   ; 
        singleOffer.push(e.id)
        singleOffer.push(e.name)
        singleOffer.push(e.description)
        singleOffer.push(e.day_night)
        offersTable.push(singleOffer)
        offtab.row.add([singleOffer[0] ,singleOffer[1] ,singleOffer[2].slice(0 , 50) + ` ..... <a href="#" onclick="alert('${e.description}')" >view all</a>` , singleOffer[3].split(",")[0] , singleOffer[3].split(",")[1] , lan , `<div class="input-group mb-3"><button class="form-control btn btn-primary" onclick="showEdit(${e.id} , '${lan}')"><i class="bi bi-pen"></i></button><button class="form-control btn btn-danger" onclick="deleteOffer(${e.id})"><i class="bi bi-trash"></i></button></div>` ]).draw(false)
        // console.log(e);
      });
    })
  })

  allOffers.push(offersTable)
  // offtab.row.add(allOffers).draw(false);
}

function manageOffers() {
  document.getElementById("secTitle").innerHTML = 'Add Offer';
  var manageForm = document.createElement("form");
      manageForm.setAttribute('method',"post");
      manageForm.setAttribute("class" , "row g-3 needs-validation");
      manageForm.setAttribute("enctype" , "multipart/form-data");
      // manageForm.setAttribute('action','#');

  var imgLabel = document.createElement('label');
      imgLabel.setAttribute("class" , "form-label");
      imgLabel.innerText = "The image of the offer";
  var imgContainer = document.createElement("div");
      imgContainer.setAttribute("class" , "col-md-12");
  var imgFile = document.createElement("input");
      imgFile.setAttribute("type" , "file");
      imgFile.setAttribute("name" , "image");
      imgFile.setAttribute("class" , "form-control");
      imgContainer.appendChild(imgLabel);
      imgContainer.appendChild(imgFile);
      manageForm.appendChild(imgContainer) ;

  var enLabel = document.createElement('label');
      enLabel.setAttribute("class" , "form-label");
      enLabel.innerText = "offer name in english";
  var enContainer = document.createElement("div");
      enContainer.setAttribute("class" , "col-md-6");
  var enOfferName = document.createElement("input");
      enOfferName.setAttribute("type" , "text");
      enOfferName.setAttribute("name" , "enname");
      enOfferName.setAttribute("class" , "form-control");
      enContainer.appendChild(enLabel);
      enContainer.appendChild(enOfferName);
      manageForm.appendChild(enContainer) ;

  var itLabel = document.createElement('label');
      itLabel.setAttribute("class" , "form-label");
      itLabel.innerText = "offer name in italic";
  var itContainer = document.createElement("div");
      itContainer.setAttribute("class" , "col-md-6");
  var itOfferName = document.createElement("input");
      itOfferName.setAttribute("type" , "text");
      itOfferName.setAttribute("name" , "itname");
      itOfferName.setAttribute("class" , "form-control");
      itContainer.appendChild(itLabel);
      itContainer.appendChild(itOfferName);
      manageForm.appendChild(itContainer) ;

  var dLabel = document.createElement('label');
      dLabel.setAttribute("class" , "form-label");
      dLabel.innerText = "Days of the offer";
  var dContainer = document.createElement("div");
      dContainer.setAttribute("class" , "col-md-6");
  var days = document.createElement("input");
      days.setAttribute("type" , "number");
      days.setAttribute("name" , "days");
      days.setAttribute("class" , "form-control");
      dContainer.appendChild(dLabel);
      dContainer.appendChild(days);
      manageForm.appendChild(dContainer) ;

  var nLabel = document.createElement('label');
      nLabel.setAttribute("class" , "form-label");
      nLabel.innerText = "Nights of the offer";
  var nContainer = document.createElement("div");
      nContainer.setAttribute("class" , "col-md-6");
  var nights = document.createElement("input");
      nights.setAttribute("type" , "number");
      nights.setAttribute("name" , "nights");
      nights.setAttribute("class" , "form-control");
      nContainer.appendChild(nLabel);
      nContainer.appendChild(nights);
      manageForm.appendChild(nContainer) ;

  var endesLabel = document.createElement('label');
      endesLabel.setAttribute("class" , "form-label");
      endesLabel.innerText = "Offer Description in English";
  var endesContainer = document.createElement("div");
      endesContainer.setAttribute("class" , "col-md-12");
  var endescrInput = document.createElement("textarea");
      endescrInput.setAttribute("name" , "endescription");
      endescrInput.setAttribute("class" , "form-control");
      endesContainer.appendChild(endesLabel);
      endesContainer.appendChild(endescrInput);
      manageForm.appendChild(endesContainer) ;

  var itdesLabel = document.createElement('label');
      itdesLabel.setAttribute("class" , "form-label");
      itdesLabel.innerText = "Offer Description in English";
  var itdesContainer = document.createElement("div");
      itdesContainer.setAttribute("class" , "col-md-12");
  var itdescrInput = document.createElement("textarea");
      itdescrInput.setAttribute("name" , "itdescription");
      itdescrInput.setAttribute("class" , "form-control");
      itdesContainer.appendChild(itdesLabel);
      itdesContainer.appendChild(itdescrInput);
      manageForm.appendChild(itdesContainer) 

  var btnSubmit = document.createElement('button');
      btnSubmit.setAttribute('type' , 'submit');
      btnSubmit.setAttribute('class' , 'btn btn-primary col-12');
      btnSubmit.innerHTML = "Add Offer";

  btnSubmit.addEventListener('click' , function (event) {
    event.preventDefault();
    addNewOffer(manageForm);
  } )

      manageForm.appendChild(btnSubmit);

      document.getElementById('content').innerHTML = ``;
      document.getElementById('content').appendChild(manageForm) ;


}

function addNewOffer(off) {
  // console.log(ee.enname.value);
  var enOffer = new Offer(),
      itOffer = new Offer();
  
      enOffer.name= off.enname.value;
      enOffer.day_night = Number(off.days.value) + "," + Number(off.nights.value);
      enOffer.description = off.endescription.value;
      // enOffer.image = "";
      enOffer.languageCode = "en";

      itOffer.name= off.itname.value;
      itOffer.day_night = Number(off.days.value) + "," + Number(off.nights.value);
      itOffer.description = off.itdescription.value;
      // itOffer.image = "";
      itOffer.languageCode = "it";

      var newOffer = [enOffer,itOffer];
      newOffer = JSON.stringify(newOffer);

      img = off.image;

  postApi( 'https://localhost:7181/Offer/add' , newOffer ,img)
  console.log(newOffer);
  reloadOffers();
  loadOffers();
}

function showDeleteOffer() {
  document.getElementById("secTitle").innerHTML = 'Delete Offer';
  var delForm = document.createElement("form");
  delForm.setAttribute('method',"post");
  delForm.setAttribute("class" , "row g-3 needs-validation");

  var selecBox = document.createElement("select");
  selecBox.setAttribute("class" , "form-select");
  selecBox.setAttribute("name" , "id");

  var deleteBtn = document.createElement("button"); 
  deleteBtn.setAttribute("class","btn btn-primary col-12 mt-4");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", event => {
    event.preventDefault();
    deleteOffer(delForm.id.value);
  });

  // var selectoffers = reqApi("https://hobitours.somee.com/Offer/all/it/");
  selectoffers.then(d=>{
    var ofNum = d.data.length;
    console.log(ofNum);
    d.data.forEach(e => {
      var offOption = document.createElement("option");
      offOption.setAttribute("value", e.id);
      offOption.textContent = `${e.name}` ;
      selecBox.appendChild(offOption);
    });
    delForm.appendChild(selecBox);

    divCont.appendChild(deleteBtn);

  })
  .catch((err)=>{console.error(`Error: ${err}`)})
  
  
  var divCont = document.getElementById("content");
  divCont.innerHTML="";
  divCont.appendChild(delForm);
}

function deleteOffer(offid) {
  console.log(offid);
  var del = sendApi("https://hobitours.somee.com//Offer/delete/" +offid , {id : offid} ,"DELETE" );
  del.then(res=>{ reloadOffers();loadOffers(); })
     .catch((err)=> { alert('Errore durante la cancellazione dell\'offerta' + err);});
  // window.location.reload();
}

function showEdit(offId , lang) {
  var divCont = document.getElementById("content"), 
      divRow = document.createElement("div");
      divRow.setAttribute("class" , "row justify-content-md-center") ;
  divCont.innerHTML="";
  var allOff = [] , otherOff;
  languages.forEach(lan=> {
    var off = reqApi("https://hobitours.somee.com/Offer/"+ offId +"/" + lan);
    off.then(d=>{
      
      var sOff = d.data;
      console.log(sOff);
      
      // console.log(d.data);
      // d.data.forEach(e => {
        if (lang == lan) {
        var editForm = document.createElement("form"),
            hiddenId = document.createElement( "input" ),
            // oldName = document.createElement("output"),
            // oldNameLabel = document.createElement("label"),
            newName = document.createElement("input"),
            newNameLabel = document.createElement("label"),
            // oldDesc = document.createElement("output"),
            // oldDescLabel = document.createElement("label"),
            newDesc = document.createElement("textarea"),
            newDescLabel = document.createElement("label"),
            // oldDay = document.createElement("output"),
            // oldDayLabel = document.createElement("label"),
            newDay = document.createElement("input"),
            newDayLabel = document.createElement("label"),
            // oldNight = document.createElement("output"),
            // oldNightLabel = document.createElement("label"),
            newNight = document.createElement("input"),
            newNightLabel = document.createElement("label"),
            submitBtn = document.createElement("button");

            editForm.setAttribute("class" , "py-md-3 py-lg-5 col-sm-12 col-md-6")

            hiddenId.setAttribute("hidden" , "");
            hiddenId.value =  sOff.id;

            newName.setAttribute("class" , "form-control mt-3");
            newDesc.setAttribute("class" , "form-control mt-3");
            newDay.setAttribute("class" , "form-control mt-3");
            newNight.setAttribute("class" , "form-control mt-3");

            newDay.setAttribute("type" , "number");
            newNight.setAttribute("type" , "number");

            newNameLabel.textContent = "change offer name or keep it as it is";
            newDescLabel.textContent = "change offer description or keep it as it is";
            newDayLabel.textContent = "change offer Days number or keep it as it is";
            newNightLabel.textContent = "change offer Nights number or keep it as it is";

            newName.setAttribute("value" , sOff["name"]);
            // newDesc.setAttribute("value" , sOff["description"]);
            newDesc.textContent = sOff["description"];
            newDay.setAttribute("value" , Number(sOff["day_night"].split(",")[0]) );
            newNight.setAttribute("value" , Number(sOff["day_night"].split(",")[1]) );
            submitBtn.setAttribute("type" , "submit");
            submitBtn.textContent = "send updates";
            submitBtn.className ="btn btn-primary btn-block col-12 mt-3 ";
            submitBtn.addEventListener("click", event => {
              event.preventDefault();
              console.log(hiddenId.value);
              var upOff = {
                id : Number(hiddenId.value),
                name:newName.value,
                description:newDesc.value,
                day_night:`${newDay.value},${newNight.value}`,
                image: null,
                languageCode:lang
              };
              // allOff.push(upOff);
              otherOff.day_night = upOff.day_night;
              
              allOff = [upOff,otherOff];
              sendApi("https://hobitours.somee.com/Offer/update" , allOff , "PUT").then(result=>{ reloadOffers(); loadOffers() });
              // window.location.href = "./";
              // checkPassword();
            });

            editForm.appendChild(hiddenId);
            editForm.appendChild(newNameLabel);
            editForm.appendChild(newName);
            editForm.appendChild(newDescLabel);
            editForm.appendChild(newDesc);
            editForm.appendChild(newDayLabel);
            editForm.appendChild(newDay);
            editForm.appendChild(newNightLabel);
            editForm.appendChild(newNight);
            editForm.appendChild(submitBtn);

            // divCont.appendChild(editForm);
            divRow.appendChild(editForm);
            divCont.appendChild(divRow);
            console.log(allOff);
        } else {
          // allOff.push(sOff);
          otherOff = sOff;
          otherOff.languageCode = lan;
          console.log(otherOff.languageCode);
        }
            
      });

    })
  // })
}

function editOffer( id , oldData , newData ) {
  var data =  {};
  data["id"] = id ;
  data[oldData] = newData;
}

// Define a function that returns a promise
function postApi(url,str_json , img) {
  // Send the JSON data to your PHP script
  // var url = 'capilot.php';
  var nOff = JSON.parse(str_json);
        
  // ************ add text ************
  fetch(url, {
    method: 'POST',
    body: nOff,
    headers: {
      'Content-Type': 'application/json'
      // "Accept" : "*/*"
    }
  })
  .then(
      (response) => {
          response.text()
          // *************************** newly added *****************************
            addOffImage("https://localhost:7181/Offer/img/" + response.data , img);
          // *************************** newly added *****************************
          return response
        })
  .then(txt => {
    // Handle the response from the server
    console.log(txt);
  });
}

function addOffImage(url , img) {
  var inputFile = img;
  var data = new FormData();
  data.append("imgName", inputFile.files[0].name);
  data.append("logo", inputFile.files[0]);
  console.log(inputFile.files[0]);
   // ************ add image ************
   fetch(url, {
      method: 'PUT',
      body: data,
      headers: {
        // 'Content-Type': 'application/json'
        "Accept" : "*/*"
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

// Define a function that returns a promise
function deleteApi(url,str_json) {
  // Send the JSON data to your PHP script
  // var url = 'capilot.php';
  fetch(url, {
    method: 'DELETE',
    body: str_json
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

// Define a function that returns a promise

function putApi(url , data , img) {
  // console.log(data);
  // Create a new promise
  return new Promise(function(resolve, reject) {
    
    // Create a new XHR object
    var xhr = new XMLHttpRequest();
    // Set the response type to JSON
    xhr.responseType = "json";
    
    // Open the request with the given url
    xhr.open("PUT", url, true);
    // xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Accept', '*/*');
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

// Define a function that returns a promise
function reqApi(url) {
  // Create a new promise
  return new Promise(function(resolve, reject) {
    // Create a new XHR object
    var xhr = new XMLHttpRequest();
    // Set the response type to JSON
    xhr.responseType = "json";
    // Open the request with the given url
    xhr.open("GET", url, true);
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
    xhr.send();
  });
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
      atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
  );
  return JSON.parse(jsonPayload);
}

// if ( Number(token) != NaN ) {
//     // updatePass(Number(result.data));
//     alert("you didn't confirm your identity yet please return and change your password");
//     window.location.href = "./sign-in.html"
// }


function sendApi(url,data,method) {
  console.log(url);
  console.log(data);
  console.log(method);
  // Create a new promise
  return new Promise(function(resolve, reject) {
    
    // Create a new XHR object
    var xhr = new XMLHttpRequest();
    // Set the response type to JSON
    xhr.responseType = "json";
    
    // Open the request with the given url
    xhr.open(method, url, true);
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

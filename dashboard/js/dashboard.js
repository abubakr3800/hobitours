function checkAuth() {
  var accessToken = localStorage.getItem("token");
  if (accessToken) {
  // console.log(`Access token value: ${accessToken}`);
  return true
  } else {
    // console.log('Access token not found.');
    return false
  }
}

checkAuth() ? "" : location.href="./sign-in.html";

function logout() {
  localStorage.removeItem("token")
  checkAuth() ? "" : location.href="./sign-in.html";
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

var languages = ["it" , "en"], allOffers = [];

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
      ],
        data: []
    });
  }
  var offersTable ;
  languages.forEach(lan=> {
    offersTable = [] ; 
    // console.log(e);
    offers = reqApi("https://hobitours.somee.com/Offer/all/" + lan);
    offers.then(d=>{
      var ofNum = d.data.length;
      // console.log(d.data.length);
      // console.log(d.data[0]);
      var singleOffer = [];
      d.data.forEach(e => {
        // offersTable.push(e);
        singleOffer = []   ; 
        singleOffer.push(e.id)
        singleOffer.push(e.name)
        singleOffer.push(e.description)
        singleOffer.push(e.day_night)
        offersTable.push(singleOffer)
        offtab.row.add([singleOffer[0] ,singleOffer[1] ,singleOffer[2].slice(0 , 50) + ` ..... <a href="#" onclick="alert('${e.description}')" >view all</a>` , singleOffer[3].split(",")[0] , singleOffer[3].split(",")[1] , lan ]).draw(false)
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
  manageForm.setAttribute("class" , "row g-3 needs-validation")
  // manageForm.setAttribute('action','#');

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

class Offer {
  name;
  day_night;
  description;
  image;
  languageCode;
}

function addNewOffer(off) {
  // console.log(ee.enname.value);
  var enOffer = new Offer(),
      itOffer = new Offer();
  
      enOffer.name= off.enname.value;
      enOffer.day_night = Number(off.days.value) + "," + Number(off.nights.value);
      enOffer.description = off.endescription.value;
      enOffer.image = "";
      enOffer.languageCode = "en";

      itOffer.name= off.itname.value;
      itOffer.day_night = Number(off.days.value) + "," + Number(off.nights.value);
      itOffer.description = off.itdescription.value;
      itOffer.image = "";
      itOffer.languageCode = "it";

      var newOffer = [enOffer,itOffer];
      newOffer = JSON.stringify(newOffer);

  postApi( 'https://hobitours.somee.com/Offer/add' , newOffer)
  console.log(newOffer);
  loadOffers()
}

window.onload = function () {
  document.getElementById("sidebar").innerHTML = loadPage('sidenav.html');

  // language = (parseURLParams(window.location.href).lan == null || undefined ? "it" : parseURLParams(window.location.href).lan[0] ) ;
  // getObject("https://hobitours.somee.com/Offer/all/" + language);
  
}

// Define a function that returns a promise
function postApi(url,str_json) {
    
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
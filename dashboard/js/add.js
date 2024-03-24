
function manageOffers() {
    document.getElementById("secTitle").innerHTML = "Add Offer";
    var manageForm = document.createElement("form");
    manageForm.setAttribute("method", "post");
    manageForm.setAttribute("class", "row g-3 needs-validation");
    manageForm.setAttribute("enctype", "multipart/form-data");
    // manageForm.setAttribute('action','#');
  
    var imgLabel = document.createElement("label");
    imgLabel.setAttribute("class", "form-label");
    imgLabel.innerText = "The image of the offer";
    var imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "col-md-12");
    var imgFile = document.createElement("input");
    imgFile.setAttribute("type", "file");
    imgFile.setAttribute("name", "image");
    imgFile.setAttribute("class", "form-control");
    imgContainer.appendChild(imgLabel);
    imgContainer.appendChild(imgFile);
    manageForm.appendChild(imgContainer);
  
    var enLabel = document.createElement("label");
    enLabel.setAttribute("class", "form-label");
    enLabel.innerText = "offer name in english";
    var enContainer = document.createElement("div");
    enContainer.setAttribute("class", "col-md-6");
    var enOfferName = document.createElement("input");
    enOfferName.setAttribute("type", "text");
    enOfferName.setAttribute("name", "enname");
    enOfferName.setAttribute("class", "form-control");
    enContainer.appendChild(enLabel);
    enContainer.appendChild(enOfferName);
    manageForm.appendChild(enContainer);
  
    var itLabel = document.createElement("label");
    itLabel.setAttribute("class", "form-label");
    itLabel.innerText = "offer name in italic";
    var itContainer = document.createElement("div");
    itContainer.setAttribute("class", "col-md-6");
    var itOfferName = document.createElement("input");
    itOfferName.setAttribute("type", "text");
    itOfferName.setAttribute("name", "itname");
    itOfferName.setAttribute("class", "form-control");
    itContainer.appendChild(itLabel);
    itContainer.appendChild(itOfferName);
    manageForm.appendChild(itContainer);
  
    var dLabel = document.createElement("label");
    dLabel.setAttribute("class", "form-label");
    dLabel.innerText = "Days of the offer";
    var dContainer = document.createElement("div");
    dContainer.setAttribute("class", "col-md-6");
    var days = document.createElement("input");
    days.setAttribute("type", "number");
    days.setAttribute("name", "days");
    days.setAttribute("class", "form-control");
    dContainer.appendChild(dLabel);
    dContainer.appendChild(days);
    manageForm.appendChild(dContainer);
  
    var nLabel = document.createElement("label");
    nLabel.setAttribute("class", "form-label");
    nLabel.innerText = "Nights of the offer";
    var nContainer = document.createElement("div");
    nContainer.setAttribute("class", "col-md-6");
    var nights = document.createElement("input");
    nights.setAttribute("type", "number");
    nights.setAttribute("name", "nights");
    nights.setAttribute("class", "form-control");
    nContainer.appendChild(nLabel);
    nContainer.appendChild(nights);
    manageForm.appendChild(nContainer);
  
    var endesLabel = document.createElement("label");
    endesLabel.setAttribute("class", "form-label");
    endesLabel.innerText = "Offer Description in English";
    var endesContainer = document.createElement("div");
    endesContainer.setAttribute("class", "col-md-12");
    var endescrInput = document.createElement("textarea");
    endescrInput.setAttribute("name", "endescription");
    endescrInput.setAttribute("class", "form-control");
    endesContainer.appendChild(endesLabel);
    endesContainer.appendChild(endescrInput);
    manageForm.appendChild(endesContainer);
  
    var itdesLabel = document.createElement("label");
    itdesLabel.setAttribute("class", "form-label");
    itdesLabel.innerText = "Offer Description in Italic";
    var itdesContainer = document.createElement("div");
    itdesContainer.setAttribute("class", "col-md-12");
    var itdescrInput = document.createElement("textarea");
    itdescrInput.setAttribute("name", "itdescription");
    itdescrInput.setAttribute("class", "form-control");
    itdesContainer.appendChild(itdesLabel);
    itdesContainer.appendChild(itdescrInput);
    manageForm.appendChild(itdesContainer);
  
    var btnSubmit = document.createElement("button");
    btnSubmit.setAttribute("type", "submit");
    btnSubmit.setAttribute("class", "btn btn-primary col-12");
    btnSubmit.innerHTML = "Add Offer";
  
    btnSubmit.addEventListener("click", function (event) {
      event.preventDefault();
      addNewOffer(manageForm);
    });
  
    manageForm.appendChild(btnSubmit);
  
    document.getElementById("content").innerHTML = ``;
    document.getElementById("content").appendChild(manageForm);
  }
  
function manageDestinations() {
    document.getElementById("secTitle").innerHTML = "Add Destination";
    var manageForm = document.createElement("form");
    manageForm.setAttribute("method", "post");
    manageForm.setAttribute("class", "row g-3 needs-validation");
    manageForm.setAttribute("enctype", "multipart/form-data");
    // manageForm.setAttribute('action','#');
  
    var imgLabel = document.createElement("label");
    imgLabel.setAttribute("class", "form-label");
    imgLabel.innerText = "The image of the offer";
    var imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "col-md-12");
    var imgFile = document.createElement("input");
    imgFile.setAttribute("type", "file");
    imgFile.setAttribute("name", "image");
    imgFile.setAttribute("class", "form-control");
    imgContainer.appendChild(imgLabel);
    imgContainer.appendChild(imgFile);
    manageForm.appendChild(imgContainer);
  
    var enLabel = document.createElement("label");
    enLabel.setAttribute("class", "form-label");
    enLabel.innerText = "destination name in english";
    var enContainer = document.createElement("div");
    enContainer.setAttribute("class", "col-md-6");
    var enOfferName = document.createElement("input");
    enOfferName.setAttribute("type", "text");
    enOfferName.setAttribute("name", "enname");
    enOfferName.setAttribute("class", "form-control");
    enContainer.appendChild(enLabel);
    enContainer.appendChild(enOfferName);
    manageForm.appendChild(enContainer);
  
    var itLabel = document.createElement("label");
    itLabel.setAttribute("class", "form-label");
    itLabel.innerText = "destination name in italic";
    var itContainer = document.createElement("div");
    itContainer.setAttribute("class", "col-md-6");
    var itOfferName = document.createElement("input");
    itOfferName.setAttribute("type", "text");
    itOfferName.setAttribute("name", "itname");
    itOfferName.setAttribute("class", "form-control");
    itContainer.appendChild(itLabel);
    itContainer.appendChild(itOfferName);
    manageForm.appendChild(itContainer);
  
    var places = document.createElement("label");
    places.setAttribute("class", "form-label");
    places.innerText = "Days of the places";
    var dContainer = document.createElement("div");
    dContainer.setAttribute("class", "col-md-12");
    var place = document.createElement("input");
    place.setAttribute("type", "text");
    place.setAttribute("name", "places[]");
    place.setAttribute("class", "form-control");
    dContainer.appendChild(places);
    dContainer.appendChild(place);
    manageForm.appendChild(dContainer);
  
    var btnAddPlace = document.createElement("button");
    btnAddPlace.setAttribute("type", "submit");
    btnAddPlace.setAttribute("class", "btn btn-primary col-12");
    btnAddPlace.innerHTML = "Add Place +";
    btnAddPlace.addEventListener("click", function (event) {
      event.preventDefault();
      var plac = document.createElement("input");
            plac.setAttribute("type", "text");
            plac.setAttribute("name", "places[]");
            plac.setAttribute("class", "form-control mt-2");
            dContainer.appendChild(plac);
    //   addNewPlace(manageForm);
    });
  
    manageForm.appendChild(btnAddPlace);

    var endesLabel = document.createElement("label");
    endesLabel.setAttribute("class", "form-label");
    endesLabel.innerText = "Destination Description in English";
    var endesContainer = document.createElement("div");
    endesContainer.setAttribute("class", "col-md-12");
    var endescrInput = document.createElement("textarea");
    endescrInput.setAttribute("name", "endescription");
    endescrInput.setAttribute("class", "form-control");
    endesContainer.appendChild(endesLabel);
    endesContainer.appendChild(endescrInput);
    manageForm.appendChild(endesContainer);
  
    var itdesLabel = document.createElement("label");
    itdesLabel.setAttribute("class", "form-label");
    itdesLabel.innerText = "Destination Description in Italic";
    var itdesContainer = document.createElement("div");
    itdesContainer.setAttribute("class", "col-md-12");
    var itdescrInput = document.createElement("textarea");
    itdescrInput.setAttribute("name", "itdescription");
    itdescrInput.setAttribute("class", "form-control");
    itdesContainer.appendChild(itdesLabel);
    itdesContainer.appendChild(itdescrInput);
    manageForm.appendChild(itdesContainer);
  
    var btnSubmit = document.createElement("button");
    btnSubmit.setAttribute("type", "submit");
    btnSubmit.setAttribute("class", "btn btn-primary col-12");
    btnSubmit.innerHTML = "Add Destination";
  
    btnSubmit.addEventListener("click", function (event) {
      event.preventDefault();
      addNewDest(manageForm);
    });
  
    manageForm.appendChild(btnSubmit);
  
    document.getElementById("content").innerHTML = ``;
    document.getElementById("content").appendChild(manageForm);
  }
  
  
function addNewOffer(off) {
    // console.log(ee.enname.value);
    var enOffer = new Offer(),
      itOffer = new Offer();
  
    enOffer.name = off.enname.value;
    enOffer.day_night = Number(off.days.value) + "," + Number(off.nights.value);
    enOffer.description = off.endescription.value;
    // enOffer.image = "";
    enOffer.languageCode = "en";
  
    itOffer.name = off.itname.value;
    itOffer.day_night = Number(off.days.value) + "," + Number(off.nights.value);
    itOffer.description = off.itdescription.value;
    // itOffer.image = "";
    itOffer.languageCode = "it";
  
    var newOffer = [enOffer, itOffer];
    newOffer = JSON.stringify(newOffer);
  
    img = off.image;
  // var offerE = sendApi("https://localhost:7181/Offer/add", newOffer,"POST");
  var offerE = sendApi("https://hobitours.somee.com/Offer/add", newOffer,"POST");
  offerE.then((res)=>{
    console.log(img);
    // addOffImage("https://localhost:7181/Offer/img/" + res.data, img);
    addOffImage("https://hobitours.somee.com/Offer/img/" + res.data, img);
    // var inputFile = img;
    // var data = new FormData();
    // data.append("imgName", inputFile.files[0].name);
    // data.append("img", inputFile.files[0]);
    // console.log(inputFile.files[0]);
    // var offerimg = sendApi("https://hobitours.somee.com/Offer/img" + res.data, data,"PUT");
  
  });
    // postApi("https://localhost:7181/Offer/add", newOffer, img);
    console.log(newOffer);
    reloadOffers();
    loadOffers();
  }
  
  function addNewDest(dest) {
    // console.log(ee.enname.value);
    var enDest = new Dest(),
      itDest = new Dest();
  
        var allPlaces = dest.querySelectorAll("input[name='places[]']");
        var places = [];
        allPlaces.forEach((singlePlace) => {
            places.push(singlePlace.value);
            console.log(singlePlace.value);
        });

      enDest.name = dest.enname.value;
      enDest.places = dest.enname.places;
      enDest.description = dest.endescription.value;
    // enDest.image = "";
    enDest.languageCode = "en";
  
    itDest.name = dest.itname.value;
    itDest.day_night = places;
    itDest.description = dest.itdescription.value;
    // itDest.image = "";
    itDest.languageCode = "it";
  
    var newDest = [enDest, itDest];
    newDest = JSON.stringify(newDest);
  
    img = dest.image;
  // var offerE = sendApi("https://localhost:7181/Offer/add", newOffer,"POST");
  var offerE = sendApi("https://hobitours.somee.com/destination/add", newOffer,"POST");
  offerE.then((res)=>{
    console.log(img);
    // addOffImage("https://localhost:7181/Offer/img/" + res.data, img);
    addOffImage("https://hobitours.somee.com/destination/img/" + res.data, img);
    // var inputFile = img;
    // var data = new FormData();
    // data.append("imgName", inputFile.files[0].name);
    // data.append("img", inputFile.files[0]);
    // console.log(inputFile.files[0]);
    // var offerimg = sendApi("https://hobitours.somee.com/Offer/img" + res.data, data,"PUT");
  
  });
    // postApi("https://localhost:7181/Offer/add", newOffer, img);
    console.log(newOffer);
    reloadOffers();
    loadOffers();
  }
  
  function addNewPlace(params) {
    var coun = 0;

    return coun;
  }
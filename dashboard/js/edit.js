function showEdit(offId, lang) {
    var divCont = document.getElementById("content"),
      divRow = document.createElement("div");
    divRow.setAttribute("class", "row justify-content-md-center");
    divCont.innerHTML = "";
    var allOff = [],
      otherOff;
    languages.forEach((lan) => {
      // var off = reqApi("http://api.hobitourstravel.com/Offer/" + offId + "/" + lan);
      var off = sendApi("https://api.hobitourstravel.com/Offer/" + offId + "/" + lan , "" , "GET");
      off.then((d) => {
        var sOff = d.data;
        console.log(sOff);
  
        // console.log(d.data);
        // d.data.forEach(e => {
        if (lang == lan) {
          var editForm = document.createElement("form"),
            hiddenId = document.createElement("input"),
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
  
          editForm.setAttribute("class", "py-md-3 py-lg-5 col-sm-12 col-md-6");
  
          hiddenId.setAttribute("hidden", "");
          hiddenId.value = sOff.id;
  
          newName.setAttribute("class", "form-control mt-3");
          newDesc.setAttribute("class", "form-control mt-3");
          newDay.setAttribute("class", "form-control mt-3");
          newNight.setAttribute("class", "form-control mt-3");
  
          newDay.setAttribute("type", "number");
          newNight.setAttribute("type", "number");
  
          newNameLabel.textContent = "change offer name or keep it as it is";
          newDescLabel.textContent =
            "change offer description or keep it as it is";
          newDayLabel.textContent =
            "change offer Days number or keep it as it is";
          newNightLabel.textContent =
            "change offer Nights number or keep it as it is";
  
          newName.setAttribute("value", sOff["name"]);
          // newDesc.setAttribute("value" , sOff["description"]);
          newDesc.textContent = sOff["description"];
          newDay.setAttribute("value", Number(sOff["day_night"].split(",")[0]));
          newNight.setAttribute("value", Number(sOff["day_night"].split(",")[1]));
          submitBtn.setAttribute("type", "submit");
          submitBtn.textContent = "send updates";
          submitBtn.className = "btn btn-primary btn-block col-12 mt-3 ";
          submitBtn.addEventListener("click", (event) => {
            event.preventDefault();
            console.log(hiddenId.value);
            var upOff = {
              id: Number(hiddenId.value),
              name: newName.value,
              description: newDesc.value,
              day_night: `${newDay.value},${newNight.value}`,
              // image: null,
              languageCode: lang,
            };
            // allOff.push(upOff);
            otherOff.day_night = upOff.day_night;
  
            allOff = [upOff, otherOff];
            sendApi(
              "https://api.hobitourstravel.com/Offer/update",
              allOff,
              "PUT"
            ).then((result) => {
              reloadOffers();
              loadOffers();
            });
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
    });
    // })
  }
  
  // function editOffer(id, oldData, newData) {
  //   var data = {};
  //   data["id"] = id;
  //   data[oldData] = newData;
  // }

  function showEditDest(desId, lang) {
    var divCont = document.getElementById("content"),
      divRow = document.createElement("div");
    divRow.setAttribute("class", "row justify-content-md-center");
    divCont.innerHTML = "";
    var allDes = [],
      otherDes;
    languages.forEach((lan) => {
      // var off = reqApi("http://api.hobitourstravel.com/Offer/" + desId + "/" + lan);
      var des = sendApi("https://api.hobitourstravel.com/destination/" + desId + "/" + lan , "" , "GET");
      des.then((d) => {
        var sDes = d.data;
        console.log(sDes);
  
        // console.log(d.data);
        // d.data.forEach(e => {
        if (lang == lan) {
          var editForm = document.createElement("form"),
            hiddenId = document.createElement("input"),
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
            newPlaces = document.createElement("div"),
            newPlacesLabel = document.createElement("label"),
            
            submitBtn = document.createElement("button");
  
          editForm.setAttribute("class", "py-md-3 py-lg-5 col-sm-12 col-md-6");
  
          hiddenId.setAttribute("hidden", "");
          hiddenId.value = sDes.id;
  
          newName.setAttribute("class", "form-control mt-3");
          newDesc.setAttribute("class", "form-control mt-3");
          newPlaces.setAttribute("class", " mt-3");
  
          var btnAddPlace = document.createElement("button");
              btnAddPlace.setAttribute("type", "button");
              btnAddPlace.setAttribute("class", "btn btn-primary col-12 mt-2");
              btnAddPlace.innerHTML = "Add Place +";
              btnAddPlace.addEventListener("click", function (event) {
                event.preventDefault();
                var plac = document.createElement("input");
                    plac.setAttribute("type", "text");
                    plac.setAttribute("name", "places[]");
                    plac.setAttribute("class", "form-control mt-2");
                    newPlaces.appendChild(plac);
                    console.log(editForm.querySelectorAll("input[name='places[]']"));
              //   addNewPlace(manageForm);
              });

          var removePlace = document.createElement("button");
              removePlace.setAttribute("type", "button");
              removePlace.setAttribute("class", "btn btn-danger col-12 mt-2");
              removePlace.innerHTML = "remove Place -";
              removePlace.addEventListener("click", function (event) {
                event.preventDefault();
                var placlength = editForm.querySelectorAll("input[name='places[]']").length,
                    delplac =  editForm.querySelectorAll("input[name='places[]']")[placlength-1];
                    delplac.remove();
                    console.log(editForm.querySelectorAll("input[name='places[]']"));
              //   addNewPlace(manageForm);
              });

          newNameLabel.textContent = "change offer name or keep it as it is";
          // newNameLabel.setAttribute("for", "newOfferName");
          newNameLabel.setAttribute("class", "mt-3");
          newDescLabel.textContent = "change offer description or keep it as it is";
          newDescLabel.setAttribute("class", "mt-3");
          newPlacesLabel.textContent = "Add new places or keep it as it is";
          newPlacesLabel.setAttribute("class", "mt-3");
  
          newName.setAttribute("value", sDes["name"]);
          // newDesc.setAttribute("value" , sOff["description"]);
          newDesc.textContent = sDes["description"];
          console.log(sDes["places"]);

          // newPlaces.setAttribute("value", sDes["places"].toLocaleString());
          var getAllPlaces = sDes["places"];
          getAllPlaces.forEach((place, index)=>{
            let placeInput = document.createElement('input');  
            // placeInput.setAttribute('type','hidden');  
            placeInput.setAttribute('name',`places[]`)  ; 
            placeInput.setAttribute('class',`form-control mt-3`)  ; 
            placeInput.setAttribute('value',place);   
            newPlaces.appendChild(placeInput);   
            
          })
          submitBtn.setAttribute("type", "submit");
          submitBtn.textContent = "send updates";
          submitBtn.className = "btn btn-primary btn-block col-12 mt-3 ";
          console.log(editForm.querySelectorAll("input[name='places[]']"));
          submitBtn.addEventListener("click", (event) => {
            event.preventDefault();
            var theAllPlaces = [];
            editForm.querySelectorAll("input[name='places[]']").forEach((item) =>{
              if(item.value != ""){
                // theAllPlaces = theAllPlaces + item.value + ",";
                theAllPlaces.push(item.value);
              }
            });
            console.log(theAllPlaces);
            console.log(hiddenId.value);
            var upDes = {
              id: Number(hiddenId.value),
              name: newName.value,
              description: newDesc.value,
              places: theAllPlaces,
              // image: null,
              languageCode: lang,
            };
            // allDes.push(upOff);
            // otherDes.day_night = upOff.day_night;
  
            allDes = [upDes, otherDes];
            console.log(allDes);
            sendApi(
              "https://api.hobitourstravel.com/destination/update",
              allDes,
              "PUT"
            ).then((result) => {
              console.log(result);
              reloadDests();
              loadDest();
            });
            // window.location.href = "./";
            // checkPassword();
          });
  
          editForm.appendChild(hiddenId);
          editForm.appendChild(newNameLabel);
          editForm.appendChild(newName);
          editForm.appendChild(newDescLabel);
          editForm.appendChild(newDesc);
          editForm.appendChild(newPlacesLabel);
          editForm.appendChild(newPlaces);
          editForm.appendChild(btnAddPlace);
          editForm.appendChild(removePlace);
          editForm.appendChild(submitBtn);
  
          // divCont.appendChild(editForm);
          divRow.appendChild(editForm);
          divCont.appendChild(divRow);
          console.log(allDes);
        } else {
          // allDes.push(sOff);
          otherDes = sDes;
          otherDes.languageCode = lan;
          console.log(otherDes.languageCode);
        }
      });
    });
    // })
  }
  
  // function editDes(id, oldData, newData) {
  //   var data = {};
  //   data["id"] = id;
  //   data[oldData] = newData;
  // }
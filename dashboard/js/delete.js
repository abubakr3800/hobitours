function showDeleteOffer() {
    document.getElementById("secTitle").innerHTML = "Delete Offer";
    var delForm = document.createElement("form");
    delForm.setAttribute("method", "post");
    delForm.setAttribute("class", "row g-3 needs-validation");
  
    var selecBox = document.createElement("select");
    selecBox.setAttribute("class", "form-select");
    selecBox.setAttribute("name", "id");
  
    var deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "btn btn-primary col-12 mt-4");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", (event) => {
      event.preventDefault();
      deleteOffer(delForm.id.value);
    });
  
    // var selectoffers = reqApi("https://hobitours.somee.com/Offer/all/it/");
    selectoffers
      .then((d) => {
        var ofNum = d.data.length;
        console.log(ofNum);
        d.data.forEach((e) => {
          var offOption = document.createElement("option");
          offOption.setAttribute("value", e.id);
          offOption.textContent = `${e.name}`;
          selecBox.appendChild(offOption);
        });
        delForm.appendChild(selecBox);
  
        divCont.appendChild(deleteBtn);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  
    var divCont = document.getElementById("content");
    divCont.innerHTML = "";
    divCont.appendChild(delForm);
  }
  
  function deleteOffer(offid) {
    console.log(offid);
    // var del = sendApi( "https://localhost:7181/Offer/delete/" + offid, { id: offid }, "DELETE" );
    var del = sendApi( "https://hobitours.somee.com/Offer/delete/" + offid, { id: offid }, "DELETE" );
    
    del
      .then((res) => {
        reloadOffers();
        loadOffers();
      })
      .catch((err) => {
        alert("Errore durante la cancellazione dell'offerta" + err);
      });
    // window.location.reload();
  }
function showDeletDestination() {
    document.getElementById("secTitle").innerHTML = "Delete destinations";
    var delForm = document.createElement("form");
    delForm.setAttribute("method", "post");
    delForm.setAttribute("class", "row g-3 needs-validation");
  
    var selecBox = document.createElement("select");
    selecBox.setAttribute("class", "form-select");
    selecBox.setAttribute("name", "id");
  
    var deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "btn btn-primary col-12 mt-4");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", (event) => {
      event.preventDefault();
      deleteDestination(delForm.id.value);
    });
  
    // var selectdests = reqApi("https://hobitours.somee.com/destination/all/it/");
    selectdests
      .then((d) => {
        var ofNum = d.data.length;
        console.log(ofNum);
        d.data.forEach((e) => {
          var offOption = document.createElement("option");
          offOption.setAttribute("value", e.id);
          offOption.textContent = `${e.name}`;
          selecBox.appendChild(offOption);
        });
        delForm.appendChild(selecBox);
  
        divCont.appendChild(deleteBtn);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  
    var divCont = document.getElementById("content");
    divCont.innerHTML = "";
    divCont.appendChild(delForm);
  }
  
  function deleteDestination(desid) {
    console.log(desid);
    // var del = sendApi( "https://localhost:7181/destination/delete/" + offid, { id: desid }, "DELETE" );
    var del = sendApi( "https://hobitours.somee.com/destination/delete/" + offid, { id: desid }, "DELETE" );
    
    del
      .then((res) => {
        reloadOffers();
        loadOffers();
      })
      .catch((err) => {
        alert("Errore durante la cancellazione dell'offerta" + err);
      });
    // window.location.reload();
  }
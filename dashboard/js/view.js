
window.onload = function () {
    document.getElementById("sidebar").innerHTML = loadPage("sidenav.html");
    token = localStorage.getItem("token");
    // language = (parseURLParams(window.location.href).lan == null || undefined ? "it" : parseURLParams(window.location.href).lan[0] ) ;
    // getObject("https://hobitours.somee.com/Offer/all/" + language);
    if (token == null || undefined || "") {
      alert("please sign in first");
      window.location.replace("./sign-in.html");
    } else {
      if (isNaN(Number(token))) {
        // console.log(token);
        user = new User(token);
        document.getElementById("user-name").textContent = user.name;
        checkAuth();
        // window.location.replace("./index.html");
      } else {
        // updatePass(Number(result.data));
        alert("please confirm your identity");
        window.location.replace("./sign-in.html");
      }
    }
  };

    function reloadOffers() {
        // selectoffers = reqApi("https://localhost:7181/Offer/all/it/");
        // selectoffers = reqApi("https://hobitours.somee.com/Offer/all/it/");
        selectoffers = sendApi("https://hobitours.somee.com/Offer/all/it/" , '' , "GET");
        return selectoffers;
    }
    // var selectoffers = reqApi("https://localhost:7181/Offer/all/it/");
    // var selectoffers = reqApi("https://hobitours.somee.com/Offer/all/it/");
    var selectoffers = sendApi("https://hobitours.somee.com/Offer/all/it/" , '' , "GET");

    
    function loadOffers() {
        document.getElementById("secTitle").innerHTML = "Watch Offers";
        document.getElementById(
        "content"
        ).innerHTML = `<div class="table-responsive small"><table id="offers" class="display" width="100%"></table></div>`;
        // Iterate over each language and make an API call for offers in that language
        if (offtab == null || undefined) {
        var offtab = new DataTable("#offers", {
            columns: [
            { title: "id" },
            { title: "offer head" },
            { title: "offer" },
            { title: "Days" },
            { title: "Nights" },
            { title: "Language" },
            { title: "mange" },
            ],
            data: [],
        });
        }
    
        var offersTable, offers;
        languages.forEach((lan) => {
        offersTable = [];
        // console.log(e);
        // offers = reqApi("https://localhost:7181/Offer/all/" + lan);
        // offers = reqApi("https://hobitours.somee.com/Offer/all/" + lan);
        offers = sendApi("https://hobitours.somee.com/Offer/all/" + lan , '' , "GET");
        offers.then((d) => {
            // selectoffers.then(d=>{
            // var ofNum = d.data.length;
            // console.log(ofNum);
            var singleOffer = [];
            d.data.forEach((e) => {
            // offersTable.push(e);
            singleOffer = [];
            singleOffer.push(e.id);
            singleOffer.push(e.name);
            singleOffer.push(e.description);
            singleOffer.push(e.day_night);
            offersTable.push(singleOffer);
            offtab.row
                .add([
                singleOffer[0],
                singleOffer[1],
                singleOffer[2].slice(0, 50) +
                    ` ..... <a href="#" onclick="alert('${e.description}')" >view all</a>`,
                singleOffer[3].split(",")[0],
                singleOffer[3].split(",")[1],
                lan,
                `<div class="input-group mb-3"><button class="form-control btn btn-primary" onclick="showEdit(${e.id} , '${lan}')"><i class="bi bi-pen"></i></button><button class="form-control btn btn-danger" onclick="deleteOffer(${e.id})"><i class="bi bi-trash"></i></button></div>`,
                ])
                .draw(false);
            // console.log(e);
            });
        });
        });
    
        allOffers.push(offersTable);
        // offtab.row.add(allOffers).draw(false);
    }

    function loadDest() {
        document.getElementById("secTitle").innerHTML = "Watch Destinations";
        document.getElementById("content").innerHTML = `<div class="table-responsive small"><table id="destinations" class="display" width="100%"></table></div>`;
        // Iterate over each language and make an API call for offers in that language
        if (desttab == null || undefined) {
        var desttab = new DataTable("#destinations", {
            columns: [
            { title: "id" },
            { title: "destination head" },
            { title: "destination" },
            { title: "Places" },
            { title: "Language" },
            { title: "mange" },
            ],
            data: [],
        });
        }
    
        var DestsTable, Dests;
        languages.forEach((lan) => {
            DestsTable = [];
        // console.log(e);
        // offers = reqApi("https://localhost:7181/Offer/all/" + lan);
        // offers = reqApi("https://hobitours.somee.com/Offer/all/" + lan);
        Dests = sendApi("https://hobitours.somee.com/destination/all/" + lan , '' , "GET");
        Dests.then((d) => {
            // selectoffers.then(d=>{
            // var ofNum = d.data.length;
            // console.log(ofNum);
            var singleDest = [];
            d.data.forEach((e) => {
            // offersTable.push(e);
            singleDest = [];
            singleDest.push(e.id);
            singleDest.push(e.name);
            singleDest.push(e.description);
            singleDest.push(e.day_night);
            DestsTable.push(singleOffer);
            desttab.row
                .add([
                    singleOffer[0],
                    singleOffer[1],
                    singleOffer[2].slice(0, 50) +
                        ` ..... <a href="#" onclick="alert('${e.description}')" >view all</a>`,
                    singleOffer[3].split(",")[0],
                    singleOffer[3].split(",")[1],
                    lan,
                    `<div class="input-group mb-3"><button class="form-control btn btn-primary" onclick="showEdit(${e.id} , '${lan}')"><i class="bi bi-pen"></i></button><button class="form-control btn btn-danger" onclick="deleteOffer(${e.id})"><i class="bi bi-trash"></i></button></div>`,
                ])
                .draw(false);
            // console.log(e);
            });
        });
        });
    
        alldests.push(DestsTable);
        // desttab.row.add(alldests).draw(false);
    }
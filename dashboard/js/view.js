window.onload = function () {
    document.getElementById("sidebar").innerHTML = loadPage("sidenav.html");
    token = localStorage.getItem("token");
    // language = (parseURLParams(window.location.href).lan == null || undefined ? "it" : parseURLParams(window.location.href).lan[0] ) ;
    // getObject("http://api.hobitourstravel.com/Offer/all/" + language);
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
        // selectoffers = reqApi("http://api.hobitourstravel.com/Offer/all/it/");
        selectoffers = sendApi("http://api.hobitourstravel.com/Offer/all/it/" , '' , "GET");
        return selectoffers;
    }
    // var selectoffers = reqApi("https://localhost:7181/Offer/all/it/");
    // var selectoffers = reqApi("http://api.hobitourstravel.com/Offer/all/it/");
    var selectoffers = sendApi("http://api.hobitourstravel.com/Offer/all/it/" , '' , "GET");

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
        offers = sendApi("http://api.hobitourstravel.com/Offer/all/" + lan , '' , "GET");
        offers.then((d) => {
            // selectoffers.then(d=>{
            // var ofNum = d.data.length;
            // console.log(ofNum);
            var singleOffer = [];
            var c = 1;
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
                c,
                singleOffer[1],
                singleOffer[2].slice(0, 50) +
                    ` ..... <a href="#" onclick="alert('${e.description}')" >view all</a>`,
                singleOffer[3].split(",")[0],
                singleOffer[3].split(",")[1],
                lan,
                `<div class="input-group mb-3"><button class="form-control btn btn-primary" onclick="showEdit(${e.id} , '${lan}')"><i class="bi bi-pen"></i></button><button class="form-control btn btn-danger" onclick="deleteOffer(${e.id})"><i class="bi bi-trash"></i></button></div>`,
                ])
                .draw(false);
                c++;
            // console.log(e);
            });
        });
        });
    
        allOffers.push(offersTable);
        // offtab.row.add(allOffers).draw(false);
    }

    function reloadDests() {
        // selectdests = reqApi("https://localhost:7181/destination/all/it/");
        // selectdests = reqApi("http://api.hobitourstravel.com/destination/all/it/");
        selectdests = sendApi("http://api.hobitourstravel.com/destination/all/it/" , '' , "GET");
        return selectdests;
    }
    // var selectdests = reqApi("https://localhost:7181/destination/all/it/");
    // var selectdests = reqApi("http://api.hobitourstravel.com/destination/all/it/");
    var selectdests = sendApi("http://api.hobitourstravel.com/destination/all/it/" , '' , "GET");

    function loadDest() {
        document.getElementById("secTitle").innerHTML = "Watch Destinations";
        document.getElementById("content").innerHTML = `<div class="table-responsive small"><table id="destinations" class="display" width="100%"></table></div>`;
        // Iterate over each language and make an API call for destination in that language
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
        Dests = sendApi("http://api.hobitourstravel.com/destination/all/" + lan , '' , "GET");
        Dests.then((d) => {
            // selectdests.then(d=>{
            // var ofNum = d.data.length;
            // console.log(ofNum);
            var singleDest = [];
            var c = 1;
            d.data.forEach((e) => {
            // offersTable.push(e);
            singleDest = [];
            singleDest.push(e.id);
            singleDest.push(e.name);
            singleDest.push(e.description);
            singleDest.push(e.places.toLocaleString());
            DestsTable.push(singleDest);
            desttab.row.add([
                    c,
                    singleDest[1],
                    singleDest[2].slice(0, 50) +
                        ` ..... <a href="#" onclick="alert('${e.description}')" >view all</a>`,
                        singleDest[3],
                    lan,
                    `<div class="input-group mb-3"><button class="form-control btn btn-primary" onclick="showEditDest(${e.id} , '${lan}')"><i class="bi bi-pen"></i></button><button class="form-control btn btn-danger" onclick="deleteDestination(${e.id})"><i class="bi bi-trash"></i></button></div>`,
                ]).draw(false);
                c++;
            // console.log(e);
            });
        });
        });
    
        alldests.push(DestsTable);
        // desttab.row.add(alldests).draw(false);
    }

    function loadMessages() {
        document.getElementById("secTitle").innerHTML = "Watch Messages";
        document.getElementById("content").innerHTML = `<div class="table-responsive small"><table id="Messages" class="display" width="100%"></table></div>`;
        // Iterate over each language and make an API call for destination in that language
        if (Messagetab == null || undefined) {
        var Messagetab = new DataTable("#Messages", {
            columns: [
            { title: "id" },
            { title: "Name" },
            { title: "Email" },
            { title: "Subject" },
            { title: "Message" },
            { title: "mange" },
            ],
            data: [],
        });
        }
        var request;
        request = sendApi("http://api.hobitourstravel.com/contact/all" , '' , "GET");
        request.then((d) => {
            var c = 1;
            d.data.forEach((e) => {
            Messagetab.row.add([
                c,
                e.name,
                e.email,
                e.subject,
                e.message,
                `<div class="input-group mb-3"><button class="form-control btn btn-danger" onclick="deleteMsg(${e.id})"><i class="bi bi-trash"></i></button></div>`,
                ]).draw(false);
                c++;
            });
        });
    }
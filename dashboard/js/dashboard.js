function checkAuth() {
  var accessToken = localStorage.getItem("token");
  if (accessToken) {
  // console.log(`Access token value: ${accessToken}`);
  return true
  // alert(accessToken)
  } else {
    // console.log('Access token not found.');
    // alert(accessToken)
    // location.href = "./sign-in.html"
    return false
  }
}

checkAuth() ? "" : location.href="./sign-in.html";

function logout() {
  localStorage.removeItem("token")
  checkAuth() ? "" : location.href="./sign-in.html";

}

function parseURLParams(url) {
  var queryStart = url.indexOf("?") + 1,
      queryEnd   = url.indexOf("#") + 1 || url.length + 1,
      query = url.slice(queryStart, queryEnd - 1),
      pairs = query.replace(/\+/g, " ").split("&"),
      parms = {}, i, n, v, nv;

  if (query === url || query === "") return;

  for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split("=", 2);
      n = decodeURIComponent(nv[0]);
      v = decodeURIComponent(nv[1]);

      if (!parms.hasOwnProperty(n)) parms[n] = [];
      parms[n].push(nv.length === 2 ? v : null);
  }
  return parms;
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

var languages = ["it" , "en"],
          allOffers = [];

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


window.onload = function () {
  document.getElementById("sidebar").innerHTML = loadPage('sidenav.html');

  // language = (parseURLParams(window.location.href).lan == null || undefined ? "it" : parseURLParams(window.location.href).lan[0] ) ;
  // getObject("https://hobitours.somee.com/Offer/all/" + language);
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
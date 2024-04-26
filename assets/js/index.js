$('.counter').counterUp({
    delay: 100,
    time: 5000
});
var language = (parseURLParams(window.location.href) == null || undefined ? "it" : ( parseURLParams(window.location.href).lan == null || undefined ? "it" : parseURLParams(window.location.href).lan[0]) ) ;

var changedata = {
    nav:{
      en: [
        ['Home' , `index.html?lan=${language}#hero`],
        ['About Us', `index.html?lan=${language}#about`],
        ['Services',`index.html?lan=${language}#Services`],
        ['Destinations',`index.html?lan=${language}#portfolio`],
        ['Proposal',`index.html?lan=${language}#offers`],
        ['Contact',`contact.html?lan=${language}`],
      ],
      it: [
        ['Home' , `index.html?lan=${language}#hero`],
        ['Chi siamo', `index.html?lan=${language}#about`],
        ['Servizi',`index.html?lan=${language}#Services`],
        ['Destinazioni',`index.html?lan=${language}#portfolio`],
        ['Proposte',`index.html?lan=${language}#offers`],
        ['Contatti',`contact.html?lan=${language}`],
      ],
      ar: [
        ['الرئيسية' , `index.html?lan=${language}#hero`],
        ['معلومات عننا', `index.html?lan=${language}#about`],
        ['خدماتنا',`index.html?lan=${language}#Services`],
        ['الرحلات',`index.html?lan=${language}#portfolio`],
        ['عروضنا',`index.html?lan=${language}#offers`],
        ['تواصل معنا',`contact.html?lan=${language}`],
      ]
    },
    home:{
      en:`Welcome to <span>Hobitours</span>`,
      it:`Benvenuti in <span>Hobitours</span>`,
      ar:`مرحبا في <span>هوبيتورز</span>`,
    },
    about:{
      en:[
        "ABOUT US",
        "Travel lovers, tourism employees and of course Egypt enthusiasts!",
        "We have made our passion, our job.",
        " We like to dream and travel is one of the most beautiful dreams... We want to help you make your dream come true, organizing your trip in the best possible way and making you live the best experience in this land of strong contrasts between tradition and modernity, where a smile will welcome you and fun is guaranteed. ",
        " Egypt is the country of strong emotions that will remain forever in your hearts! ",
      ],
      it:[
        "CHI SIAMO",
        "Amanti dei viaggi, impiegati nel turismo e ovviamente appassionati di Egitto!",
        "Abbiamo fatto della nostra passione, il nostro lavoro.",
        "A noi piace sognare e il viaggio e' uno dei sogni piu' belli...Vogliamo aiutarvi a realizzare il vostro sogno, organizzando al meglio il vostro viaggio e facendovi vivere la migliore esperienza in questa terra dai forti contrasti tra tradizione e modernita', dove il sorriso vi accogliera' ed il divertimento e' assicurato.",
        "L'Egitto e' il Paese delle forti emozioni che rimarranno per sempre nei vostri cuori!"
      ],
      ar:[
        "معلومات عننا",
        "عشاق السفر وموظفي السياحة وبالطبع عشاق مصر!",
        "لقد جعلنا شغفنا، وظيفتك.",
        "نحن نحب أن نحلم والسفر من أجمل الأحلام... نريد مساعدتك لتحقيق حلمك وتنظيم رحلتك بأفضل طريقة ممكنة وجعلك تعيش أفضل تجربة في هذه الأرض ذات التناقضات القوية بين التقاليد والحداثة، حيث ترحب بكم الابتسامة ويضمن لكم المرح.",
        "مصر بلد المشاعر القوية التي ستبقى في قلوبكم إلى الأبد!"
      ]
    },
    services:{
      en:"SERVICIES",
      it:"SERVIZI",
      ar:"الخدمات"
    },
    offers:{
      en:"DISCOVER OUR OFFERS",
      it:" LE NOSTRE PROPOSTE",
      ar:"استكشف عروضنا"
    },
    destination:{
      en:"DESTINATIONS",
      it:"DESTINAZIONI",
      ar:"الرحلات"
    }
  };
  // var navLanguages = ['?lan=it' , '?lan=en' , '?lan=ar'];

  var destinationResult=document.querySelector("#destinations");
    destinationResult.innerHTML = '';

  var CommentResult=document.querySelector(".swiper-wrapper");
    // CommentResult.innerHTML = '';
    var comments = ["ssss","gggg","dddd","bbbb"];
  CommentResult.innerHTML = '';
  comments.forEach((c)=>{
    var showele = `
    <div class="swiper-slide">
    <div class="testimonial-item">
      <img src="assets/img/testimonials/testimonials-3.jpg" class="testimonial-img" alt="">
    <h3>${c}</h3>
    <h4>Store Owner</h4>
    <div class="stars">
      <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
    </div>
    <p>
      <i class="bi bi-quote quote-icon-left"></i>
      Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
      <i class="bi bi-quote quote-icon-right"></i>
    </p>
  </div>
</div><!-- End testimonial item -->
`
    CommentResult.innerHTML += showele;
  })

    function dropp() {
      const navDropdownAll = document.querySelectorAll('.navbar .dropdown > a');
      navDropdownAll.forEach(el => {
        el.addEventListener('click', function(event) {
          if (document.querySelector('.mobile-nav-active')) {
            event.preventDefault();
            this.classList.toggle('active');
            this.nextElementSibling.classList.toggle('dropdown-active');
    
            let dropDownIndicator = this.querySelector('.dropdown-indicator');
            dropDownIndicator.classList.toggle('bi-chevron-up');
            dropDownIndicator.classList.toggle('bi-chevron-down');
          }
        })
      });
    }
window.onload = function () {
  language = (parseURLParams(window.location.href) == null || undefined ? "it" : ( parseURLParams(window.location.href).lan == null || undefined ? "it" : parseURLParams(window.location.href).lan[0]) ) ;
  var navi = document.getElementById("n-menu");
  navi.innerHTML = '';
  changedata['nav'][language].forEach(d=>{
      navi.innerHTML += `<li><a class="nav-link scrollto" href="${d[1]}">${d[0]}</a></li>`
    });
  // navLanguages.forEach(l=>{
    navi.innerHTML += `<li class="dropdown"><a href="#"><span>${language == 'ar' ? 'اللغة' : language == 'it' ? 'Lingua' : 'Language'}</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
        <ul>
          <li><a href="?lan=it">${language == 'ar' ? 'الايطالية' : 'Italiano'} <img src="assets/img/italy.png" style="width: 30px;"></a></li>
          <li><a href="?lan=en">${language == 'ar' ? 'الانجليزية' : 'English'} <img src="assets/img/england.png" style="width: 30px;"></a></li>
          <li><a href="?lan=ar">${language == 'ar' ? 'العربية' : 'Arabic'} <img src="assets/img/egypt.png" style="width: 30px;"></a></li>
        </ul>
      </li>`
  // })
  dropp()
  document.querySelectorAll(".home-welcome").forEach(home => {
      home.innerHTML = changedata['home'][language];
  })
  
  var allabout = changedata['about'][language];
  document.querySelector("#about h2").innerHTML = allabout[0]; 
  document.querySelector("#about h3").innerHTML = allabout[1]; 
  document.querySelector("#about h4").innerHTML = allabout[2]; 
  document.querySelectorAll("#about p")[0].innerHTML = allabout[3]; 
  document.querySelectorAll("#about p")[1].innerHTML = allabout[4]; 
  
  document.querySelector("#Services h2").innerHTML = changedata['services'][language]; 

  document.querySelector("#portfolio h2").innerHTML = changedata['destination'][language]; 
  
  document.querySelector("#offers h2").innerHTML = changedata['offers'][language]; 

  if (language == 'ar') {
    // change the direction of navbar section
    document.querySelector(".header").style.textAlign = "right";
    document.querySelector(".header").style.direction = "rtl";
    // change the direction of about section
    document.querySelector(".about").style.textAlign = "right";
    document.querySelector(".about").style.direction = "rtl";
    // change the direction of offers section
    document.querySelector(".offers").style.textAlign = "right";
    document.querySelector(".offers").style.direction = "rtl";
    // change the direction of services  section
    document.querySelector(".portfolio ").style.textAlign = "right";
    document.querySelector(".portfolio ").style.direction = "rtl";
  }else {
    // change the direction of navbar section
    document.querySelector(".header").style.textAlign = "left";
    document.querySelector(".header").style.direction = "ltr";
    // change the direction of about section
    document.querySelector(".about").style.textAlign = "left";
    document.querySelector(".about").style.direction = "ltr";
    // change the direction of offers section
    document.querySelector(".offers").style.textAlign = "left";
    document.querySelector(".offers").style.direction = "ltr";
    // change the direction of services  section
    document.querySelector(".portfolio ").style.textAlign = "left";
    document.querySelector(".portfolio ").style.direction = "ltr";
  }

  // ******************************************

  // getObject("https://hobitours.somee.com/Offer/all/" + language);
  offers = reqApi("https://hobitours.somee.com/Offer/all/" + language);
  offers.then(d=>{
    var ofNum = d.data.length;
    // console.log(d.data.length);
    // console.log(d.data[0]);
    d.data.forEach(e => {

    var offersResult = document.getElementById("offersResults"),
        bigFather = document.createElement("div"),
        father = document.createElement("div"),
        imageFather = document.createElement("div"),
        image = document.createElement("img"),
        day_night = document.createElement("div"),
        days = document.createElement("span"),
        nights = document.createElement("span"),
        offerName = document.createElement("h3"),
        offer = document.createElement("p"),
        ovfow = document.createElement("span"),
        readmore = document.createElement("a");

      bigFather.setAttribute("class" ,`my-3 col-lg${ofNum > 3 ? "-3 col-md-6" : ""} col-sm-12` );
      bigFather.setAttribute("data-aos" ,"fade-up" );
      bigFather.setAttribute("data-aos-delay" ,"600" );

      father.setAttribute("class","post-box");

      imageFather.setAttribute("class","post-img");

      image.src = (e.image == null || undefined || '' ? "assets/img/travel/tourism.jpg" : e.image )
      image.setAttribute("class" , "img-fluid");

      day_night.setAttribute("class" , "meta");
      days.textContent=e.day_night.split(",")[0] + ( language == 'ar' ? "ايام/" : "Days/ " );
      days.setAttribute("class", "post-date");
      nights.textContent=e.day_night.split(",")[1] + ( language == 'ar' ? "ليالي" : "Nights" );
      nights.setAttribute("class" , "post-author");

      offerName.textContent = e.name;
      offerName.setAttribute("class" , "post-title");

      offer.textContent = e.description;
      offer.setAttribute("class" , "offers-p");

      ovfow.textContent = "...";

      readmore.href="offer-details.html?id="+e.id + "&lan=" + language;
      readmore.setAttribute("class" ,"readmore");

      readmore.innerHTML=`${language == 'ar' ? "اقرا اكثر" :"Read more"} <i class="bi bi-arrow-${language == 'ar' ? "left" :"right"}"></i>`;

      imageFather.appendChild(image);

      day_night.appendChild(days);
      day_night.appendChild(nights);

      father.appendChild(imageFather);
      father.appendChild(day_night);
      father.appendChild(offerName);
      father.appendChild(offer);
      father.appendChild(ovfow);
      father.appendChild(readmore);
      bigFather.appendChild(father);
      offersResult.appendChild(bigFather)
    });

  })

  dests = reqApi("https://hobitours.somee.com/destination/all/" + language);
  dests.then((data)=>{
    // let destinations = JSON.parse(data.responseText()).destinations;
    // console.log(data);
    if (destinations == null){
        alert('Error');
        return false;
    }

    data.data.forEach((d, i) => {
      // console.log(d);
      var showData = `
      <div class="col-xl-3 col-lg-4 col-md-6 portfolio-item filter-Destination">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front" style="background: url(${(d.image == null || undefined || '' ? "assets/img/eg/sharm/marsa-alam.jpg" : d.image )});">
                <p> ${d.name} </p>
              </div>
              <div class="flip-card-back">
                <div class="link">
                  <p>${d.description.slice(0,50)} ........</p>
                  <a href="destinations.html?id=${d.id}&lan=${language}" class="btn btn-outline-info"> ${language == 'ar' ? "اقرا اكثر" :"Read more"} </a>                    
                </div>
              </div>
            </div>
          </div>
        </div><!-- End Portfolio Item -->`;
        destinationResult.innerHTML += showData;
      // console.log(showData);
    });
  }).catch((err)=>console.log(err))
//   var comments = ["ssss","gggg","dddd","bbbb"];
//   CommentResult.innerHTML = '';
//   comments.forEach((c)=>{
//     var showele = `
//     <div class="swiper-slide">
//     <div class="testimonial-item">
//       <img src="assets/img/testimonials/testimonials-3.jpg" class="testimonial-img" alt="">
//     <h3>${c}</h3>
//     <h4>Store Owner</h4>
//     <div class="stars">
//       <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
//     </div>
//     <p>
//       <i class="bi bi-quote quote-icon-left"></i>
//       Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
//       <i class="bi bi-quote quote-icon-right"></i>
//     </p>
//   </div>
// </div><!-- End testimonial item -->
// `
//     CommentResult.innerHTML += showele;
//   })
}

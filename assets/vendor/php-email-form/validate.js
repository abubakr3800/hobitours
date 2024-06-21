(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      var msg =
      {
        name : thisForm.name.value,
        email : thisForm.email.value,
        subject : thisForm.subject.value,
        message : thisForm.message.value
      };
      var sendMsg = sendApi("http://api.hobitourstravel.com/contact/add", msg,"POST");
      sendMsg.then((res)=>{
        displayS(thisForm)
      });
    });
  });


  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }
  function displayS(thisForm) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.sent-message').innerHTML = "Your message has been sent. Thank you!";
    thisForm.querySelector('.sent-message').classList.add('d-block');
  }
  function sendApi(url, data, method) {
    // Create a new promise
    return new Promise((resolve, reject) => {
      // Create a new XHR object
      const xhr = new XMLHttpRequest();
      // Set the response type to JSON
      xhr.responseType = "json";
      // Open the request with the given url
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-type", "application/json");
      // Define what to do when the request is loaded
      xhr.onload = function () {
        // Check if the status is 200 (OK)
        if (this.status === 200) {
          // Resolve the promise with the response object
          resolve(this.response);
        } else {
          // Reject the promise with the status text
          reject(new Error(this.statusText));
        }
      };
      // Define what to do in case of an error
      xhr.onerror = function () {
        // Reject the promise with the status text
        reject(new Error("An error occurred while making the request"));
      };
      // Send the request
      xhr.send(JSON.stringify(data));
    });
  }
})();

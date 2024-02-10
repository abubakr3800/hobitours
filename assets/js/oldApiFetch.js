function getObject(API) {
    var d;
    fetch(API)
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            // console.log(res);
            return res.json();
        })
        .then((data) => {
          console.log(data.data[0]);
          d = data.data[0];
        }
              )
        .catch((error) => 
               console.error("Unable to fetch data:", error));
        
      return d;
}
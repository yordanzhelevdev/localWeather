window.onload = () => {
  (function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(myPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }())

  function myPosition(pos) {

    //request to the server
    const xhttp= new XMLHttpRequest(),
          {latitude, longitude} = pos.coords,
          url = `https://api.apixu.com/v1/current.json?key=9e4f604fae6149328e8175716170906&q=${latitude},${longitude}`;

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //tuk parsvame datata v json format
        const myObj = JSON.parse(this.responseText);
        const infoDiv = document.getElementById("weather-div"); // Info Div

        //location name and country
        const loc = document.createElement("p");
        loc.id = "locName";
        const locT = document.createTextNode(myObj.location.name + "/" + myObj.location.country);
        loc.appendChild(locT);
        document.getElementById("loc-div").appendChild(loc);

        //Weather status - text
        const weatherStatusT = document.createElement("p");
        weatherStatusT.id = "weatherText";
        const wText = document.createTextNode(myObj.current.condition.text);
        weatherStatusT.appendChild(wText);
        infoDiv.appendChild(weatherStatusT);


        //Weather status - icon
        const weatherStatus = document.createElement("img");
        weatherStatus.src = "http://" + myObj.current.condition.icon;
        weatherStatus.id = "weatherStatus";
        infoDiv.appendChild(weatherStatus);

        //Temp Celsius
        const tempC = document.createElement("p");
        const tempCText = document.createTextNode(myObj.current.temp_c + '\u2103');
        tempC.appendChild(tempCText);
        infoDiv.appendChild(tempC);



        //Celsius to Fahr button
        const btn = document.createElement("button");
        btn.id = "btnCel";
        const btnT = document.createTextNode("Fahrenheit");
        btn.appendChild(btnT);


        function convertDegrees() {
          if (btn.innerHTML === "Fahrenheit") {
            tempC.innerHTML = myObj.current.temp_f + "\u2109";
            btn.innerHTML = "Celsius";
          } else if (btn.innerHTML === "Celsius") {
            tempC.innerHTML = myObj.current.temp_c + "\u2103";
            btn.innerHTML = "Fahrenheit";
          }
        }
        btn.addEventListener('click', convertDegrees)
        infoDiv.appendChild(btn);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }
}
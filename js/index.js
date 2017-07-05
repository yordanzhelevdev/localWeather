function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(myPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function myPosition(pos) {
  var latitude = pos.coords.latitude;
  var longitude = pos.coords.longitude;
  
  //loging location
  console.log(latitude);
  console.log(longitude);

  //request to the server
  var xhttp = new XMLHttpRequest();
  var url =
    "https://api.apixu.com/v1/current.json?key=9e4f604fae6149328e8175716170906&q=" +
    latitude +
    "," +
    longitude +
    "";
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //tuk parsvame datata v json format
      myObj = JSON.parse(this.responseText);
      
      
      var infoDiv = document.getElementById("weather-div");// Info Div
       
      
      //Weather status//
      
      
       //location name and country
      var loc = document.createElement("p");
      loc.id = "locName";
      var locT = document.createTextNode(myObj.location.name + "/" + myObj.location.country);
      loc.appendChild(locT);
      document.getElementById("loc-div").appendChild(loc);
      
      
      
      
      
      
      
      
      
      
      //Weather status - text
      var weatherStatusT = document.createElement("p");
      weatherStatusT.id = "weatherText";
      var wText = document.createTextNode(myObj.current.condition.text);
      weatherStatusT.appendChild(wText);
      infoDiv.appendChild(weatherStatusT);
      
      
      //Weather status - icon
      var weatherStatus = document.createElement("img");
      weatherStatus.src = "http://"+myObj.current.condition.icon;
      weatherStatus.id = "weatherStatus";
      infoDiv.appendChild(weatherStatus);
     
      //Temp Celsius
      var tempC = document.createElement("p");
      var tempCText = document.createTextNode(myObj.current.temp_c + '\u2103');
      tempC.appendChild(tempCText);
      infoDiv.appendChild(tempC);
      
     
      
      //Celsius to Fahr button
      var btn = document.createElement("button");
      btn.id = "btnCel";
      var btnT = document.createTextNode("Fahrenheit");
      btn.appendChild(btnT);
      
      btn.onclick = function(){
        if(btn.innerHTML === "Fahrenheit"){
          tempC.innerHTML = myObj.current.temp_f + "\u2109";
          btn.innerHTML = "Celsius";
        }
        else if(btn.innerHTML === "Celsius"){
          tempC.innerHTML = myObj.current.temp_c + "\u2103";
          btn.innerHTML = "Fahrenheit";
        }
      };
      infoDiv.appendChild(btn);
      
      
    }    
  };
  xhttp.open("GET", url, true);
  xhttp.send();

  //console.log(url);
}

//there we call the function to get the user position
getLocation();
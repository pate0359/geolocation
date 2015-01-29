document.addEventListener("DOMContentLoaded", function () {
	
	var btn = document.createElement("BUTTON");        
		var t = document.createTextNode("Get My Location");       
		btn.appendChild(t);                        
		btn.className="btn";
		btn.addEventListener("click",getLocation);
		document.body.appendChild(btn);
		
	
});

function getLocation()
{
	//Create container div
	var output = document.createElement("div");
	output.setAttribute("class","output");
	document.body.appendChild(output);
	
	//Browser does not support geolocation API
  if (!navigator.geolocation){
    //Error message pop up
	var div = document.createElement("div");
	div.setAttribute("id","err_dialog");
	div.innerHTML = "Sorry, but your browser does not support location based awesomeness.";
	div.style.display="none";
	document.body.appendChild(div);
	  
    return;
  }

	//got the location
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

//    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=14&size=400x400&sensor=false&&markers=color:blue%7Clabel:S";

	 output.innerHTML="";
    output.appendChild(img);
	  
  };

	//Error while getting location
  function error() {
	var div = document.createElement("div");
	div.setAttribute("id","err_dialog");
	div.innerHTML = "Unable to retrieve your location.";
	div.style.display="none";
	document.body.appendChild(div);
  };

  output.innerHTML = "<p style='text-align: center'>Locating…</p>";

	//get current position
  navigator.geolocation.getCurrentPosition(success, error);
	
}

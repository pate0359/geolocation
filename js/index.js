var canvas, output, errorDiv;

document.addEventListener("DOMContentLoaded", function () {

	//Create button
	var btn = document.createElement("BUTTON");
	var t = document.createTextNode("Get My Location");
	btn.appendChild(t);
	btn.className = "btn";
	btn.addEventListener("click", getLocation);
	document.body.appendChild(btn);
});

function getLocation() {

	//Create container div
	output = document.querySelector(".output");
	if (!output) {
		output = document.createElement("div");
		output.setAttribute("class", "output");
		document.body.appendChild(output);
	}

	//if browser does not support geolocation API
	if (!navigator.geolocation) {
		//Error message pop up
		errorDiv = document.querySelector("#err_dialog");
		if (!errorDiv) {
			errorDiv = document.createElement("div");
			errorDiv.setAttribute("id", "err_dialog");
			document.body.appendChild(errorDiv);
		}
		errorDiv.style.display = 'block';
		errorDiv.innerHTML = "Sorry, but your browser does not support location based awesomeness.";
		//set timeout for error msg
		setTimeout(function () {
			errorDiv.style.display = 'none';
		}, 3000); //3secs

		return;
	}

	//got the location
	function success(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		//output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
		document.querySelector("#locating").innerHTML = "";

		//Draw Image
		canvas = document.querySelector(".canvas");
		if (!canvas) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("class", "canvas");
			//			canvas.style="width: 400px";
			document.querySelector('.output').appendChild(canvas);
		}

		canvas.width = "400";
		canvas.height = "400";
		var ctx = canvas.getContext('2d');
		var img = new Image();
		img.onload = function () {
			ctx.drawImage(img, 0, 0);
		};

		img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=14&size=400x400&sensor=false&markers=color:orange%7Clabel:N%7C" + latitude + "," + longitude + "";

	};

	//Error while getting location
	function error() {
		document.querySelector("#locating").innerHTML = "";
		errorDiv = document.querySelector("#err_dialog");
		if (!errorDiv) {
			errorDiv = document.createElement("div");
			errorDiv.setAttribute("id", "err_dialog");
			document.body.appendChild(errorDiv);
		}
		errorDiv.style.display = 'block';
		errorDiv.innerHTML = "Unable to retrieve your location.";

		//set timeout for error msg
		setTimeout(function () {
			errorDiv.style.display = 'none';
		}, 3000); //3secs

	};

	output.innerHTML = "<p id='locating' style='text-align: center'>Locating…</p>";

	var params = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		}
		//get current position
	navigator.geolocation.getCurrentPosition(success, error, params);
}
window["clockTwelve"] = window["clockTwelve"] || true;
window["clockColor"] = window["clockColor"] || "FFFFFF";
window["clockLineColor"] = window["clockLineColor"] || "FFFFFF";
window["clockOpacity"] = window["clockOpacity"] || 0.8;
window["clockLang"] = window["clockLang"] || "en";
window["clockShadow"] = window["clockShadow"] || false;

function drawLine() {
	var c = document.getElementById("drawCanvas");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.strokeStyle = "#"+window["clockLineColor"];
	ctx.lineWidth = 2;
	ctx.lineCap = "round";
	ctx.moveTo(1,3);
	ctx.lineTo(1,128);
	ctx.stroke();
	return ctx;
}
function updateConfig() {
	document.getElementById("clock").style.opacity = window["clockOpacity"];
	document.getElementById("clock").style.color = "#"+window["clockColor"];
	for(i=0;i<document.getElementsByTagName("*").length;i++){
		document.getElementsByTagName("*")[i].style.fontFamily = "SanFrancisco";
	}
	if (window["clockShadow"]) {
		document.getElementById("clock").style["text-shadow"] = "0 5px 10px rgba(0,0,0,0.2)";
	}
}
function updateClock() {
	var currentTime = new Date();
	var currentHours = currentTime.getHours();
	var add = "";
	switch(window["clockLang"]) {
		case "en":
			abrevDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
			abrevMon = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "SEPT", "OCT", "NOV", "DEC"];
			break;
		case "es":
			abrevDay = ["DOM", "LUN", "MART", "MIER", "JUE", "VIER", "SAB"];
			abrevMon = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUL", "JUN", "AUG", "SEPT", "OCT", "NOV", "DIC"];
			break;
		case "de":
			abrevDay = ["SON", "MON", "DIEN", "MITT", "DONN", "FREI", "SAM"];
			abrevMon = ["JAN", "FEB", "MÄRZ", "APR", "KANN", "JUNI", "JULI", "AUG", "SEPT", "OKT", "NOV", "DEZ"];
			break;
		case "fu":
			abrevDay = ["GOD", "HELL", "MEH", "HUMP", "CLOSE", "WEEKEND", "WEEKEND"];
			abrevMon = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "SEPT", "OCT", "NOV", "DEC"];
			break;
	}
	var currentMinutes = currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes();
	var currentSeconds = currentTime.getSeconds() < 10 ? '0' + currentTime.getSeconds() : currentTime.getSeconds();
	var currentDay = abrevDay[currentTime.getDay()];
	var currentMonth = abrevMon[currentTime.getMonth()];
	
	if (window["clockTwelve"]) {
		currentHours >= 12 ? add = "PM" : add = "AM";
		currentHours = ((currentHours-1)%12)+1
	} else {
		currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
	}
	document.getElementById("time").innerHTML = currentHours+":"+currentMinutes+add;
	document.getElementById("date").innerHTML = currentDay+", "+currentMonth+" "+currentTime.getDate();
}

function init(){
	updateConfig();
	updateClock();
	drawLine();
	setInterval(updateClock, 1000);
}

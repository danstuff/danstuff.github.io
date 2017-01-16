function openTab(evt, name){
	var i, tabcontent, tablinks;
	
	tabcontent = document.getElementsByClassName("tabcontent");
	for(i = 0; i < tabcontent.length; i++){
		tabcontent[i].style.display = "none";
	}
	
	tablinks = document.getElementsByClassName("tablinks");
	for(i = 0; i < tablinks.length; i++){
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	
	document.getElementById(name).style.display = "block";
	evt.currentTarget.className += " active";
	
	window.scrollTo(0,0);
}

function hasParameter(name, url){
	//populate url
	if(!url) url = window.location.href;
	
	//search for everything after a ?name= or &name=
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
	
	var results = regex.exec(url);	
	
	//return false if not found, otherwise true
	if(!results) 
		return false;
		
	return true;
}

document.getElementById("default").click();

//cut certain elements based on URL tags
var elem;

if(hasParameter('software_only')){
	elem = document.getElementById("tab_theater");
	elem.parentNode.removeChild(elem);
	
	elem = document.getElementById("res_theater");
	elem.parentNode.removeChild(elem);
	console.log("so set");
}
if(hasParameter('theater_only')){
	elem = document.getElementById("tab_software");
	elem.parentNode.removeChild(elem);
	
	elem = document.getElementById("res_software");
	elem.parentNode.removeChild(elem);
}
if(hasParameter('no_tabs')){
	var elem = document.getElementById("tab_software");
	elem.parentNode.removeChild(elem);
	var elem = document.getElementById("tab_theater");
	elem.parentNode.removeChild(elem);
}
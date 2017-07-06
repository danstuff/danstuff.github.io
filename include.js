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

function printPage(){
	var elem;

	elem = document.getElementById("header");
	elem.parentNode.removeChild(elem);
	
	elem = document.getElementById("footer");
	elem.parentNode.removeChild(elem);

	elem = document.getElementById("resume");
	elem.style.paddingTop = 0;
	
	elem = document.getElementById("header_print");
	elem.innerHTML = "<h3>danyost23@gmail.com <br>\
			908-451-2213 <br>\
			danstuff.github.io</h3>\
			<h1>DAN YOST</h1>\
			<h2>Student - Westfield, NJ</h2>\
			<br>";
			
	elem = document.getElementsByTagName("p");
	for(var i in elem){
		if(elem.hasOwnProperty(i))
			elem[i].style.lineHeight = "1.5em";
	}
	
	elem = document.getElementsByTagName("p");
	for(var i in elem){
		if(elem.hasOwnProperty(i))
			elem[i].style.lineHeight = "1.5em";
	}
	
	window.print();
	
	location.reload();
}

document.getElementById("default").click();

//cut certain elements based on URL tags
var elem;

if(hasParameter('software_off')){
	elem = document.getElementById("tab_software");
	elem.parentNode.removeChild(elem);
	
	elem = document.getElementById("res_software");
	elem.parentNode.removeChild(elem);
}
if(hasParameter('theater_off')){
	elem = document.getElementById("tab_theater");
	elem.parentNode.removeChild(elem);
	
	elem = document.getElementById("res_theater");
	elem.parentNode.removeChild(elem);
}
if(hasParameter('no_tabs')){
	elem = document.getElementById("tab_software");
	elem.parentNode.removeChild(elem);
	
	elem = document.getElementById("tab_theater");
	elem.parentNode.removeChild(elem);
}
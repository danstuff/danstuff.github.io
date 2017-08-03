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
	
	//check if url contains value of name
	return (url.indexOf(name) > -1);
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
	elem.innerHTML = "<h6>danyost23@gmail.com <br>\
			908-451-2213 <br>\
			danstuff.github.io</h6>\
			<h4>DANIEL YOST</h4>\
			<h5>Student - Westfield, NJ</h5><br><br>";
			
	elem = document.querySelectorAll("p");
	for(var i in elem){
		if(elem.hasOwnProperty(i)){
			elem[i].style.fontSize = "13px";
			elem[i].style.lineHeight = "1.5em";
		}
	}		
			
	elem = document.querySelectorAll("div.tabcontent h1");
	for(var i in elem){
		if(elem.hasOwnProperty(i)){
			elem[i].style.fontSize = "16px";
		}
	}
	
	elem = document.querySelectorAll("div.tabcontent h2");
	for(var i in elem){
		if(elem.hasOwnProperty(i)){
			elem[i].style.fontSize = "15px";
		}
	}
	
	elem = document.querySelectorAll("div.tabcontent h3");
	for(var i in elem){
		if(elem.hasOwnProperty(i)){
			elem[i].style.fontSize = "13px";
		}
	}
	
	window.print();
	
	location.reload();
}

document.getElementById("default").click();

//cut certain elements based on URL tags
var elem;

if(hasParameter('nsoft')){
	elem = document.getElementById("tab_software");
	elem.parentNode.removeChild(elem);
	
	elem = document.getElementById("res_software");
	elem.parentNode.removeChild(elem);
}
if(hasParameter('nthea')){
	elem = document.getElementById("tab_theater");
	elem.parentNode.removeChild(elem);
	
	elem = document.getElementById("res_theater");
	elem.parentNode.removeChild(elem);
}
if(hasParameter('nvolu')){
	elem = document.getElementById("res_volunteer");
	elem.parentNode.removeChild(elem);
}
if(hasParameter('ntabs')){
	elem = document.getElementById("tab_software");
	elem.parentNode.removeChild(elem);
	
	elem = document.getElementById("tab_theater");
	elem.parentNode.removeChild(elem);
}
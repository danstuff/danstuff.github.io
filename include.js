var slide_index = 0;

function slideshow(index){
	var slides;
	
	slides =  document.getElementsByClassName("slide");
	
	if(!slides) return;
	
	if(index >= slides.length){
		slide_index = 0;
	}else if(index < 0){
		slide_index = slides.length-1;
	}
	
	index = slide_index;
	
	for(i = 0; i < slides.length; i++){
		if(i != index){
			slides[i].style.display = "none";
		}else{
			slides[i].style.display = "block";
		}
	}
}

function slideshowLeft(){
	slide_index--;
	slideshow(slide_index);
}
function slideshowRight(){
	slide_index++;
	slideshow(slide_index);
}

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

function removeCat(name){
	var elem;
	
	elem = document.getElementById("tab_"+name);
	if(elem)	elem.parentNode.removeChild(elem);
	
	elem = document.getElementById("res_"+name);
	if(elem)	elem.parentNode.removeChild(elem);
}

function setSize(selector, font_size, line_height){
	var elems = document.querySelectorAll(selector);
	for(var i in elems){
		if(elems.hasOwnProperty(i)){
			elems[i].style.fontSize = font_size;
			elems[i].style.lineHeight = line_height;
		}
	}			
}

function printPage(){
	document.getElementById("default").click();
	
	//remove header and footer
	var header = document.getElementById("header");
	header.parentNode.removeChild(header);
	
	var footer = document.getElementById("footer");
	footer.parentNode.removeChild(footer);

	var resume = document.getElementById("resume");
	resume.style.paddingTop = 0;
		
	var elem = document.getElementById("header_print");
	elem.innerHTML = "<h3 style=\"float:right;\">danyost23@gmail.com <br><br>\
			908-451-2213 <br><br>\
			danstuff.github.io</h3>\
			<br><h1>DANIEL YOST</h1>\
			<h2 style=\"padding:0;\">Student - Westfield, NJ</h2><br>";
			
	setSize("p",  "0.75em", "1.25em");
	setSize("h1", "1em", "0.5em");
	setSize("h2", "1em", "0.5em");
	setSize("h3", "1em", "0.5em");
	
	window.print();
	
	location.reload();
}

document.getElementById("default").click();

//cut elements based on URL tags
if(hasParameter('nsoft'))	removeCat("software");
if(hasParameter('nthea'))	removeCat("theater");
if(hasParameter('nvolu'))	removeCat("volunteer");

//set up slideshow
slideshow(slide_index);
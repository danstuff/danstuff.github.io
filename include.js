var slide_x = 0;
var slide_x_target = 0;

var slide_filter = "";

function mod(a, b){
	return ((a%b)+b)%b;
}

function slideshow(){
	//tween slide_x towards the target
	slide_x += (slide_x_target-slide_x)*0.05;
	
	//calculate the length of both arrays
	var image_len = $(".slide_image"+slide_filter).length;
	var text_len = $(".slide_image"+slide_filter).length;
	
	//calculate the width of the image wrapper and amplitude
	var wrap_w = $("#slide_image_wrapper").width();
	var amp = wrap_w-$(".slide_image").width();
	
	//calculate which text will be visible
	var text_selected = mod(slide_x_target, text_len);
	
	//for each filtered slide image...
	$(".slide_image"+slide_filter).each( function(index) {
		//animate in a 3d circle pattern
		var delta = (index-slide_x)*((2*Math.PI)/(image_len));
		
		var left = Math.sin(delta)*amp*0.9+amp/2;
		var zIndex = Math.round(Math.cos(delta)*10);
		var opacity = Math.cos(delta)+0.5;
		var zoom = (Math.cos(delta)+1)/2;
		
		$(this).css({
			"left":left.toString()+"px",
			"z-index":zIndex.toString(),
			"opacity":opacity.toString(),
			"transform":"scale("+zoom.toString()+")"
		});
	});
	
	//for each filtered slide text...
	$(".slide_text"+slide_filter).each( function(index) {
		//hide if not the selected one
		if(index == text_selected){
			$(this).css({
				"opacity":"+=0.02",
				"display":"block"
			});
		}else{
			$(this).css({
				"opacity":"0",
				"display":"none"
			});
		}
	});
}

function move(amount){
	if($(".slide_image"+slide_filter).length > 1)
		slide_x_target += amount;
}

function setFilter(filter){
	slide_x = 0;
	slide_x_target = $(".slide_text"+filter).length;

	slide_filter = filter;

	//set all slides to be hidden
	$(".slide_image").css({"display":"none"});
	$(".slide_text").css({"display":"none"});
	
	//show only the slides that have filter class
	$(".slide_image"+filter).css({"display":"block"});
	$(".slide_text"+filter).css({"display":"block", "opacity":"0"});
}

function background(){
	//find the document height
	var top = document.getElementsByClassName("top")[0];
	var footer = document.getElementsByClassName("footer")[0];
	
	var doc_height = footer.getBoundingClientRect().bottom - 
						top.getBoundingClientRect().top;

	//find the colors used by the css code
	var style = window.getComputedStyle(document.body);
							
	var color_bkga = style.getPropertyValue('--color-bkga');
	var color_bkgb = style.getPropertyValue('--color-bkgb');
	var color_bkgc = style.getPropertyValue('--color-bkgc');
							
	//generate the trianglify background
	var pattern = Trianglify({
		width: window.innerWidth,
		height: doc_height,
		x_colors: [color_bkga, color_bkgb, color_bkgc]
	});
		
	pattern.canvas(document.getElementById("background"));
}

$(document).ready(function(){
	$("#home").click(function(){ setFilter(""); });
	$("#resume").click(function(){ setFilter(".resume"); });
	$("#films").click(function(){ setFilter(".film"); });
	$("#games").click(function(){ setFilter(".game"); });
	
	$("#slide_left").click(function(){ move(-1); });
	$("#slide_right").click(function(){ move(1); });
	
	setInterval( slideshow, 10);
	
	$(window).resize( background );
	
	background();
	
	$("#home").click();
});
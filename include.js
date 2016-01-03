$(document).ready(function(){
	$(".nav").mouseenter(function(){
		 $(this).animate({opacity: '0.5'});
	});
	$(".nav").mouseleave(function(){
		 $(this).animate({opacity: '1.0'});
	});
});
$(document).ready(function() {

$(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out'
	});

$(".animate-button").click(function(){
	$("#form").fadeOut(1000);
});

});
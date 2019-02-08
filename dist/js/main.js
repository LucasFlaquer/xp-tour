$(function() {
	toggleMenu();
	offsetHeight();
});


function toggleMenu() {
	$('.header .nav-togle').click(function (e){
		e.preventDefault();
		$('.header--nav').slideToggle(400);
		$(this).toggleClass('open');
		$('body').toggleClass('open');
		$(this).children('.fa').toggleClass('fa-bars');
		$(this).children('.fa').toggleClass('fa-times');

	});	
}

function offsetHeight() {
	$('a.header--link').click(function(e) {
		var href = $(this).attr('href');
		// e.preventDefault();
		// console.log('href');
		$("body, html").animate({ 
    scrollTop: $(href).offset().top - 84   }, "slow");
	})
}
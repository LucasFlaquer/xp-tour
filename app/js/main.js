$(function() {
	toggleMenu();
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
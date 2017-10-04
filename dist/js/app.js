(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(window).load(function() {
	function initCarousel(){
	  	$('#c-product__carousel').slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			dots: true,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 5000,
			pauseOnFocus: true,
			pauseOnHover: true,
			pauseOnDotsHover: true,
			customPaging : function(slider, i) {
				var thumb = $(slider.$slides[i]).data();
				return '<a>'+(i + 1)+'</a>';
			},
			responsive: [
				{
					breakpoint: 1025,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		});

		$('#c-product__carousel--vertical').slick({
			vertical: true,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			dots: true,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 5000,
			pauseOnFocus: true,
			pauseOnHover: true,
			pauseOnDotsHover: true,
			verticalSwiping: true,
			prevArrow: $('.top-arrow'),
			nextArrow: $('.bottom-arrow'),
			customPaging : function(slider, i) {
				var thumb = $(slider.$slides[i]).data();
				return '<a>'+(i + 1)+'</a>';
			},
			responsive: [
				{
					breakpoint: 1025,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		});
	}
	setTimeout(initCarousel, 2000);

    
});
},{}]},{},[1]);

//# sourceMappingURL=app.js.map

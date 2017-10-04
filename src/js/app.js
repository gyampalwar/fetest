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
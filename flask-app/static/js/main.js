(function($) {
    'use strict';

    /* -------------------------------------------------------
     PORTFOLIO FILTER SET ACTIVE CLASS FOR STYLE
    ----------------------------------------------------------*/
    $('.portfolio-filter li').on('click', function(event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    /* ----------------------------------------------------
     PORTFOLIO MASONRY STYLE ISOTOPE
    ------------------------------------------------------*/
    var $varPortfolioMasonry = $('.portfolio-masonry');
    if (typeof imagesLoaded == 'function') {
        imagesLoaded($varPortfolioMasonry, function() {
            setTimeout(function() {
                $varPortfolioMasonry.isotope({
                    itemSelector: '.portfolio-item',
                    resizesContainer: false,
                    layoutMode: 'masonry',
                    filter: '*'
                });
            }, 500);

        });
    };

    /* ---------------------------------------------------
     PORTFOLIO FILTERING
     ---------------------------------------------------- */
    $('.portfolio-filter').on('click', 'a', function() {
        $(this).addClass('current');
        var filterValue = $(this).attr('data-filter');
        $(this).parents('.portfolio-filter-wrap').next().isotope({
            filter: filterValue
        });
    });

    /* ---------------------------------------------
     MASONRY STYLE BLOG.
    ------------------------------------------------ */
    var $blogContainer = $('.blog-masonry');
    if ($.fn.imagesLoaded && $blogContainer.length > 0) {
        imagesLoaded($blogContainer, function() {
            setTimeout(function() {
                $blogContainer.isotope({
                    itemSelector: '.post-grid-item',
                    layoutMode: 'masonry'
                });
            }, 500);

        });
    } 

    /*-------------------------------------------
        SCROLL TO TOP BUTTON
    ---------------------------------------------*/
	$('body').append('<a id="back-to-top" class="to-top-btn" href="#"><i class="fa fa-angle-up"></i></a>');
	if ($('#back-to-top').length) {
		var scrollTrigger = 100, // px
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('#back-to-top').addClass('to-top-show');
				} else {
					$('#back-to-top').removeClass('to-top-show');
				}
			};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('#back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 500);
		});
	};

    /* ---------------------------------------------
     VENOBOX/LIGHT BOX PLUGIN.
    --------------------------------------------- */
    $('.venobox').venobox({
        numeratio: true, 
        framewidth: '50%' 
    });

    /* ---------------------------------------------
     MENU HAMBURGER AND FULL SCREEN  OVERLAY.
    --------------------------------------------- */
    $('.hamburger').on('click', function() {
        $(this).toggleClass('is-active');
        $(this).next().toggleClass('nav-show')
    });
    $('.menu-button a').on('click', function() {
        $('.overlay').fadeToggle(300);
        $(this).toggleClass('btn-open').toggleClass('btn-close');
    });
    $('.overlay').on('click', function() {
        $('.menu-button').fadeToggle(300);
        $('.button a').toggleClass('btn-open').toggleClass('btn-close');
        open = false;
    });

    /* ---------------------------------------------
     OFF CANVASS MENU HANDLER
    --------------------------------------------- */    
    $('.flay-out-menu-btn').on('click', function() {
        $('.header-left').toggleClass('flay-header-in');
        $(this).toggleClass('flay-close');
    });

    /* ---------------------------------------------
     MENU TREE VIEW.
    --------------------------------------------- */
    $('#sidebar-menu').treeview({
        animated: 'medium',
        collapsed: true,
        unique: true,
        toggle: function() {
            window.console && console.log('%o was toggled', this);
        }
    });

    /* ---------------------------------------------
     SINGLE PROJECT SLICK SLIDER.
    --------------------------------------------- */
    $('.adam-slider-active').slick({
        dots: false,
        autoplay: true,
        infinite: true,
        arrows: false,
        fade: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
    /* ---------------------------------------------
     SINGLE PROJECT SLICK SLIDER.
    --------------------------------------------- */
    $('.adam-slider-active-5').slick({
        dots: false,
        autoplay: false,
        infinite: true,
        arrows: true,
        fade: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });

    /* ---------------------------------------------
     SINGLE PROJECT SLICK SLIDER.
    --------------------------------------------- */
    $('.single-project-gallery-slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });

    /* ---------------------------------------------
     TESTIMONIAL SLICK SLIDER.
    --------------------------------------------- */
    $('.testimonial-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false,
    });

    /* ---------------------------------------------
     BRAND LOGO SLICK SLIDER.
    --------------------------------------------- */
    $('.client-logo-wrapper').slick({
        dots: false,
        arrows: false,
        slidesToShow: 5,
        infinite: true,
        speed: 300,
        adaptiveHeight: true,
        responsive: [

            { breakpoint: 991, settings: { slidesToShow: 4 } },
            { breakpoint: 767, settings: { slidesToShow: 3 } },
            { breakpoint: 479, settings: { slidesToShow: 2 } },
        ]
    });

    /*------------------------------------------------
     FUN FACT COUNTER ACTIVATION
    -------------------------------------------------- */
    $('.counter-number').counterUp({
        delay: 20,
        time: 2000
    });

    /*------------------------------------------------
     WOW JS ACTIVATION
    -------------------------------------------------- */    
    new WOW().init();

    /*------------------------------------------------
     BOOTSTRAP ACCORDION 
    -------------------------------------------------- */
    $('.panel-heading a').on('click',function(e){
        if($(this).parents('.panel').children('.panel-collapse').hasClass('in')){
            e.stopPropagation();
        }
        e.preventDefault();
    });  
    
    /*--------------------------------
    MOBILE MENU ACTIVE
    -----------------------------------*/
    $('.mobile-menu').meanmenu();

    // Contact form
        var form = $('#main-contact-form');
        form.submit(function(event){
                event.preventDefault();
                var form_status = $('<div class="form_status"></div>');
                $.ajax({
                        url: $(this).attr('action'),
			type: "POST",
			data: $(this).serialize(),
                        beforeSend: function(){
                                form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> <b>Email is being sent...</b></p>').fadeIn() );
                        }
                }).done(function(data){
                        form_status.html('<p class="text-success"><b>Thank you for Contacting Us. We will get back to you soon.</b></p>').delay(9000).fadeOut();
                });
        });

})(jQuery);

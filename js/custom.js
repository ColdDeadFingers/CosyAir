/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Home Slider
4. Init Search
5. Init Menu
6. Init Isotope


******************************/
var preloader = document.getElementById('load-screen');

window.addEventListener('load', function(){
	document.body.removeChild(preloader);
})

$(document).ready(function(){
	"use strict"
	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var hambActive = false;
	var menuActive = false;
	var logo = $('.logo-img')

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initHomeSlider();
	initSearch();
	initMenu();
	initIsotope();

	/* 

	2. Set Header

	*/
	var btn = document.getElementById('clickin');
	document.body.onload = alerter()
	function alerter(){
		btn.click();
	}
	function setHeader()
	{
		if($(window).scrollTop() > 50)
		{
			header.addClass('scrolled');
			logo.css({'transition':'1s', 'margin-top': '0.33rem',});
			logo.addClass('logo-resized');
		}
		else
		{
			header.removeClass('scrolled');
			logo.css('transition', '.8s');
			logo.removeClass('logo-resized');
		}
	}
	function myFunction() {
		document.getElementById("myDropdown").classList.toggle("show");
	  }
	  


	/* 

	3. Init Home Slider

	*/

	function initHomeSlider()
	{
		if($('.home_slider').length)
		{
			var homeSlider = $('.home_slider');
			homeSlider.owlCarousel(
			{
				items:1,
				autoplay:true,
				autoplayTimeout:10000,
				loop:true,
				nav:false,
				smartSpeed:1200,
				dotsSpeed:1200,
				fluidSpeed:1200
			});

			/* Custom dots events */
			if($('.home_slider_custom_dot').length)
			{
				$('.home_slider_custom_dot').on('click', function()
				{
					$('.home_slider_custom_dot').removeClass('active');
					$(this).addClass('active');
					homeSlider.trigger('to.owl.carousel', [$(this).index(), 1200]);
				});
			}

			/* Change active class for dots when slide changes by nav or touch */
			homeSlider.on('changed.owl.carousel', function(event)
			{
				$('.home_slider_custom_dot').removeClass('active');
				$('.home_slider_custom_dots li').eq(event.page.index).addClass('active');
			});

			// add animate.css class(es) to the elements to be animated
			function setAnimation ( _elem, _InOut )
			{
				// Store all animationend event name in a string.
				// cf animate.css documentation
				var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

				_elem.each ( function ()
				{
					var $elem = $(this);
					var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

					$elem.addClass($animationType).one(animationEndEvent, function ()
					{
						$elem.removeClass($animationType); // remove animate.css Class at the end of the animations
					});
				});
			}

			// Fired before current slide change
			homeSlider.on('change.owl.carousel', function(event)
			{
				var $currentItem = $('.home_slider_item', homeSlider).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-out]");
				setAnimation ($elemsToanim, 'out');
			});

			// Fired after current slide has been changed
			homeSlider.on('changed.owl.carousel', function(event)
			{
				var $currentItem = $('.home_slider_item', homeSlider).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-in]");
				setAnimation ($elemsToanim, 'in');
			})
		}
	}

	/*

	3.5 - Owl Carousel implementation

	*/
	$('.owl-carousel').owlCarousel({
		item: 2,
		loop:true,
		margin:50,
		nav:false,autoplay:true,
		autoplayTimeout:2000,
		autoplayHoverPause:false
	});
	$('.play').on('click',function(){
		owl.trigger('play.owl.autoplay',[1000])
	})
	$('.stop').on('click',function(){
		owl.trigger('stop.owl.autoplay')
	})
	/* 

	4. Init Search

	*/

	function initSearch()
	{
		if($('.search').length && $('.search_panel').length)
		{
			var search = $('.search');
			var panel = $('.search_panel');

			search.on('click', function()
			{
				panel.toggleClass('search-panel-active');
			});
		}
	}

	/* 

	5. Init Menu

	*/

	function initMenu()
	{
		if($('.hamburger').length)
		{
			var hamb = $('.hamburger');

			hamb.on('click', function(event)
			{
				event.stopPropagation();

				if(!menuActive)
				{
					openMenu();
					
					$(document).one('click', function cls(e)
					{
						if($(e.target).hasClass('menu_mm'))
						{
							$(document).one('click', cls);
						}
						else
						{
							closeMenu();
						}
					});
				}
				else
				{
					$('.menu').removeClass('active');
					menuActive = false;
				}
			});

			//Handle page menu
			if($('.page_menu_item').length)
			{
				var items = $('.page_menu_item');
				items.each(function()
				{
					var item = $(this);

					item.on('click', function(evt)
					{
						if(item.hasClass('has-children'))
						{
							evt.preventDefault();
							evt.stopPropagation();
							var subItem = item.find('> ul');
						    if(subItem.hasClass('active'))
						    {
						    	subItem.toggleClass('active');
								TweenMax.to(subItem, 0.3, {height:0});
						    }
						    else
						    {
						    	subItem.toggleClass('active');
						    	TweenMax.set(subItem, {height:"auto"});
								TweenMax.from(subItem, 0.3, {height:0});
						    }
						}
						else
						{
							evt.stopPropagation();
						}
					});
				});
			}
		}
	}

	function openMenu()
	{
		var fs = $('.menu');
		fs.addClass('active');
		hambActive = true;
		menuActive = true;
	}

	function closeMenu()
	{
		var fs = $('.menu');
		fs.removeClass('active');
		hambActive = false;
		menuActive = false;
	}

	/* 

	6. Init Isotope

	*/

	function initIsotope()
	{
		var sortingButtons = $('.product_sorting_btn');
		var sortNums = $('.num_sorting_btn');

		if($('.product_grid').length)
		{
			var grid = $('.product_grid').isotope({
				itemSelector: '.product',
				layoutMode: 'fitRows',
				fitRows:
				{
					gutter: 30
				},
	            getSortData:
	            {
	            	price: function(itemElement)
	            	{
	            		var priceEle = $(itemElement).find('.product_price').text().replace( '$', '' );
	            		return parseFloat(priceEle);
	            	},
	            	name: '.product_name',
	            	stars: function(itemElement)
	            	{
	            		var starsEle = $(itemElement).find('.rating');
	            		var stars = starsEle.attr("data-rating");
	            		return stars;
	            	}
	            },
	            animationOptions:
	            {
	                duration: 750,
	                easing: 'linear',
	                queue: false
	            }
	        });
		}
	}

});
/*

animation on scroll

*/
(function($) {
	$.fn.visible = function(partial) {
	  
		var $t            = $(this);
		var	$w            = $(window);
		var	viewTop       = $w.scrollTop();
		var	viewBottom    = viewTop + $w.height();
		var	_top          = $t.offset().top;
		var	_bottom       = _top + $t.height();
		var	compareTop    = partial === true ? _bottom : _top;
		var	compareBottom = partial === true ? _top : _bottom;
	  
	  return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  
	};
	  
  })(jQuery);

  /*call function*/
var win = $(window);
//float left
var allModsLeft = $(".hidden-float-right");

allModsLeft.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible"); 
  } 
});

win.scroll(function(event) {
  
  allModsLeft.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("float-in-left"); 
    } 
  });
  
});

var modsLeft = $(".hidden-float-right").addClass(function () {
    return $(this).visible(true) && "already-visible";
});

$(window).on("scroll", function () {
  modsLeft.each(function () {
    $(this).toggleClass("float-in-left", $(this).visible(true));
  });
});


//float right
var allModsRight = $(".hidden-float-left");

allModsRight.each(function(i, el) {
	var el = $(el);
	if (el.visible(true)) {
	  el.addClass("already-visible"); 
	} 
  });
  
  win.scroll(function(event) {
	
	allModsRight.each(function(i, el) {
	  var el = $(el);
	  if (el.visible(true)) {
		el.addClass("float-in-right"); 
	  } 
	});
	
  });
  
  var modsRight = $(".hidden-float-left").addClass(function () {
	  return $(this).visible(true) && "already-visible";
  });
  
  $(window).on("scroll", function () {
	modsRight.each(function () {
	  $(this).toggleClass("float-in-right", $(this).visible(true));
	});
  });

$('.details-block').click(function(){
	$(".social-share-buttons").toggle("100");
})

/* BACK TO TOP BTN */
var bttButton = document.getElementById('backToTop');
window.onscroll = function() {
  scrollFunction()
};
function scrollFunction(){
	if(document.documentElement.scrollTop > 100){
		bttButton.style.display = 'block';
		bttButton.style.animation = 'float-in-left .5s';
	}
	else{
		bttButton.style.animation = 'float-in-right .3s';
		bttButton.style.display = 'none';
	}
}
/* CART FUNCTIONS */
var cart = document.getElementsByClassName('add-to-cart');
var cartEffect = document.getElementsByClassName('cart-effect');
var product = document.getElementsByClassName('product')


var newCartEffect =	parseInt(cartEffect[0].innerHTML);
var incrementer = function(){	
	if(newCartEffect <= 0 || newCartEffect > 0){
		newCartEffect = cartEffect[0].innerHTML++
	}
}
for(let i = 0; i < 100; i++){
	cart[i].onclick = incrementer;
}



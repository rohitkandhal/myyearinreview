/**
 * cbpBGSlideshow.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpBGSlideshow = (function() {

	var $slideshow = $( '#slideShow' ),
		$items = $slideshow.children( 'li' ),
		$title = $( '#headerTitle'),
		$subTitle = $( '#headerSubTitle'),
		$musicControlBtn = document.getElementById('musicControlBtn'),
		itemsCount = $items.length,
		$controls = document.getElementById('cbp-bicontrols'),
		navigation = {
			$navPrev : $controls.getElementsByClassName( 'cbp-biprev' )[0],
			$navNext : $controls.getElementsByClassName( 'cbp-binext' )[0],
			$navPlayPause : $controls.getElementsByClassName( 'cbp-bipause' )[0]
		},

		// current item´s index
		current = 0,
		// timeout
		slideshowtime,
		// true if the slideshow is active
		isSlideshowActive = true,
		// it takes 3.5 seconds to change the background image
		interval = 3500;

	var desc = [
		{ title: "A Look Back - 2014" , subTitle: "Its time to look back and reflect on all that was accomplished throughout the year, and extend gratitude to everyone for their love and support."},
		{ title: "People", subTitle: "School Buddies"},
		{ title: "People", subTitle: "Masti Gang"},
		{ title: "People", subTitle: "Delhi Gang w/ Uncle"},
		{ title: "People", subTitle: "Audi Wale Bhaiya"},
		{ title: "People", subTitle: "Smile @ Sunrise"},
		{ title: "People", subTitle: "The Beauties"},
		{ title: "People", subTitle: "The Partiers"},
		{ title: "People", subTitle: "The Smart Ones"},
		{ title: "People", subTitle: "Longtime Friend"},
		{ title: "People", subTitle: "Jolly Fellas"},
		{ title: "People", subTitle: "The Entrepreneur"},
		{ title: "People", subTitle: "Serious Colleagues"},
		{ title: "Travel", subTitle: "Best Thing I Did This Year"},
		{ title: "Travel", subTitle: "This Picture Does No Justice"},
		{ title: "Travel", subTitle: "Mountains, Ocean, Long Drive"},
		{ title: "Travel", subTitle: "Sunset @ Seattle"},
		{ title: "Travel", subTitle: "Sunrise @ OuterBanks"},
		{ title: "Travel", subTitle: "Olympic National Park"},
		{ title: "Travel", subTitle: "Downtown Seattle"},
		{ title: "Travel", subTitle: "High Tides"},
		{ title: "Career", subTitle: "Masters - Check"},
		{ title: "Career", subTitle: "The Excitement"},
		{ title: "Career", subTitle: "Great Opportunities + $$$"},
		{ title: "Experiences", subTitle: "'just' 1 Relationship In Whole Year"},
		{ title: "Experiences", subTitle: "^..^..^..^..^"},
		{ title: "Experiences", subTitle: "Yoga - A Journey To Inner Peace"},
		{ title: "Celebration", subTitle: "Tera Bhai Got Married"},
		{ title: "Naughtiness", subTitle: "Spoiler Alert"},
		{ title: "Naughtiness", subTitle: "Kandy - Tu ni Bachega =)"},
		{ title: "Naughtiness", subTitle: "Bunu 101"},
		{ title: "Naughtiness", subTitle: "Bunu's Makeup 101"},
		{ title: "Naughtiness", subTitle: "Kid with Google Glass"},
		{ title: "Naughtiness", subTitle: "I am BatMan"},
		{ title: "Naughtiness", subTitle: "Game of Wines"},
		{ title: "Naughtiness", subTitle: "Like A Boss"},
		{ title: "Naughtiness", subTitle: "Our Favorite Chef"},
		{ title: "Naughtiness", subTitle: "Papa Kehte H Bada Naam Karega"},
		{ title: "Naughtiness", subTitle: "This Is Mine"},
		{ title: "Materialism", subTitle: "First Good Sound System"},
		{ title: "Materialism", subTitle: "And These"},
		{ title: "Materialism", subTitle: "And This"},
		{ title: "Materialism", subTitle: "Just for Pic... Ok Google"},
		{ title: "Random", subTitle: "Long Drive Alone w/ Punjabi Beats (700mi)"},
		{ title: "Thank You!! It's Been a Great Year", subTitle: "Looking Forward To Another Rocking Year"}
		];


	function init( config ) {

		updateTitles(0);

		// preload the images
		$slideshow.imagesLoaded( function() {
			
			if( Modernizr.backgroundsize ) {
				$items.each( function() {
					var $item = $( this );
					$item.css( 'background-image', 'url(' + $item.find( 'img' ).attr( 'src' ) + ')' );
				} );
			}
			else {
				$slideshow.find( 'img' ).show();
				// for older browsers add fallback here (image size and centering)
			}

			// show first item
			$items.eq( current ).css( 'opacity', 1 );
			// initialize/bind the events
			initEvents();
			// start the slideshow
			startSlideshow();

			toggleMusic();
		} );
		
	}

	function updateTitles(index){
		$title.text(desc[index].title);

		$subTitle.fadeOut("fast", function(){
			$subTitle.text(desc[index].subTitle)
		}).fadeIn("slow");		
	}

	function initEvents() {

		function playPauseSlideShow(){
			var $control = $( this );
			if( $control.hasClass( 'cbp-biplay' ) ) {
				$control.removeClass( 'cbp-biplay' ).addClass( 'cbp-bipause' );
				startSlideshow();
			}
			else {
				$control.removeClass( 'cbp-bipause' ).addClass( 'cbp-biplay' );
				stopSlideshow();
			}						
		}

		function prevSlide(){
			navigate( 'prev' ); 
			if( isSlideshowActive ) { 
				startSlideshow(); 
			} 
		}

		function nextSlide(){
			navigate( 'next' ); 
			if( isSlideshowActive ) { 
				startSlideshow(); 
			}
		}

		EventUtil.addHandler(navigation.$navPlayPause, "click", playPauseSlideShow);
		EventUtil.addHandler(navigation.$navPrev, "click", prevSlide);
		EventUtil.addHandler(navigation.$navNext, "click", nextSlide);
		EventUtil.addHandler($musicControlBtn, "click", toggleMusic);
	}

	function navigate( direction ) {

		// current item
		var $oldItem = $items.eq( current );
		
		if( direction === 'next' ) {
			current = current < itemsCount - 1 ? ++current : 0;
		}
		else if( direction === 'prev' ) {
			current = current > 0 ? --current : itemsCount - 1;
		}

		// new item
		var $newItem = $items.eq( current );
		// show / hide items
		$oldItem.css( 'opacity', 0 );
		$newItem.css( 'opacity', 1 );

		updateTitles(current);
	}

	function startSlideshow() {

		isSlideshowActive = true;
		clearTimeout( slideshowtime );
		slideshowtime = setTimeout( function() {
			navigate( 'next' );
			startSlideshow();
		}, interval );

	}

	function stopSlideshow() {
		isSlideshowActive = false;
		clearTimeout( slideshowtime );
	}

	function toggleMusic(){
		var player = document.getElementById('musicPlayer'); 
		var button = document.getElementById('musicControlBtn');

		if(player.paused){
			button.className = "icon-stop-music";
			player.play();
		}else{
			button.className = "icon-play-music";
			player.pause();
		}
	}

	return { init : init };

})();
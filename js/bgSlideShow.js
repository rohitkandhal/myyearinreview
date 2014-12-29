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

		itemsCount = $items.length,
		$controls = $( '#cbp-bicontrols' ),
		navigation = {
			$navPrev : $controls.find( 'span.cbp-biprev' ),
			$navNext : $controls.find( 'span.cbp-binext' ),
			$navPlayPause : $controls.find( 'span.cbp-bipause' )
		},
		// current item´s index
		current = 0,
		// timeout
		slideshowtime,
		// true if the slideshow is active
		isSlideshowActive = true,
		// it takes 3.5 seconds to change the background image
		interval = 4000;

	var desc = [
		{ title: "A Look Back - 2014" , subTitle: "Its time to look back and reflect on all that was accomplished throughout the year, and extend gratitude to everyone for their love and support."},
		{ title: "People", subTitle: "School Buddies"},
		{ title: "People", subTitle: "Laugh Buddies"},
		{ title: "People", subTitle: "Delhi Gang w/ Uncle"},
		{ title: "People", subTitle: "Audi Wale Bhaiya"},
		{ title: "People", subTitle: "Smile @Sunrise"},
		{ title: "People", subTitle: "Beauties"},
		{ title: "People", subTitle: "The Partiers"},
		{ title: "People", subTitle: "The Smart Ones"},
		{ title: "People", subTitle: "Longtime Friend"},
		{ title: "People", subTitle: "Jolly Fellas"},
		{ title: "People", subTitle: "The Entrepreneur"},
		{ title: "People", subTitle: "Serious Colleagues"},
		{ title: "Travel", subTitle: "Best Thing I Did This Year"},
		{ title: "Travel", subTitle: "This Picture Doesn't Do Justice"},
		{ title: "Travel", subTitle: "Mountains, Ocean, Drive"},
		{ title: "Travel", subTitle: "Sunset @ Seattle"},
		{ title: "Travel", subTitle: "Sunrise @ OuterBanks"},
		{ title: "Travel", subTitle: "Olympic National Park"},
		{ title: "Travel", subTitle: "Downtown Seattle"},
		{ title: "Travel", subTitle: "High Tides"},
		{ title: "Career", subTitle: "Masters - Check"},
		{ title: "Career", subTitle: "The Excitement"},
		{ title: "Career", subTitle: "Work"},
		{ title: "Experiences", subTitle: "'just' One In Whole Year"},
		{ title: "Experiences", subTitle: "^..^..^..^..^"},
		{ title: "Experiences", subTitle: "Yoga - A Journey To Inner Peace"},
		{ title: "Naughtiness", subTitle: "Spoiler Alert"},
		{ title: "Naughtiness", subTitle: "This Is Mine"},
		{ title: "Naughtiness", subTitle: "Kandy - Tu Ni Bachega =)"},
		{ title: "Naughtiness", subTitle: "Bunu 101"},
		{ title: "Naughtiness", subTitle: "Bunu's Makeup 101"},
		{ title: "Naughtiness", subTitle: "Sirji's Moto Racer Fever"},
		{ title: "Naughtiness", subTitle: "I Am BatMan"},
		{ title: "Naughtiness", subTitle: "Game of Wines"},
		{ title: "Naughtiness", subTitle: "Ahem Ahem... Entrepreneur At Work"},
		{ title: "Naughtiness", subTitle: "Oopsss"},
		{ title: "Naughtiness", subTitle: "...."},
		{ title: "Naughtiness", subTitle: "Kid With Google Glass"},
		{ title: "Materialism", subTitle: "First Good Sound System"},
		{ title: "Materialism", subTitle: "And These"},
		{ title: "Materialism", subTitle: "And This"},
		{ title: "Materialism", subTitle: "Just For Pic"},
		{ title: "Random", subTitle: "Long Drive Alone w/ Punjabi Music (700m)"},
		{ title: "Thank You!! It's Been a Great Year", subTitle: "Looking Forward To Another Rocking Year"}
		];


	function init( config ) {

		// preload the images
		$slideshow.imagesLoaded( function() {
			
			$title.text(desc[0].title);
			$subTitle.text(desc[0].subTitle);

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

		} );
		
	}

	function initEvents() {

		navigation.$navPlayPause.on( 'click', function() {

			var $control = $( this );
			if( $control.hasClass( 'cbp-biplay' ) ) {
				$control.removeClass( 'cbp-biplay' ).addClass( 'cbp-bipause' );
				startSlideshow();
			}
			else {
				$control.removeClass( 'cbp-bipause' ).addClass( 'cbp-biplay' );
				stopSlideshow();
			}

		} );

		navigation.$navPrev.on( 'click', function() { 
			navigate( 'prev' ); 
			if( isSlideshowActive ) { 
				startSlideshow(); 
			} 
		} );
		navigation.$navNext.on( 'click', function() { 
			navigate( 'next' ); 
			if( isSlideshowActive ) { 
				startSlideshow(); 
			}
		} );

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


		$title.text(desc[current].title);
		$subTitle.text(desc[current].subTitle);
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

	return { init : init };

})();
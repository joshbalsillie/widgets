/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2016-09-07
 */

'use strict'; // ECMAScript version 5 strict mode

var modal = {
	hide: function( element ){
		// close the provided element
		element.style.display = 'none';
	},
	show: function( element ){
		// show the provided element
		element.style.display = 'block';
	},
	hideContent: function( element ){
		// Hide the content in the modal
		if( element.parentElement.classList ){
			while( !element.parentElement.classList.contains( 'modal' )){
				element = element.parentElement;
			}
			modal.hide( element );
		}
		else if( element.classList.contains( 'modal' )){
			for( var index = 0; index < element.children.length; ++index ){
				if( !element.children[ index ].classList.contains( 'show' )){
					// show only first modal
					modal.hide( element.children[ index ] );
					index = element.children.length; // End the 'for' statement
				}
			}
		}
	},
	showContent: function( element ){
		// Show the content in the modal
		while( !element.classList.contains( 'modal' )){
			// 
			element = element.parentElement;
		}
		for( var index = 0; index < element.children.length; ++index ){
			if( !element.children[ index ].classList.contains( 'show' )){
				// show only first modal
				modal.show( element.children[ index ] );
				index = element.children.length; // End the 'for' statement
			}
		}
	},
	affix: {
		hideContent: function( elements ){
			// Add the hideContent function to the provided elements
			Object.keys( elements ).forEach( function( index ){
				// 'elements' = an array or HTMLCollection
				// 'index' = ingeger representing the first to the last indexed values, one at a time
				elements[ index ].addEventListener( 'click', function(){
					modal.hideContent( elements[index] );
				}, false );
			});
		},
		showContent: function( elements ){
			// Add the showContent function to the provided elements
			Object.keys( elements ).forEach( function( index ){
				// 'elements' = an array or HTMLCollection
				// 'index' = ingeger representing the first to the last indexed values, one at a time
				elements[ index ].addEventListener( 'click', function(){
					modal.showContent( elements[index] );
				}, false );
			});
		}
	},
	getContainersFrom: function( widgets ){
		// retrieve all the container elements
		var containers = [];

		for( var countWidgets = 0; countWidgets < widgets.length; ++countWidgets ){
			// loop throught the widgets
			var widgetChildren = widgets[ countWidgets ].children;

			for( var countChildren = 0; countChildren < widgetChildren.length; ++countChildren ){
				if( !widgetChildren[ countChildren ].classList.contains( 'show' )){
					containers.push( widgetChildren[ countChildren ] );
				}
			}
		}
		return containers;
	},
	modifyAll: function( widgets ){
		// Modify all the widget elements
		Object.keys( widgets ).forEach( function( index ){
			// An array of 'elements' passing array indexes in sequence
			var hideElements = widgets[ index ].getElementsByClassName('hide');
			modal.affix.hideContent( hideElements );

			var containers = modal.getContainersFrom( widgets );
			modal.affix.hideContent( containers );

			var showElements = document.getElementsByClassName('show');
			modal.affix.showContent( showElements );
		});
	},
	domLoaded: document.addEventListener('DOMContentLoaded', function( event ){
		// Wait for page to load
		var widgets = document.getElementsByClassName('modal');
		modal.modifyAll( widgets );
	})
};
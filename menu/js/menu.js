/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2016-09-07
 */

'use strict'; // ECMAScript version 5 strict mode

var menu = {
	cssClass: {
		configure: function( widgetClass, showOrHideClass ){
			menu.cssClass.widget = widgetClass;
			menu.cssClass.showOrHide = showOrHideClass;

			var widgets = document.getElementsByClassName( menu.cssClass.widget );
			menu.modifyAll( widgets );
		}
	},
	hide: function( element ){
		// close the provided element
		//element.style.display = 'none';
		element.removeAttribute( 'style' );
	},
	show: function( element ){
		// show the provided element
		element.style.display = 'inline-block';
	},
	showOrHide: function( element ){
		// show or hide
		if( !menu.getSiblingOf( element ).style.display ){
			menu.showContent( element );
		}
		else if( menu.getSiblingOf( element ).style.display ){
			menu.hideContent( element );
		}
	},
	hideContent: function( element ){
		// Hide the content in the menu
		while( !element.classList.contains( menu.cssClass.widget )){
			// 
			element = element.parentElement;
		}
		for( var index = 0; index < element.children.length; ++index ){
			if( !element.children[ index ].classList.contains( menu.cssClass.showOrHide )){
				// hide only first menu container
				menu.hide( element.children[ index ] );
				index = element.children.length; // End the 'for' statement
			}
		}
	},
	showContent: function( element ){
		// Show the content in the menu
		while( !element.classList.contains( menu.cssClass.widget )){
			// 
			element = element.parentElement;
		}
		for( var index = 0; index < element.children.length; ++index ){
			if( !element.children[ index ].classList.contains( menu.cssClass.showOrHide )){
				// show only first menu container
				menu.show( element.children[ index ] );
				index = element.children.length; // End the 'for' statement
			}
		}
	},
	affix: {
		showOrHideContent: function( elements ){
			// Add the showOrHide function to the provided elements
			Object.keys( elements ).forEach( function( index ){
				// 'elements' = an array or HTMLCollection
				// 'index' = ingeger representing the first to the last indexed values, one at a time
				elements[ index ].addEventListener( 'click', function(){
					menu.showOrHide( elements[index] );
				}, false );
				elements[ index ].addEventListener( 'resize', function(){
					menu.showOrHide( elements[index] );
				}, false );
			});
		},
		hideContent: function( elements ){
			// Add the hideContent function to the provided elements
			Object.keys( elements ).forEach( function( index ){
				// 'elements' = an array or HTMLCollection
				// 'index' = ingeger representing the first to the last indexed values, one at a time
				elements[ index ].addEventListener( 'click', function(){
					menu.hideContent( elements[index] );
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
				if( !widgetChildren[ countChildren ].classList.contains( menu.cssClass.showOrHide )){
					containers.push( widgetChildren[ countChildren ] );
				}
			}
		}
		return containers;
	},
	getSiblingOf: function( element ){
		// Return the sibling of an element with only one sibling
		try{
			// Try to get the sibling, otherwise throw an error
			if( element.parentElement.childElementCount === 2 ){
				// Make sure there are exactly two siblings
				if( element.nextSibling != null ){
					return element.nextElementSibling;
				}
				else if( element.previousElementSibling != null ){
					return element.previousSibling;
				}
			}
			else if( element.parentElement.childElementCount > 2 ){
				throw element.parentElement + ' contains more than 2 elements.';
			}
			else if( element.parentElement.childElementCount < 2 ){
				throw element.parentElement + ' contains less than 2 elements.';
			}
		}
		catch( error ){
			console.error( error );
		}
	},
	modifyAll: function( widgets ){
		// Modify all the widget elements
		Object.keys( widgets ).forEach( function( index ){
			// An array of 'elements' passing array indexes in sequence
			var showOrHideElements = widgets[ index ].getElementsByClassName( menu.cssClass.showOrHide );
			menu.affix.showOrHideContent( showOrHideElements );

			var containers = menu.getContainersFrom( widgets );
			menu.affix.hideContent( containers );
		});
	}
};
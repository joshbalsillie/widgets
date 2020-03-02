/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2020-01-21
 */

'use strict'; // ECMAScript version 5 strict mode

var select = {
	// global placeholder object for defining variables and methods for this file
	query: function( selectors ){
		document.querySelectorAll( selectors ).forEach( function( element ){
			element.innerHTML = new Date().getFullYear();
		});
	},
	insert: {
		currentYear: {
			// insert the current year to any element using the available functions
			toQuery: function( selectors ){
				try{
					document.querySelectorAll( selectors ).forEach( function( element ){
						element.innerHTML = new Date().getFullYear();
					});
				}
				catch( error ){
					console.error( error );
				}
			},
			toId: function( id ){
				try{
					document.getElementById( id ).innerHTML = new Date().getFullYear();
				}
				catch( error ){
					console.error( error );
				}
			},
			toClass: function( aClass ){
				try{
					for( var element of document.getElementsByClassName( aClass ) ){
						element.innerHTML = new Date().getFullYear();
					}
				}
				catch( error ){
					console.error( error );
				}
			},
			toAttribute: function( name, value ){
				if( !time.valueIsBlank( name ) && !time.valueIsBlank( value ) ){
					try{
						document.querySelectorAll( '[' + name + '=' + value + ']' ).forEach( function( element ){
							element.innerHTML = new Date().getFullYear();
						});
					}
					catch( error ){
						console.error( error );
					}
				}
				else if( !time.valueIsBlank( name ) && time.valueIsBlank( value ) ){
					try{
						document.querySelectorAll( '[' + name + ']' ).forEach( function( element ){
							element.innerHTML = new Date().getFullYear();
						});
					}
					catch( error ){
						console.error( error );
					}
				}
				else{
					console.error( 'Name: ' + name + ' and value: ' + value + ' are invalid. Attribute name or name and value must be provided.' );
				}
				
			}
		}
	},
	valueIsBlank( value ){
		// check if the provided value is blank
		return ( typeof value === 'undefined' || value === null || value === '' ) ? true : false;
	}
}
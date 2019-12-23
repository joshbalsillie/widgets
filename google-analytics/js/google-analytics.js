/*
 * @author: Joshua Balsillie
 * @version: 1.1
 * @since: 2018-12-20
 */

'use strict'; // ECMAScript version 5 strict mode

var googleAnalytics = {
	configure: function( source ){
		// Primary function that controls this file
		if( googleAnalytics.dependenciesAreLoaded() ){
			// if any other file or function dependencies are required
			var domHead = document.head || document.getElementsByTagName( 'head' )[ 0 ] || document.childNodes[ 0 ].childNodes[ 0 ];
			var googleTag = googleAnalytics.getGoogleTag( source );
			domHead.append( googleTag );

			var theVariables = googleAnalytics.getURLVariables( source );
			var theId = googleAnalytics.getId( theVariables );
			googleAnalytics.googleSetup( theId );
		}
		else{
			console.error( 'One of this files dependencies could not be loaded, preventing this file from running.');
		}
	},
	getGoogleTag( source ){
		var theTag = document.createElement( 'script' );
		theTag.setAttribute( 'src', source );
		theTag.setAttribute( 'async', '' );
		theTag.setAttribute( 'type', 'text/javascript' );
		return theTag;
	},
	getId: function( variables ){
		if( variables.id || variables.ID || variables.Id || variables.iD ){
			// If the provided variable is included in the source
			return variables.id || variables.ID || variables.Id || variables.iD;
		}
	},
	getURLVariables: function( source ){
	 	// get the analytics site ID
		var variables = {};
		var newTag = document.createElement( 'script' );
		newTag.setAttribute( 'src', source );
		newTag.setAttribute( 'async', '' );

		if( source.includes( '?' ) ){
			// If the source includes variable / value pairs
			var data = source.split( '?' );

			if( data.includes( '&' ) ){
				// If the source includes multiple variable / value pairs
				var variablesAndValues = data.split( '&' );

				variablesAndValues.forEach( function( variableAndValue ){
					var pair = variableAndValue.split( '=' );
					variables[ pair[ 0 ] ] = pair[ 1 ];
				});
			}
			else{
				var pair = data[ 1 ].split( '=' );
				variables[ pair[ 0 ] ] = pair[ 1 ];
			}
		}
	 	return variables;
	},
	googleSetup: function( googleTrackingId ){
		window.dataLayer = window.dataLayer || [];
		function gtag(){
			dataLayer.push( arguments );
		}
		gtag('js', new Date() );
		gtag('config', googleTrackingId );
	},
	dependenciesAreLoaded: function(){
		// check if all the required dependencies for this file are loaded
		switch( true ){
			default: return true;
		}
	}
}
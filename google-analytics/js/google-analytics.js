/*
 * @author: Joshua Balsillie
 * @version: 1.1
 * @since: 2018-12-20
 */

'use strict'; // ECMAScript version 5 strict mode

var googleAnalytics = {
	configure: function( googleTrackingId ){
		// Primary function that controls this file
		if( googleAnalytics.dependenciesAreLoaded() ){
			// if the tagBuilder object is in global scope
			var parentTag = document.head || document.getElementsByTagName( "head" )[ 0 ];
			var childTags = tagBuilder.createTags( googleAnalytics.getVariables( googleTrackingId ));
			
			tagBuilder.tag = parentTag;
			tagBuilder.addChildren( childTags );
		}
		else{
			console.error( 'One of this files dependencies could not be loaded, preventing this file from running.');
		}
		googleAnalytics.googleSetup( googleTrackingId );
	},
	getVariables: function( googleTrackingId ){
	 	// get the variables required for this javascript file
	 	var variables = [
	 		// copy and paste html elements as they would appear in the <head> tag, example: '<tagname attribute="value">'
	 		'<script src="https://www.googletagmanager.com/gtag/js?id=' + googleTrackingId + '" async></script>'
	 	];
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
			case typeof window.tagBuilder === 'object': return true;
			default: return false;
		}
	}
}
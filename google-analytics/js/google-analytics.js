/*
 * @author: Joshua Balsillie
 * @version: 1.1
 * @since: 2018-12-20
 */

(function(){
	// Functions that should run as this file loads
	initiate();

	function initiate(){
		// Primary function that controls this file
		if( dependenciesAreLoaded() ){
			// if the tagBuilder function is in global scope
			var tagBuilder = window.tagBuilder();
			var parentTag = document.head || document.getElementsByTagName( "head" )[ 0 ];
			var childTags = tagBuilder.createTags( getVariables() );
			
			tagBuilder.tag = parentTag;
			tagBuilder.addChildren( childTags );
		}
		else{
			console.error( 'One of this files dependencies could not be loaded, preventing this file from running.');
		}
		googleSetup( 'UA-60673215-1' );
	}
	function getVariables(){
	 	// get the variables required for this javascript file
	 	var googleTrackingId = 'UA-60673215-1';
	 	var variables = [
	 		// copy and paste html elements as they would appear in the <head> tag, example: '<tagname attribute="value">'
	 		'<script src="https://www.googletagmanager.com/gtag/js?id=' + googleTrackingId + '" async></script>'
	 	];
	 	return variables;
	}
	function googleSetup( googleTrackingId ){
		window.dataLayer = window.dataLayer || [];
		function gtag(){
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', googleTrackingId );
	}
	function dependenciesAreLoaded(){
		// check if all the required dependencies for this file are loaded
		switch( true ){
			case typeof window.tagBuilder === 'function': return true;
			default: return false;
		}
	}
})();
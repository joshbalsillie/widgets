/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-20
 */

'use strict'; // ECMAScript version 5 strict mode

(function(){
	// Functions that should run as this file loads
	initiate();

	function initiate(){
		// Primary function that controls this file
		if( dependenciesAreLoaded() ){
			// if the tagBuilder object is in global scope
			var parentTag = document.head || document.getElementsByTagName( "head" )[ 0 ];
			var childTags = tagBuilder.createTags( getVariables() );
			
			tagBuilder.addChildren( childTags, parentTag );
		}
		else{
			console.error( 'One of this files dependencies could not be loaded, preventing this file from running.' );
		}
	}
	function getVariables(){
	 	// get the variables required for this javascript file
	 	var variables = [
	 		// copy and paste html elements as they would appear in the <head> tag, example: '<tagname attribute="value">'
	 		'<script src="../../../widgets/google-analytics/js/google-analytics.js"></script>',
	 		'<script src="../../../widgets/favicon/js/favicon.js"></script>',
	 		'<script src="../../../widgets/filter/js/filter.js"></script>',
	 		'<script src="../../../widgets/modal/js/modal.js"></script>',
	 	];
	 	return variables;
	}
	function dependenciesAreLoaded(){
		// check if all the required dependencies for this file are loaded
		switch( true ){
			case typeof window.tagBuilder === 'object': return true;
			default: return false;
		}
	}
})();
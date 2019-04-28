/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-20
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
	}
	function getVariables(){
	 	// get the variables required for this javascript file
	 	const theRoot = '../../../';
	 	var variables = [
	 		// copy and paste html elements as they would appear in the <head> tag, example: '<tagname attribute="value">'
	 		'<script src="' + theRoot + 'widgets/google-analytics/js/google-analytics.js" async></script>',
	 		'<script src="' + theRoot + 'widgets/favicon/js/favicon.js" async></script>',
	 		'<script src="' + theRoot + 'widgets/filter/js/filter.js" async></script>',
	 		'<script src="' + theRoot + 'widgets/modal/js/modal.js" async></script>',
	 	];
	 	return variables;
	}
	function dependenciesAreLoaded(){
		// check if all the required dependencies for this file are loaded
		switch( true ){
			case typeof window.tagBuilder === 'function': return true;
			default: return false;
		}
	}
})();
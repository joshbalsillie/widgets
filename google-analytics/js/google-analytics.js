/*
 * @author: Joshua Balsillie
 * @version: 1.1
 * @since: 2018-12-20
 */

// The global google analytics function
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

// Add commands to the global google analytics function
ga('create', 'UA-60673215-1', 'auto'); // create new tracker object
ga('send', 'pageview'); // send pageview to Google Analytics

(function(){
	// Functions that should run as this file loads
	initiate();

	function initiate(){
		// Primary function that controls this file
		if( typeof window.tagBuilder === 'function' ){
			// if the tagBuilder function is in global scope
			var tagBuilder = window.tagBuilder();
			var parentTag = document.head || document.getElementsByTagName( "head" )[ 0 ];
			var childTags = tagBuilder.createTags( getVariables() );
			
			tagBuilder.tag = parentTag;
			tagBuilder.addChildren( childTags );
		}
		else{
			console.error( 'function tagBuilder is not defined. tabBuilder is a dependency.')
		}
	}
	function getVariables(){
	 	// get the variables required for this javascript file
	 	var variables = [
	 		// copy and paste html elements as they would appear in the <head> tag, example: '<tagname attribute="value">'
	 		'<script src="https://www.google-analytics.com/analytics.js" async></script>'
	 	];
	 	return variables;
	}
})();
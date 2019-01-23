/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-20
 */

(function(){
	// Functions that should run as this file loads
	if( document.readyState === "loading" ){
		// if document is still loading
		document.addEventListener('DOMContentLoaded', function(){
			initiate();
		});
	}
	else if( document.readyState === "interactive" ){
		// document finished loading and has been parsed
		initiate();
	}
	else if( document.readyState === "complete" ){
		// document and all sub-resources have finished loading
		initiate();
	}

	function initiate(){
		// Primary function that controls this file
		if( typeof window.tagBuilder === 'function' ){
			// if the tagBuilder function is in global scope
			var tagBuilder = window.tagBuilder();
			var parentTag = document.body || document.getElementsByTagName( 'body' )[ 0 ];
			var childTags = tagBuilder.createTags( getVariables() );
			var footerTag = document.createElement( 'footer' );
			
			tagBuilder.tag = footerTag;
			tagBuilder.addChildren( childTags );
			parentTag.appendChild( tagBuilder.tag );
		}
		else{
			console.error( 'function tagBuilder is not defined. tabBuilder is a dependency.')
		}
	}
	function getVariables(){
		// get the variables required for this javascript file
		var currentYear = new Date().getFullYear();
		var variables = [
			// copy and paste html elements as they would appear in the <head> tag, example: '<tagname attribute="value">'
			'<p>Copywrite ⓒ ' + currentYear + ' your name</p>'
		];
		return variables;
	}
})();
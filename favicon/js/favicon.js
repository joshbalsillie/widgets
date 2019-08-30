/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-03
 */

'use strict';

(function(){
	// Functions that should run as this file loads
	initiate();

	function initiate(){
		// Primary function that controls this file
		if( dependenciesAreLoaded() ){
			// if the tagBuilder object is in global scope
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
		var variables = [
			// copy and paste html elements as they would appear in the <head> tag, example: '<tagname attribute="value">'
			// https://realfavicongenerator.net/ for generating favicon files
			'<link rel="apple-touch-icon" sizes="180x180" href="../../../widgets/favicon/images/apple-touch-icon.png">',
			'<link rel="icon" type="image/png" sizes="32x32" href="../../../widgets/favicon/images/favicon-32x32.png">',
			'<link rel="icon" type="image/png" sizes="16x16" href="../../../widgets/favicon/images/favicon-16x16.png">',
			'<link rel="manifest" href="../../../widgets/favicon/images/site.webmanifest">',
			'<link rel="mask-icon" href="../../../widgets/favicon/images/safari-pinned-tab.svg" color="#5bbad5">',
			'<link rel="shortcut icon" href="../../../widgets/favicon/images/favicon.ico">',
			'<meta name="msapplication-TileColor" content="#00aba9">',
			'<meta name="msapplication-config" content="../../../widgets/favicon/images/browserconfig.xml">',
			'<meta name="theme-color" content="#ffffff">'
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
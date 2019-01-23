/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-03
*/
// https://realfavicongenerator.net/ for generating favicon files
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
		const theRoot = '../../../';
		var thePath = 'widgets/favicon/images/';
		const pathFromRoot = theRoot + thePath;
		var variables = [
			// copy and paste html elements as they would appear in the <head> tag, example: '<tagname attribute="value">'
			'<link rel="apple-touch-icon" sizes="180x180" href="' + pathFromRoot + 'apple-touch-icon.png">',
			'<link rel="icon" type="image/png" sizes="32x32" href="' + pathFromRoot + 'favicon-32x32.png">',
			'<link rel="icon" type="image/png" sizes="16x16" href="' + pathFromRoot + 'favicon-16x16.png">',
			'<link rel="manifest" href="' + pathFromRoot + 'site.webmanifest">',
			'<link rel="mask-icon" href="' + pathFromRoot + 'safari-pinned-tab.svg" color="#5bbad5">',
			'<link rel="shortcut icon" href="' + pathFromRoot + 'favicon.ico">',
			'<meta name="msapplication-TileColor" content="#00aba9">',
			'<meta name="msapplication-config" content="' + pathFromRoot + 'browserconfig.xml">',
			'<meta name="theme-color" content="#ffffff">'
		];
		return variables;
	}
})();
/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-03
*/

(function(){
	initiate();
	/*
	 * Section : Functions for this Javascript file
	 */
	function initiate(){
		// Functions that should run as this file loads
		duringPageLoad();
		afterPageLoad();
	}
	function getVariables(){
		// get the variables required for this javascript file
		var variables = [
			// copy and paste html elements as they would appear in the <head> tag, example: '<tagname attribute="value">'
			'<link rel="apple-touch-icon" sizes="180x180" href="../images/apple-touch-icon.png">',
			'<link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32x32.png">',
			'<link rel="icon" type="image/png" sizes="16x16" href="../images/favicon-16x16.png">',
			'<link rel="manifest" href="../images/site.webmanifest">',
			'<link rel="mask-icon" href="../images/safari-pinned-tab.svg" color="#5bbad5">',
			'<link rel="shortcut icon" href="../images/favicon.ico">',
			'<meta name="msapplication-TileColor" content="#00aba9">',
			'<meta name="msapplication-config" content="../image/browserconfig.xml">',
			'<meta name="theme-color" content="#ffffff">'
		];
		return variables;
	}
	function duringPageLoad(){
		// Do not wait for page to load
		var head = document.getElementsByTagName( 'head' )[ 0 ];
		var variables = getVariables();
		var faviconTags = createTags( variables );
		
		addChildrenTo( head, faviconTags );
	}
	function afterPageLoad(){
		// Wait for page to load
		document.addEventListener('DOMContentLoaded', function( event ){
			// Listen for event, then perform the following
		});
	}
	function addChildrenTo( htmlElement, childrenArray ){
		// Add HTML tags to a htmlElement tag
		for( var countTags = 0; countTags < childrenArray.length; ++countTags ){
			if( checkDataTypeOf( childrenArray[ countTags ], 'object' )){
				// check if array value is an object
				htmlElement.appendChild( childrenArray[ countTags ] );
			}
		}
	}
	function convertToHtmlElement( string ){
		// remove the dom and return the html element
		// this function should not be used for <!doctype>, <html>, <head>, <body> due to use of "DOMParser()"
		if( checkDataTypeOf( string, 'string' )){
			// check that the provided variable is a string
			var domParser = new DOMParser();
			var dom = domParser.parseFromString( string, 'text/html' );

			var head = dom.childNodes[0].childNodes[0];
			var body = dom.childNodes[0].childNodes[1];

			if( head.firstChild ){
				// check if DOMParser placed the element in the <head> tag
				return head.childNodes[0];
			}
			else if( body.firstChild ){
				// check if DOMParser placed the element in the <body> tag
				return body.childNodes[0];
			}
			else{
				console.error( 'could not find element created by DOMParser' );
			}
		}
	}
	function checkDataTypeOf( value, dataType ){
		// compare the provided data type to the data type of the value
		if( isValid( dataType ) && isValid( typeof value )){
			// if data types are both valid
			if( dataType === typeof value ){
				// if data types are both equal
				return true;
			}
			else{
				console.error( '"' + value + '" (type: ' + typeof value + ') is not of type "' + dataType + '"' );
				return false;
			}
		}
	}
	function isValid( dataType ){
		// check if the provided value is a valid data type
		switch( dataType ){
			// check if the provided data type is valid
			case 'undefined': return true;
			case 'boolean': return true;
			case 'number': return true;
			case 'string': return true;
			case 'symbol': return true;
			case 'function': return true;
			case 'object': return true;
			default: 
				console.error( '"' + dataType + '" is not a valid data type' );
				return false;
		}
	}
	function createTags( stringOrStringArray ){
		// create the HTML elements required for the favicon
		// https://realfavicongenerator.net/ for generating favicon files
		var htmlElements = []; // Placeholder

		for( var countStrings = 0; countStrings < stringOrStringArray.length; ++countStrings ){
			// for each defined html element
			htmlElements.push( convertToHtmlElement( stringOrStringArray[ countStrings ] ));
		}
		return htmlElements;
	}
})();
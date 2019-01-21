/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-20
 */

(function(){
	// Functions that should run as this file loads
	try{
		var parentTag = document.getElementsByTagName( "head" )[ 0 ];
		var variables = getVariables();
		var childTags = createTags( variables );
		
		addChildrenTo( parentTag, childTags );

	}
	catch( error ){
		addChildrenTo( parentTag, childTags );
	}
	

	function getVariables(){
	 	// get the variables required for this javascript file
	 	var variables = [
	 		// copy and paste html elements as they would appear in the <head> tag, example: '<tagname attribute="value">'
	 		'<script src="../../favicon/js/favicon.js"></script>',
	 		'<script src="../../google-analytics/js/google-analytics.js"></script>',
	 		'<script src="../../footer/js/footer.js"></script>',
	 	];
	 	return variables;
	}
	function addChildrenTo( htmlElement, childrenArray ){
		// Add HTML tags to a htmlElement tag
		for( var countTags = 0; countTags < childrenArray.length; ++countTags ){
			if( verifyDataTypeOf( childrenArray[ countTags ], 'object' )){
				// check if array value is an object
				htmlElement.appendChild( childrenArray[ countTags ] );
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
	function verifyDataTypeOf( value, dataType ){
		// compare the provided data type to the data type of the value
		if( isValid( dataType ) && isValid( typeof value )){
			// if data types are both valid
			if( dataType === typeof value ){
				// if data types are both equal
				return true;
			}
			else{
				return false;
			}
		}
	}
	function createTags( stringOrStringArray ){
		// create the HTML elements required for the favicon
		// https://realfavicongenerator.net/ for generating favicon files
		if( verifyDataTypeOf( stringOrStringArray, 'string' )){
			// if the provided variable is a string
			return convertToHtmlElement( stringOrStringArray );
		}
		else if( verifyDataTypeOf( stringOrStringArray, 'object' )){
			// if the provided variable is an object
			if( Array.isArray( stringOrStringArray )){
				// if the provided variable is an array
				var htmlElements = []; // Placeholder

				for( var countStrings = 0; countStrings < stringOrStringArray.length; ++countStrings ){
					// for each defined html element
					htmlElements.push( convertToHtmlElement( stringOrStringArray[ countStrings ] ));
				}
				return htmlElements;
			}
		}
	}
	function convertToHtmlElement( string ){
		// remove the dom and return the html element
		// this function should not be used for <!doctype>, <html>, <head>, <body> due to use of "DOMParser()"
		if( verifyDataTypeOf( string, 'string' )){
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
})();
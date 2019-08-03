/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-22
 */

'use strict'; // ECMAScript version 5 strict mode

 function tagBuilder(){
	// object that cotains functions, to more easily build HTML tags in the DOM
	var tagBuilder = new Object();
	tagBuilder.tag = null;
	
	tagBuilder.addChildren = function( tags ){
		// Add one or multiple HTML tags to a html Element
		if( tagBuilder.tag.nodeType === Node.ELEMENT_NODE ){
			// if tag is currently set as a element node
			for( var countTags = 0; countTags < tags.length; ++countTags ){
				if( tagBuilder.verifyDataTypeOf( tags[ countTags ], 'object' )){
					// check if array value is an object
					tagBuilder.tag.appendChild( tags[ countTags ] );
				}
			}
		}
		else{
			console.error( 'tagBuilder.tag (' + tagBuilder.tag + ', ' + tagBuilder.tag.nodeType + ') is not defined, or of the correct type.' );
		}
	}
	tagBuilder.createTags = function( stringOrStringArray ){
		// convert strings into executable HTML elements after being placed in the DOM
		if( tagBuilder.verifyDataTypeOf( stringOrStringArray, 'string' )){
			// if the provided variable is a string
			var htmlElement = tagBuilder.convertToHtmlElement( stringOrStringArray );
			return tagBuilder.convertToExecutable( htmlElement );
		}
		else if( tagBuilder.verifyDataTypeOf( stringOrStringArray, 'object' )){
			// if the provided variable is an object
			if( Array.isArray( stringOrStringArray )){
				// if the provided variable is an array
				var htmlElements = []; // Placeholder

				for( var countStrings = 0; countStrings < stringOrStringArray.length; ++countStrings ){
					// for each defined html element
					var htmlElement = tagBuilder.convertToHtmlElement( stringOrStringArray[ countStrings ]);

					htmlElements.push( tagBuilder.convertToExecutable( htmlElement ));
				}
				return htmlElements;
			}
		}
	}
	tagBuilder.convertToExecutable = function( tagElement ){
		// Duplicate the provided tag as a new element in order for all tags to run the 'src' attribute after adding it to the DOM
		// Required to run: <script src=""></script>
		var newTag = document.createElement( tagElement.tagName );

		if( tagElement.hasAttributes() ){
			// Check if the tag has attributes
			for( var countAttributes = 0; countAttributes < tagElement.attributes.length; ++countAttributes ){
				var name = tagElement.attributes[ countAttributes ].name;
				var value = tagElement.attributes[ countAttributes ].value;
				newTag.setAttribute( name, value );
			}
		}
		if( tagElement.textContent ){
			// Check if the tag has content within it
			newTag.textContent = tagElement.textContent;
		}
		return newTag;
	}
	tagBuilder.convertToHtmlElement = function( string ){
		// remove the dom and return the html element
		// this function should not be used for <!doctype>, <html>, <head>, <body> due to use of "DOMParser()"
		var domParser = new DOMParser();

		if( tagBuilder.verifyDataTypeOf( string, 'string' )){
			// if the provided variable is a string
			var dom = domParser.parseFromString( string, 'text/html' );

			var head = dom.childNodes[0].childNodes[0];
			var body = dom.childNodes[0].childNodes[1];

			if( head.firstChild ){
				// if DOMParser placed the element in the <head> tag
				return head.firstChild;
			}
			else if( body.firstChild ){
				// if DOMParser placed the element in the <body> tag
				return body.firstChild;
			}
			else{
				console.error( 'could not find element created by DOMParser' );
			}
		}
	}
	tagBuilder.verifyDataTypeOf = function( value, dataType ){
		// compare the provided data type to the data type of the value
		if( tagBuilder.isValid( dataType ) && tagBuilder.isValid( typeof value )){
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
	tagBuilder.isValid = function( dataType ){
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
	return tagBuilder;
}
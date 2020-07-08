/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-04-12
 */

'use strict'; // ECMAScript version 5 strict mode

var filter = {
	// global placeholder object for defining variables and methods for this file
	by: {
		tag: function( element, tags, delimiter, clearFilters ){
			// element (required) = the HTML element calling this function
			// tag(s) (required) = the HTML tag(s) to apply the filter to
			// delimiter (optional) = the delimiter used if more than one tag is provided
			// clearFilters (optional) = boolean for invoking the clearFilters() method

			var items = filter.getSiblingOf( element.parentElement ).children;
			var tags = filter.stringToArray( tags, delimiter );

			if( clearFilters ){
				filter.clearFilters( element );
			}
			for( var item of items ){
				var itemTagName = item.tagName.toLowerCase();
				var valueFound = tags.some( tag => itemTagName === tag.toLowerCase());

				if( !valueFound ){
					filter.hide( item );
					filter.moveToLast( item );
				}
			}
		},
		attributes: function( element, attributes, delimiter, clearFilters ){
			// element (required) = the HTML element calling this function
			// attribute(s) (required) = the HTML attribute(s) to apply the filter to
			// delimiter (optional) = the delimiter used if more than one attribute is provided
			// clearFilters (optional) = boolean for invoking the clearFilters() method

			var items = filter.getSiblingOf( element.parentElement ).children;
			var attributes = filter.stringToArray( attributes, delimiter );
			
			if( clearFilters ){
				filter.clearFilters( element );
			}
			for( var item of items ){
				var itemAttributes = Array.from( item.attributes, itemAttribute => itemAttribute.nodeName );
				var valueFound = itemAttributes.some( itemAttribute => attributes.some( attribute => itemAttribute === attribute ));

				if( !valueFound ){
					filter.hide( item );
					filter.moveToLast( item );
				}
			}
		},
		attributeValues: function( element, attribute, values, delimiter, clearFilters ){
			// element (required) = the HTML element calling this function
			// attribute (required) = the HTML attribute to apply the filter to
			// value(s) (required)  = the HTML attribute value(s) to apply the filter to
			// delimiter (optional) = the delimiter used if more than one value is provided
			// clearFilters (optional) = boolean for invoking the clearFilters() method

			var items = filter.getSiblingOf( element.parentElement ).children;
			var values = filter.stringToArray( values, delimiter );
			var hiddenItems = [];

			if( clearFilters ){
				filter.clearFilters( element );
			}
			for( var item of items ){
				if( !item.hasAttribute( attribute )){
					filter.hide( item );
				}
				else{
					var itemValues = item.getAttribute( attribute ).split( delimiter );
					var valueFound = itemValues.some( itemValue => values.some( value => itemValue === value ));
					
					if( !valueFound ){
						filter.hide( item );
						hiddenItems.push( item );
					}
				}
			}
			filter.moveToLast( hiddenItems );
		}
	},
	clearFilters: function( element ){
		// Clear all the filters to show all items
		var items = filter.getSiblingOf( element.parentElement ).children;
		
		for( var item of items ){
			filter.show( item );
		}
	},
	moveToLast: function( elements ){
		// Move the provided elements to the end of it's siblings in the DOM
		for( var element of elements ){
			element.parentElement.insertBefore( element, null );
		}
	},
	show: function( element ){
		// show the provided element
		element.style.display = null;
	},
	hide: function( element ){
		// hide the provided element
		element.style.display = 'none';
	},
	stringToArray: function( string, delimiter ){
		// Convert a string to an array with one or more array items
		// string (required) = string with one or more values
		// delimiter (optional) = the delimiter used if more than one value is provided
		if( delimiter ){
			string = string.split( delimiter );
		}
		else{
			string = [ string ];
		}
		return string;
	},
	getSiblingOf: function( element ){
		// Return the sibling of an element with only one sibling
		try{
			// Try to get the sibling, otherwise throw an error
			if( element.parentElement.childElementCount === 2 ){
				// Make sure there are exactly two siblings
				if( element.nextSibling != null ){
					return element.nextElementSibling;
				}
				else if( element.previousElementSibling != null ){
					return element.previousSibling;
				}
			}
			else if( element.parentElement.childElementCount > 2 ){
				throw element.parentElement + ' contains more than 2 elements.';
			}
			else if( element.parentElement.childElementCount < 2 ){
				throw element.parentElement + ' contains less than 2 elements.';
			}
		}
		catch( error ){
			console.error( error );
		}
	}
}
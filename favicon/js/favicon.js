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
	function duringPageLoad(){
		// Do not wait for page to load
		var head = document.getElementsByTagName( "head" )[ 0 ];
		var faviconTags = createFaviconTags();
		addTagsTo( head, faviconTags );
	}
	function afterPageLoad(){
		// Wait for page to load
		document.addEventListener("DOMContentLoaded", function( event ){
			// Listen for event, then perform the following
		});
	}
	function addTagsTo( parentTag, tagElementArray ){
		// Add HTML tags to a parent tag
		for( var countTags = 0; countTags < tagElementArray.length; ++countTags ){
			if( typeof tagElementArray[ countTags ] === "object" ){
				// If array value is an object
				parentTag.appendChild( tagElementArray[ countTags ] );
			}
			else{
				throw "error: tagElementArray[" + countTags + "] is not of type object";
			}
		}
	}
	function convertToHtmlElement( htmlString ){
		// remove the dom and return the html element
		// does not work for <!doctype>, <html>, <head>, <body>
		if( typeof htmlString !== "string" ){
			// check that the provided variable is a string, otherwise throw an error
			throw( "error: " + htmlString + ' is not not of type "string"' );
		}
		else{
			var domParser = new DOMParser();
			var dom = domParser.parseFromString( htmlString, "text/html" );

			var head = dom.childNodes[0].childNodes[0];
			var body = dom.childNodes[0].childNodes[1];

			if( head.firstChild ){
				return head.childNodes[0];
			}
			else if( body.firstChild ){
				return body.childNodes[0];
			}
		}
	}
	function createFaviconTags(){
		// create the HTML elements required for the favicon
		// https://realfavicongenerator.net/ for generating favicon files
		var tags = []; // Placeholder

		tags.push( convertToHtmlElement( '<link rel="apple-touch-icon" sizes="180x180" href="../images/apple-touch-icon.png">' ) );
		tags.push( convertToHtmlElement( '<link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32x32.png">' ) );
		tags.push( convertToHtmlElement( '<link rel="icon" type="image/png" sizes="16x16" href="../images/favicon-16x16.png">' ) );
		tags.push( convertToHtmlElement( '<link rel="manifest" href="../images/site.webmanifest">' ) );
		tags.push( convertToHtmlElement( '<link rel="mask-icon" href="../images/safari-pinned-tab.svg" color="#5bbad5">' ) );
		tags.push( convertToHtmlElement( '<link rel="shortcut icon" href="../images/favicon.ico">' ) );
		tags.push( convertToHtmlElement( '<meta name="msapplication-TileColor" content="#00aba9">' ) );
		tags.push( convertToHtmlElement( '<meta name="msapplication-config" content="../image/browserconfig.xml">' ) );
		tags.push( convertToHtmlElement( '<meta name="theme-color" content="#ffffff">' ) );
		
		return tags;
	}
})();
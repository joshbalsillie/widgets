/*
 * @author: Joshua Balsillie
 * @version: 1.1
 * @since: 2018-12-20
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
		googleAnalytics( 'UA-60673215-1' );
		addGoogleScriptTag( 'UA-60673215-1' );
	}
	function afterPageLoad(){
		// Wait for page to load
		document.addEventListener("DOMContentLoaded", function( event ){
			modifyScript();
		});
	}
	function googleAnalytics( id ){
		// The google analytics function
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', id );
	}
	function addGoogleScriptTag( id ){
		// Add the necessary google script tag to the HTML file
		var head = document.getElementsByTagName( "head" )[ 0 ];
		var script = document.createElement( "script" );
		script.element.setAttribute( "async", "");
		script.element.setAttribute( "src", "https://www.googletagmanager.com/gtag/js?id=" + id );
		head.appendChild( script );
	}
	/*
	 * SECTION : Functions not specific to this Javascript file
	 */
	function retrieveElement( tagName ){
		// Create an object detailing non-standard aspects of the element's html reference
		// Note: keep in mind changes to the DOM may affect accuracy
		function retrieveFilenameFrom( pathName ){
			// Retrieve the filename of the source value
			var splitPath = pathName.split( "/" );
			return splitPath[ splitPath.length - 1 ];
		}
		function retrieveHierarchy( htmlElement ){
			// Retrieve the hierarchical structure of the HTML element
			var hierarchy = []; // Store html elements
			var tempElement = htmlElement; // initial value 

			do{
				hierarchy.unshift( tempElement );
				tempElement = tempElement.parentElement;
			}
			while( tempElement !== null );

			return hierarchy;
		}
		var allElements = document.getElementsByTagName( tagName );
		var theElement = allElements[ allElements.length - 1 ];
		var thePathName = theElement.src;
		var theFilename = retrieveFilenameFrom( thePathName );
		var theName = theFilename.split( "." )[ 0 ];
		var theHierarchy = retrieveHierarchy( theElement );

		htmlReferences = {
			// object detailing aspects of the html reference to this file
			element: theElement, // DOM element
			filename: theFilename, // Filename with extension
			hierarchy: theHierarchy, // DOM element hierarchy
			name: theName, // Filename without extension
			pathName: thePathName // Path name
		}
		return htmlReferences;
	}
})();
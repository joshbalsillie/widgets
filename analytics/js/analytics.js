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
			// Listen for event, then perform the following
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
		script.setAttribute( "async", "");
		script.setAttribute( "src", "https://www.googletagmanager.com/gtag/js?id=" + id );
		head.appendChild( script );
	}
})();
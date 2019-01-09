/*
 * @author: Joshua Balsillie
 * @version: 1.1
 * @since: 2018-12-20
*/

// The global google analytics function
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

// Add commands to the global google analytics function
ga('create', 'UA-60673215-1', 'auto'); // create new tracker object
ga('send', 'pageview'); // send pageview to Google Analytics

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
		var script = asynchronousGoogleCall();

		head.appendChild( script );
	}
	function afterPageLoad(){
		// Wait for page to load
		document.addEventListener("DOMContentLoaded", function( event ){
			// Listen for event, then perform the following
		});
	}
	function asynchronousGoogleCall(){
		// Add the necessary google script tag to the HTML file
		var script = document.createElement( "script" );
		script.setAttribute( "async", "");
		script.setAttribute( "src", "https://www.google-analytics.com/analytics.js" );

		return script;
	}
})();
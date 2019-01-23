/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-12
*/

(function(){
	initiate();
	/*
	 * Section : Functions for this Javascript file
	 */
	function initiate(){
		// Functions that should run as this file loads
		//duringPageLoad(); // placeholder call, comment out if not used
		afterPageLoad(); // placeholder call, comment out if not used
	}
	function duringPageLoad(){
		// Do not wait for page to load
	}
	function afterPageLoad(){
		// Wait for page to load
		document.addEventListener('DOMContentLoaded', function( event ){
			// Listen for event, then perform the following
			fileReader( "../csv/test-for-file-reader.csv" );
		});
	}
})();
/*
 * Section : Global function(s)
 */
 function sanitize( string ){

 }
function fileReader( pathName ){
	// Primary function that accepts a path name
	// Example: '../../folder/folder/file.extension'
	if( window.FileReader ){
		// FileReader is supported
		getTextFrom( pathName );
	}
	else{
		console.error('FileReader is not supported in this browser.');
	}
	function retrieveFilenameFrom( pathName ){
		// Retrieve the filename of the source value
		var splitPath = pathName.split( "/" );
		return splitPath[ splitPath.length - 1 ];
	}
	function getTextFrom( pathName ){
		// Return the text from the file
		var reader = new FileReader();
		reader.addEventListener( "loadend", function(){
		   // reader.result contains the contents of blob as a typed array
		});
		//var result = reader.readAsText( pathName );
		//console.log(result);
	}
	var theFilename = retrieveFilenameFrom( pathName ); // Filename with extension
	var theName = theFilename.split( "." )[ 0 ]; // Filename without extension
	var fileExtension = theFilename.split( "." )[ 1 ].toLowerCase(); // File extension

	if( fileExtension === 'csv' ){
		// if the file is a .csv file
		var csvArray = []; // placeholder
	}
	else if( fileExtension === 'json' ){
		// if the file is a .json file
	}
	else{
		console.error( theFilename + ' is not a supported file type.' );
	}
}
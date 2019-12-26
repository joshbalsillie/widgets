/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-03
 */

'use strict';

var favicon = {
	file: function( pathname, domHtmlElement ){
		// read a file that contains the html elements
		// pathname = the pathname of the target file
		// domHtmlElement = the element to append the file data to
		if( favicon.dependenciesAreLoaded() ){
			// if the tagBuilder object is in global scope
			fileReader.read( pathname, domHtmlElement, {head:true, body:false} );
		}
		else{
			console.error( 'One of this files dependencies could not be loaded, preventing this file from running.');
		}
	},
	dependenciesAreLoaded: function(){
		// check if all the required dependencies for this file are loaded
		switch( true ){
			case typeof window.fileReader === 'object': return true;
			default: return false;
		}
	}
}
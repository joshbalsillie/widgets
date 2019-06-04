/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2016-09-07
 */

'use strict'; // ECMAScript version 5 strict mode

var modal = {
	show: function( that ){
		// Show the content in the modal
		var content = that.nextElementSibling;
		
		content.style.display = "block";
		
		window.onclick = function( event ){
			// After modal is open listen for a click
			if( event.target == content ){
				// if the content container is selected...
				content.style.display = "none"; // close the modal
			}
		}
	},
	hide: function( that ){
		// Hide the content in the modal
		that.parentElement.parentElement.style.display = "none";
	}
};
/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-06-03
 */

'use strict'; // ECMAScript version 5 strict mode

var contactForm = {
	request: function( pathname ){
		// Send a request to the server and store the response
		var request = ( window.XMLHttpRequest ) ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' ); // modern browser option with legacy browser backup

		request.onreadystatechange = function(){
			// first check the user agent 'readyState' && then check the server 'status'
			if( this.readyState === 4 && this.status === 200 ){
				// Done, the operation is complete && the request is ready
				contactForm.display( this.response );
			}
		};
		request.open( 'POST', pathname, true );
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send();
	},
	display: function( response ){
		try{
			if( response.responseType === '' || null ){
				throw 'The server returned a blank value. ("" or null)';
			}
			else if( response.responseType === 'arraybuffer' ){
				throw 'The server responded with an unsuported response type "arraybuffer"';
			}
			else if( response.responseType === 'blob' ){
				throw 'The server responded with an unsuported response type "blob"';
			}
			else if( response.responseType === 'document' ){
				throw 'The server responded with an unsuported response type "document"';
			}
			else if( response.responseType === 'json' ){
				/*
				htmlTag.innerHTML = this.responseText;
				} else {
				htmlTag.innerHTML = "Loading...";
				*/
				console.log( response );
			}
			else if( response.responseType === 'text' ){
				throw 'The server responded with an unsuported response type "text"';
			}
			else if( response.responseType === 'moz-chunked-arraybuffer' ){
				throw 'The server responded with an unsuported response type "moz-chunked-arraybuffer"';
			}
			else if( response.responseType === 'ms-stream' ){
				throw 'The server responded with an unsuported response type "ms-stream"';
			}
		}
		catch( message ){
			
		}
	}
}
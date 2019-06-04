/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-06-03
 */

'use strict'; // ECMAScript version 5 strict mode

var contactForm = {
	userNotifications:,
	getNotifications: function(){
		var htmlTag = document.getElementById("content");
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "hello.php");
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlhttp.send();
		xmlhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
		htmlTag.innerHTML = this.responseText;
		} else {
		htmlTag.innerHTML = "Loading...";
		};
	},
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
		request.open( 'GET', pathname, true );
		request.send();
	},
	checkForErrors: function( response ){
		if( response.responseType === '' ){
			throw 'The server returned a blank value. ('' || null)';
		}
		catch( error ){

		}
	}
	display: function( response ){
		if( response.responseType === '' ){
			throw 'The server returned a blank value. ('' || null)';
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
			throw 'The server responded with an unsuported response type "json"';
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
		catch( error ){

		}
	}
}
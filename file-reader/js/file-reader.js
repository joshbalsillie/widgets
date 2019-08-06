/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-12
 */
 
'use strict'; // ECMAScript version 5 strict mode

var fileReader = {
	// global placeholder object for defining variables and methods for this file
	supportedFileTypes: [ 'csv', 'html' ], // the file types supported by this javascript file;
	file: function( pathname ){
		var pathArray = pathname.split( "/" ); // path split into array
		var identifier = pathArray[ pathArray.length - 1 ]; // last array item, which is the filename and filename extension
		var nameAndExtension = identifier.split( "." ); // array with only two values, the name of the file and the extension

		this.directory = pathname.substring(0, pathname.lastIndexOf('/')); // the directory of the file
		this.name = nameAndExtension[ 0 ]; // the filename
		this.extension = nameAndExtension[ nameAndExtension.length - 1 ]; // the file extension
		this.isSupported = checkSupportFor( fileReader.supportedFileTypes, fileReader.extension );
		return this;

		function checkSupportFor( supportedFileTypes, extension ){
			// check if the provided file is supported
			var pathArray = pathname.split( "/" ); // path split into array
			var filename = pathArray[ pathArray.length - 1 ]; // last array item, which is the filename
			var nameAndExtension = filename.split( "." ); // array with only two values, the name of the file and the extension 
			var theExtension = nameAndExtension[ nameAndExtension.length - 1 ].toLowerCase(); // the file extension
			
			for( var index = 0; index < supportedFileTypes.length; index++ ){
				// for each supported file type
				if( supportedFileTypes[ index ].toLowerCase() === theExtension ){
					// check if it matches the extension
					return true;
				}
			}
			return false;
		}
	},
	convert: {
		// placeholder object for adding data conversion methods
		csvToArray: function( theRequest ){
			// convert data from a CSV file to an array
			var dataArray = []; // placeholder for data returned by this function
			
			getRecordsFrom( theRequest ).forEach( function( record ){
				// for each data record (row)
				var rowArray = []; // placeholder for temporary data

				if( !recordIsEmpty( record )){
					// if the record (row) is not empty
					getCellsFrom( record ).forEach( function( cell ){
						// for each data cell
						rowArray.push( cell );
					});
					dataArray.push( rowArray );
				}
			});
			return dataArray;
			function getRecordsFrom( theRequest ){
				// get the Record (row) from the provided data
				var textualData = theRequest.responseText; // textual data received
				var records = textualData.split( '\n' ); // convert data into Record
				return records;
			}
			function getCellsFrom( record ){
				// get the cell values for a Record (row)
				var cells = record.split( ',' );
				return cells;
			}
			function recordIsEmpty( record ){
				// check if the record (row) is empty
				var isEmpty = new RegExp(/^[,\0\s]*$/).test( record ); // definition of an empty record (row) compared with the provided record data
				return isEmpty;
			}
		},
		arrayToTable: function( array, options ){
			// convert the provided array into a table
			var table = document.createElement( 'table' );
			
			array.forEach( function( record, recordIndex ){
				// for each record (table row)
				var tableRow = document.createElement( 'tr' );

				record.forEach( function( cell, cellIndex ){
					// for each record cell (row cell)
					if( valueIsBlank( options )){
						createAndAddToParent( cell, 'td', tableRow );
					}
					else{
						var headerValue = valueIsBlank( options.headerRow );
						if( recordIndex !== 0 ){
							createAndAddToParent( cell, 'td', tableRow );
						}
						else if( recordIndex === 0 && headerValue ){
							createAndAddToParent( cell, 'td', tableRow );
						}
						else if( recordIndex === 0 && !headerValue ){
							createAndAddToParent( cell, 'th', tableRow );
						}
					}
				});
				table.append( tableRow );
			});
			return table;
			function createAndAddToParent( node, tagname, parentElement ){
				var element = document.createElement( tagname );
				element.innerHTML = node;
				parentElement.append( element );
			}
			function valueIsBlank( value ){
				// check if the provided value is blank
				return ( typeof value === 'undefined' || value === null || value === '' ) ? true : false;
			}
		},
		htmlToElements: function( theRequest ){
			// extract the provided file body contents
			var htmlString = theRequest.responseText;
			var parser = new DOMParser();
			var htmlElements = parser.parseFromString( htmlString, "text/html" ).getElementsByTagName( 'body' )[ 0 ].children;
			return htmlElements;
		}
	},
	read: function( pathname, htmlElement, headerArray ){
		// pathname = the pathname of the target file
		// htmlElement = the element to append the file data to
		// headerArray = optional array for rewriting headers from tabular data
		if( fileReader.file( pathname ).isSupported ){
			// If the provided file is of a supported file type
			var theRequest = ( window.XMLHttpRequest ) ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' ); // modern browser option with legacy browser backup

			theRequest.onreadystatechange = function(){
				// handle the necessary statuses and ready states of the request
				if( theRequest.status === 200 ){
					// check that the request is ready
					if( theRequest.readyState === 4 ){
						// DONE, the opperation is complete
						if( fileReader.file( pathname ).extension === 'csv' ){
							fileReader.write.csvToDom( theRequest, htmlElement, headerArray );
						}
						else if( fileReader.file( pathname ).extension === 'html' ){
							fileReader.write.htmlToDom( theRequest, htmlElement );
						}
					}
				}
			}
			theRequest.open( 'GET', pathname, true ); 
			theRequest.send();
		}
	},
	write: {
		// object that takes XML HTTP requests and writes them to the DOM
		csvToDom: function( theRequest, htmlElement, options ){
			var theArray = fileReader.convert.csvToArray( theRequest );
			var htmlTable = fileReader.convert.arrayToTable( theArray, options );
			htmlElement.append( htmlTable );
		},
		htmlToDom: function( theRequest, htmlElement ){
			var htmlCollection = fileReader.convert.htmlToElements( theRequest );
			for( var index = 0; index < htmlCollection.length; index++ ){
				htmlElement.append( htmlCollection.item( index ));
			}
		}
	}
};
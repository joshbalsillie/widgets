/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-12
*/

var fileReader = {
	// global placeholder object for defining variables and methods for this file
	supportedFileTypes: [ 'csv' ], // the file types supported by this javascript file;
	read: function( pathname, htmlElement, headerArray ){
		var isTheFile = {
			supported: function( pathname, supportedFileTypesArray ){
				// Check if the file is supported
				var pathArray = pathname.split( "/" ); // path split into array
				var filename = pathArray[ pathArray.length - 1 ]; // last array item, which is the filename
				var nameAndExtension = filename.split( "." ); // array with only two values, the name of the file and the extension 
				var theExtension = nameAndExtension[ nameAndExtension.length - 1 ].toLowerCase(); // the file extension
				
				supportedFileTypesArray.forEach( function( arrayValue, index, array ){
					// convert all provided array values to lowercase
					array[ index ] = arrayValue.toLowerCase();
				});
				return supportedFileTypesArray.some( function( arrayValue ){
					// for each array value compare it to the file type
					return theExtension === arrayValue;
				});
			}
		};
		var convert = {
			 // placeholder object for adding data conversion methods
			csvToArray: function( data ){
				// convert data from a CSV file to an array
				var dataArray = []; // placeholder for data returned by this function
				
				getRecordsFrom( data ).forEach( function( record ){
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
				function getRecordsFrom( data ){
					// get the Record (row) from the provided data
					var textualData = data.responseText; // textual data received
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
			arrayToTable: function( array, headers ){
				// convert the provided array into a table
				var table = document.createElement( 'table' );
				
				array.forEach( function( record, index ){
					var tableRow = document.createElement( 'tr' );

					if( index === 0 && !valueIsBlank( headers )){
						headers.forEach( function( header ){
							var cellElement = document.createElement( 'th' );
							cellElement.innerHTML = header;
							tableRow.append( cellElement );
						});
					}
					else if( index > 0 ){
						record.forEach( function( cell ){
							var cellElement = document.createElement( 'td' );
							cellElement.innerHTML = cell;
							tableRow.append( cellElement );
						});
					}
					table.append( tableRow );
				});
				return table;
				function valueIsBlank( value ){
					// check if the provided value is blank
					return ( typeof value === 'undefined' || value === null || value === '' ) ? true : false;
				}
			}
		};
		if( isTheFile.supported( pathname, fileReader.supportedFileTypes )){
			// If the provided file is of a CSV file type
			var theRequest = ( window.XMLHttpRequest ) ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' ); // modern browser option with legacy browser backup

			theRequest.onreadystatechange = function(){
				// handle the necessary statuses and ready states of the request
				if( theRequest.status === 200 ){
					// check that the request is ready
					if( theRequest.readyState === 4 ){
						// DONE, the opperation is complete
						var theResult = convert.csvToArray( theRequest );
						htmlElement.append( convert.arrayToTable( theResult, headerArray ));
					}
				}
			}
			theRequest.open( 'GET', pathname, true );
			theRequest.send();
		}
	}
};
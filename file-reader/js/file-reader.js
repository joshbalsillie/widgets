/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-12
 */
 
'use strict'; // ECMAScript version 5 strict mode

var fileReader = {
	// global placeholder object for defining variables and methods for this file
	file: function( pathname ){
		var pathArray = pathname.split( "/" ); // path split into array
		var identifier = pathArray[ pathArray.length - 1 ]; // last array item, which is the filename and filename extension
		var nameAndExtension = identifier.split( "." ); // array with only two values, the name of the file and the extension

		fileReader.directory = pathname.substring(0, pathname.lastIndexOf('/')); // the directory of the file
		fileReader.name = nameAndExtension[ 0 ]; // the filename
		fileReader.extension = nameAndExtension[ nameAndExtension.length - 1 ]; // the file extension
		fileReader.isSupported = checkSupportFor( fileReader );
		return fileReader;

		function checkSupportFor( file ){
			// check if the provided file is supported
			var supportedFileTypes = [ 'csv', 'html' ]; // the file types supported by this javascript file;
			var theExtension = file.extension.toLowerCase(); // the file extension

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
	addChildren: function( tags, parentTag ){
		// Add one or multiple HTML tags to a html Element
		if( parentTag.nodeType === Node.ELEMENT_NODE ){
			// if tag is currently set as a element node
			for( var countTags = 0; countTags < tags.length; ++countTags ){
				if( fileReader.verifyDataTypeOf( tags[ countTags ], 'object' )){
					// check if array value is an object
					parentTag.appendChild( tags[ countTags ] );
				}
				else{
					console.error( tags[ countTags ] + ' is not of type: object.' );
				}
			}
		}
		else{
			console.error( 'parentTag (' + parentTag + ', ' + parentTag.nodeType + ') is not defined, or of the correct type.' );
		}
	},
	convert: {
		// object for storing data conversion methods
		array: {
			toTable: function( array, options ){
				// convert the provided array into a table
				try{
					if( Array.isArray( array )){
						// if the provided variable is an array
						var table = document.createElement( 'table' );
						
						array.forEach( function( record, recordIndex ){
							// for each record (table row)
							var tableRow = document.createElement( 'tr' );

							record.forEach( function( cell, cellIndex ){
								// for each record cell (row cell)
								if( recordIndex !== 0 ){
									fileReader.createAndAddToParent( cell, 'td', tableRow );
								}
								else{
									if( fileReader.valueIsBlank( options ) || fileReader.valueIsBlank( options.headerRow )){
										fileReader.createAndAddToParent( cell, 'td', tableRow );
									}
									else if( !options.headerRow ){
										fileReader.createAndAddToParent( cell, 'td', tableRow );
									}
									else if( options.headerRow ){
										fileReader.createAndAddToParent( cell, 'th', tableRow );
									}

								}
							});
							table.append( tableRow );
						});
						return table;
					}
				}
				catch( error ){
					console.error( error );
				}
			}
		},
		csv: {
			toArray: function( theRequest ){
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
			}
		},
		html: {
			toElements: function( theRequest, options ){
				// extract the provided file body contents
				var htmlString = theRequest.responseText;
				var domParser = new DOMParser();

				if( fileReader.verifyDataTypeOf( htmlString, 'string' )){
					// if the provided variable is a string
					var dom = domParser.parseFromString( htmlString, 'text/html' );
					
					var head = dom.head || dom.getElementsByTagName( 'head' )[ 0 ] || dom.childNodes[ 0 ].childNodes[ 0 ];
					var body = dom.body || dom.getElementsByTagName( 'body' )[ 0 ] || dom.childNodes[ 0 ].childNodes[ 1 ];			

					if( fileReader.valueIsBlank( options ) ){
						// if not options are passed
						if( body.firstChild ){
							// look for elements in the DOMParser <body> tag
							return body;
						}
						else if( head.firstChild ){
							// look for elements in the DOMParser <head> tag
							return head;
						}
					}
					else if( options.head && options.body ){
						return [ head, body ];
					}
					else if( options.head ){
						return head;
					}
					else if( options.body ){
						return body;
					}
					else{
						console.error( 'could not find element(s) created by DOMParser' );
					}
				}
			}
		},
		tag: {
			toExecutable: function( tagElement ){
				// Duplicate the provided tag as a new element in order for all tags to run the 'src' attribute after adding it to the DOM
				// Required to run: <script src=""></script>
				var newTag = document.createElement( tagElement.tagName );

				if( tagElement.hasAttributes() ){
					// Check if the tag has attributes
					for( var countAttributes = 0; countAttributes < tagElement.attributes.length; ++countAttributes ){
						var name = tagElement.attributes[ countAttributes ].name;
						var value = tagElement.attributes[ countAttributes ].value;
						newTag.setAttribute( name, value );
					}
				}
				if( tagElement.textContent ){
					// Check if the tag has content within it
					newTag.textContent = tagElement.textContent;
				}
				return newTag;
			}
		}
	},
	read: function( pathname, destinationElement, options ){
		// read the conents of the file defined in the pathname
		// pathname = required pathname of the target file
		// destinationElement = required element to append the file data to
		// options = optional object for settings used by this document

		if( fileReader.file( pathname ).isSupported ){
			// If the provided file is of a supported file type
			fileReader.makeRequest( pathname, destinationElement, options );
		}
	},
	makeRequest: function( pathname, destinationElement, options ){
		// creates an XML Http request to handle the provided file
		// pathname = required pathname of the target file
		// destinationElement = required element to append the file data to
		// options = optional object for settings used by this document
		var theRequest = ( window.XMLHttpRequest ) ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' ); // modern browser option with legacy browser backup

		theRequest.onreadystatechange = function(){
			// handle the necessary statuses and ready states of the request
			var theFile = fileReader.file( pathname );
			var theExtension = theFile.extension.toLowerCase();

			if( theRequest.status === 200 ){
				// check that the request is ready
				if( theRequest.readyState === 4 ){
					// DONE, the opperation is complete
					try{
						if( !fileReader.valueIsBlank( destinationElement ) ){
							if( theExtension === 'csv' ){
								fileReader.copy.csvToDom( theRequest, destinationElement, options );
							}
							else if( theExtension === 'html' ){
								fileReader.copy.htmlToDom( theRequest, destinationElement, options );
							}
						}
						else if( fileReader.valueIsBlank( destinationElement ) ){
							throw "Required variable 'destinationElement' value is blank.";
						}
					}
					catch( error ){
						console.error( error );
					}
				}
			}
		}
		theRequest.open( 'GET', pathname, true );
		theRequest.send();
	},
	copy: {
		// object with methods that takes XML HTTP requests and copies them to the DOM
		csvToDom: function( theRequest, destinationElement, options ){
			var theArray = fileReader.convert.csv.toArray( theRequest );
			var htmlTable = fileReader.convert.array.toTable( theArray, options );
			destinationElement.append( htmlTable );
		},
		htmlToDom: function( theRequest, destinationElement, options ){
			try{
				var htmlCollection = fileReader.convert.html.toElements( theRequest, options );
				var domHead = document.head || document.getElementsByTagName( 'head' )[ 0 ] || document.childNodes[ 0 ].childNodes[ 0 ];
				var domBody = document.body || document.getElementsByTagName( 'body' )[ 0 ] || document.childNodes[ 0 ].childNodes[ 1 ];
				var tag = null; // placeholder for converting tag to executable

				if( htmlCollection.length === undefined && htmlCollection.children.length !== 0 ){
					// if 1 htmlCollection
					for( var countElements = 0; countElements < htmlCollection.children.length; countElements++ ){
						tag = fileReader.convert.tag.toExecutable( htmlCollection.children[ countElements ] );
						destinationElement.append( tag );
					}
				}
				else if( htmlCollection.length !== undefined ){
					// if more than 2 htmlCollections
					for( var countCollections = 0; countCollections < htmlCollection.length; countCollections++ ){
						while( htmlCollection[ countCollections ].children.length !== 0 ){
							for( var countElements = 0; countElements < htmlCollection[ countCollections ].children.length; countElements++ ){
								tag = fileReader.convert.tag.toExecutable( htmlCollection.children[ countElements ] );
								destinationElement.append( tag );
							}
						}
					}
				}
			}
			catch( error ){
				console.error( error );
			}
		}
	},
	createAndAddToParent: function( node, tagname, parentElement ){
		var element = document.createElement( tagname );
		element.innerHTML = node;
		parentElement.append( element );
	},
	valueIsBlank( value ){
		// check if the provided value is blank
		return ( typeof value === 'undefined' || value === null || value === '' ) ? true : false;
	},
	verifyDataTypeOf: function( value, dataType ){
		// compare the provided data type to the data type of the value
		if( fileReader.isValid( dataType ) && fileReader.isValid( typeof value )){
			// if data types are both valid
			if( dataType === typeof value ){
				// if data types are both equal
				return true;
			}
			else{
				return false;
			}
		}
	},
	isValid: function( dataType ){
		// check if the provided value is a valid data type
		switch( dataType ){
			// check if the provided data type is valid
			case 'undefined': return true;
			case 'boolean': return true;
			case 'number': return true;
			case 'string': return true;
			case 'symbol': return true;
			case 'function': return true;
			case 'object': return true;
			default: 
				console.error( '"' + dataType + '" is not a valid data type' );
				return false;
		}
	}
};
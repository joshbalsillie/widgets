/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2023-10-27
 */

'use strict'; // ECMAScript version 5 strict mode

var colourLibraryAnalyser = {
	// global placeholder object for defining variables and methods for this file
	get: {
		// Top level object for getting things from the DOM and executing commands on that information
		analysis: function(){
			// Analyse the library colours against each other and modify the DOM
			let colourElements = document.querySelectorAll( '#colourLibrary input[type="color"]' );
			let colourContainers = document.querySelectorAll( '#libraryBody > div');
			
			colourContainers.forEach( function( element ){
				// remove all previous elements resulting from analysis
				
				while( element.childElementCount > 1 ){
					element.childNodes[ 1 ].remove();
				}
			});

			colourElements.forEach( function( element ){
				// loop through each colour element
				let currentElement = element;
				let currentHex = element.value;
				let colourContainer = document.createElement( 'div' );
				let containerA = document.createElement( 'div' );
				let containerAA = document.createElement( 'div' );
				let containerAAA = document.createElement( 'div' );
				
				containerA.innerHTML = '<p>3:1</p>';
				containerAA.innerHTML = '<p>4.5:1</p>';
				containerAAA.innerHTML = '<p>7:1</p>';
				
				colourElements.forEach( function( element ){
					// loop through all colour elements and compare them to the current element in the parent function
					let textInput = undefined;
					let compareHex = undefined;
					
					element.parentElement.childNodes.forEach( function( element ){
						if( element.name == "hex" ){
							compareHex = element.value;
						}
						else if( element.name == "name" ){
							textInput = element.value;
						}
					});
					let contrastRatio = colourLibraryAnalyser.get.contrastRatio( currentHex, compareHex );
					let compareElement = document.createElement( 'p' );
					compareElement.style.color = compareHex;

					if( contrastRatio > 3 ){
						compareElement.innerText = compareHex + " " + textInput;

						if( contrastRatio >= 7 ){
							containerAAA.appendChild( compareElement );
						}
						else if( contrastRatio < 7 && contrastRatio > 4.5 ){
							containerAA.appendChild( compareElement );
						}
						else if( contrastRatio < 4.5 && contrastRatio > 3 ){
							containerA.appendChild( compareElement );
						}
					}
					if( containerA.childElementCount > 0 ){
						colourContainer.appendChild( containerA );
					}
					if( containerAA.childElementCount > 0 ){
						colourContainer.appendChild( containerAA );
					}
					if( containerAAA.childElementCount > 0 ){
						colourContainer.appendChild( containerAAA );
					}
					currentElement.parentElement.parentElement.appendChild( colourContainer );
				});
				colourLibraryAnalyser.update.downloadFiles();
			});
		},
		relativeLuminance: {
			// Calculate: the relative brightness of any point in a colorspace, normalized to 0 for darkest black and 1 for lightest white
			// https://www.w3.org/TR/WCAG20/#relativeluminancedef
			sRGB: function( red, green, blue ){
				// Calculate the relative luminance of an sRGB colour
				function convert( sRGBValue ){
					let decimalValue = sRGBValue / 255;
					return ( decimalValue <= 0.03928 ) ? decimalValue / 12.92 : Math.pow(( decimalValue + 0.055 ) / 1.055, 2.4 );
				}
				let R = convert( red );
				let G = convert( green );
				let B = convert( blue );

				// The relative brightness of any point in a colorspace, normalized to 0 for darkest black and 1 for lightest white
				// For the sRGB colorspace, the relative luminance of a color is defined as: 
				let relativeLuminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

				return relativeLuminance;
			},
			hex: function( hex ){
				// Convert hex to sRGB then return sRGB relative luminance
				let rgbObject = colourLibraryAnalyser.convert.hexTo.sRGB( hex );
				let relativeLuminance = colourLibraryAnalyser.get.relativeLuminance.sRGB( rgbObject.red, rgbObject.green, rgbObject.blue );

				return relativeLuminance;
			}
		},
		contrastRatio: function( colour1, colour2 ){
			// Calculate: the contrast ratio between the relative luminance of two colours
			// https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
			let rL1 = ( colourLibraryAnalyser.get.relativeLuminance.hex( colour1 ));
			let rL2 = ( colourLibraryAnalyser.get.relativeLuminance.hex( colour2 ));
			let L1 = ( rL1 >= rL2 ) ? rL1 : rL2; // L1 is the relative luminance of the lighter of the colors
			let L2 = ( rL1 >= rL2 ) ? rL2 : rL1; // L2 is the relative luminance of the darker of the colors
			let contrastRatio = ( L1 + 0.05 ) / ( L2 + 0.05 ); // 1 to 21

			return contrastRatio;
		},
		colourName: function( colourElement, name ){
			// retrieve the user entered name for the provided colour element
			let elements = colourElement.parentElement.childNodes;
			let value = '';

			elements.forEach( function( element ){
				if( element.name == name ){
					value = element.value;
				}
			});
			return value;
		}
	},
	convert: {
		// top level object to convert information retrieved from the DOM into new information
		hexTo: {
			sRGB: function( hex ){
				// Convert hex value to sRGB i.e. #000000 to R:0, G:0, B:0
				let cleanHex = hex.replaceAll( '#' , '' );
				cleanHex = cleanHex.replaceAll( ' ' , '' );
				cleanHex = cleanHex.toUpperCase();
				let hexArray = cleanHex.split( "" );
				let rgb = {};

				if( hexArray.length === 6 ){
					let hex1 = null;
					let hex2 = null;

					hexArray.forEach( function( hexValue, index ){
						let numberOrNaN = Number( hexValue );
						
						if( index % 2 == 0 ){
							// if index is even array position is odd i.e. #1_3_5_
							if( !isNaN( numberOrNaN )){
								// if value is a number i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
								hex1 = hexValue * 16;
							}
							else if( isNaN( numberOrNaN )){
								// if value is not a number i.e. A, B, C, D, E, F
								switch( hexValue ){
									case "A" : hex1 = 160; break;
									case "B" : hex1 = 176; break;
									case "C" : hex1 = 192; break;
									case "D" : hex1 = 208; break;
									case "E" : hex1 = 224; break;
									case "F" : hex1 = 240; break;
								}
							}
						}
						else{
							// if index is odd array position is even i.e. #_2_4_6
							if( !isNaN( numberOrNaN )){
								// if value is a number i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
								hex2 = numberOrNaN;
							}
							else if( isNaN( numberOrNaN )){
								// if value is not a number i.e. A, B, C, D, E, F
								switch( hexValue ){
									case "A" : hex2 = 10; break;
									case "B" : hex2 = 11; break;
									case "C" : hex2 = 12; break;
									case "D" : hex2 = 13; break;
									case "E" : hex2 = 14; break;
									case "F" : hex2 = 15; break;
								}
							}
						}
						switch( index ){
							case 1 : rgb.red = hex1 + hex2;
							case 3 : rgb.green = hex1 + hex2;
							case 5 : rgb.blue = hex1 + hex2;
						}
					});
				}
				return rgb;
			},
			hsl: function( hex ){
				// convert hex value to hsl
				let rgb = colourLibraryAnalyser.convert.hexTo.sRGB( hex );
				let hsl = colourLibraryAnalyser.convert.rgbTo.hsl( rgb );

				return hsl;
			}
		},
		rgbTo: {
			hsl: function( sRGB ){
				// convert an RGB object to an hsl object i.e. R:0, G:0, B:0 to H:0, S:0%, L:0%
				function convert( sRGBValue ){
					let decimalValue = sRGBValue / 255;
					return decimalValue;
				}
				let decimals = { red:convert( sRGB.red ), green:convert( sRGB.green ), blue:convert( sRGB.blue ) }
				let decimalArray = Object.values( decimals );
				let min = Math.min( ...decimalArray );
				let max = Math.max( ...decimalArray );
				let hsl = {};
				let hueValue = undefined;

				hsl.lightness = ( min + max ) / 2 * 100; // epressed as real number i.e. 33.33333...

				if( min == max ){
					hsl.saturation = 0;
				}
				else{
					if( hsl.lightness <= 50 ){
						hsl.saturation = ( max - min ) / ( max + min ) * 100; // epressed as real number i.e. 33.33333...
					}
					else if( hsl.lightness > 50 ){
						hsl.saturation = ( max - min ) / ( 2 - max - min ) * 100; // epressed as real number i.e. 33.33333...
					}
				}
				if( sRGB.red == sRGB.green && sRGB.red == sRGB.blue ){
					hsl.hue = 0;
				}
				else{
					switch( max ){
						case decimals.red: hueValue = (( decimals.green - decimals.blue ) / ( max - min )) * 60; break;
						case decimals.green: hueValue = ( 2 + (( decimals.blue - decimals.red ) / ( max - min ))) * 60; break;
						case decimals.blue: hueValue = ( 4 + (( decimals.red - decimals.green ) / ( max - min ))) * 60; break;
					}
					hsl.hue = hueValue >= 0 ? hueValue : hueValue + 360;
				}
				return hsl;
			}
		},
		arrayTo: {
			csvUrl: function( array ){
				let csvContent = '';

				array.forEach( function( record ){
					// compile data to add to CSV file
					csvContent += record.join( ',' ) + '\n';
				});
				const blob = new Blob([ csvContent ], {type: 'text/csv;charset=utf-8' });
				const objectUrl = URL.createObjectURL( blob );
				return objectUrl;
			}
		}
	},
	update: {
		// top level object for updating elements or access to information in the DOM
		colour: function( element, decimalPlaces ){
			let realDecimal = Number( decimalPlaces );
			let hex = element.value;
			let rgb = colourLibraryAnalyser.convert.hexTo.sRGB( hex );
			let hsl = colourLibraryAnalyser.convert.rgbTo.hsl( rgb );
			let hslNew = { hue:convertHSL( hsl.hue, realDecimal ), saturation:convertHSL( hsl.saturation, realDecimal ), lightness:convertHSL( hsl.lightness, realDecimal )};
			let colourContainer = element.parentElement.parentElement;

			let hexOutput = undefined;
			let rgbOutput = undefined;
			let hslOutput = undefined;
			
			element.parentElement.childNodes.forEach( function( element ){
				if( element.name == "hex" ){
					hexOutput = element;
				}
				else if( element.name == 'rgb' ){
					rgbOutput = element;
				}
				else if( element.name == 'hsl' ){
					hslOutput = element;
				}
			});
			function convertHSL( value, realDecimal ){
				let decimalLimit = 4;
				let decimals = ( typeof realDecimal === 'undefined' || isNaN( realDecimal ) || realDecimal > decimalLimit ) ? 0 : realDecimal;
				let multiplier = Math.pow( 10, decimals );
				let newValue = undefined;

				if( decimals === 0 ){
					newValue = Math.round( value );
				}
				else{
					newValue = ( value % decimals ).toString().length > decimals ? ( Math.round( value * multiplier ) / multiplier ) : value;
				}
				
				return newValue;
			}
			hexOutput.value = element.value;
			rgbOutput.value = 'R:' + rgb.red + ' G:' + rgb.green + ' B:' + rgb.blue;
			hslOutput.value = 'H:' + hslNew.hue + ' S:' + hslNew.saturation + '% L:' + hslNew.lightness + '%';
			colourContainer.style.backgroundColor = element.value;
			colourLibraryAnalyser.get.analysis();
		},
		hslDecimalPlaces: function( element, decimalPlaces ){
			let realDecimal = Number( decimalPlaces );
			let hslDecimalOutput = element.nextElementSibling;
			let colourElements = document.querySelectorAll( '#colourLibrary input[type="color"]' );

			hslDecimalOutput.value = element.value;

			colourElements.forEach( function( element ){
				element.setAttribute( 'oninput', 'colourLibraryAnalyser.update.colour( this, ' + realDecimal + ');' );
				colourLibraryAnalyser.update.colour( element, realDecimal );
			});
		},
		downloadFiles: function(){
			let parentContainer = document.querySelectorAll( '#libraryFooter' )[ 0 ];
			let removeElementArray = [];

			parentContainer.childNodes.forEach( function( child ){
				// find all previously added CTAs to download
				if( child.tagName == 'A' && child.name.includes( 'download' )){
					removeElementArray.push( child );
				}
			});
			removeElementArray.forEach( function( child ){
				// remove all previously added CTAs to download
				child.remove();
			});

			colourLibraryAnalyser.export.pageTo.pdf();
			colourLibraryAnalyser.export.coloursTo.csv();
			colourLibraryAnalyser.export.colourMatrixTo.csv();
		}
	},
	colours: {
		// top level object 
		add: function( quantity ){
			// add colours to the end of the libary in the DOM
			let form = document.getElementById( 'colourLibrary' );

			if( quantity > 0 ){
				while( quantity > 0 ){
					let body = document.querySelectorAll( '#libraryBody' )[ 0 ];
					let grandParent = document.createElement( 'div' );
					let parent = document.createElement( 'div' );
					let colourInput = document.createElement( 'input' );
					let hexOutput = document.createElement( 'output' );
					let rgbOutput = document.createElement( 'output' );
					let hslOutput = document.createElement( 'output' );
					let colourName = document.createElement ( 'input' );
					let remove = document.createElement( 'input' );

					grandParent.style.backgroundColor = '#000000';
					colourInput.type = 'color';
					colourInput.setAttribute( 'value', '#000000' );
					colourInput.setAttribute( 'oninput', 'colourLibraryAnalyser.update.colour( this );' );
					hexOutput.innerText = '#000000';
					hexOutput.name = 'hex';
					rgbOutput.innerText = 'R:0, G:0, B:0';
					rgbOutput.name = 'rgb';
					hslOutput.innerText = 'H:0, S:0%, L:0%';
					hslOutput.name = 'hsl';
					colourName.type = 'text';
					colourName.value = 'Colour ' + ( body.childElementCount + 1 );
					colourName.name = 'name';
					colourName.setAttribute( 'autocompete', 'off' );
					colourName.setAttribute( 'oninput', 'colourLibraryAnalyser.get.analysis();' );
					remove.type = 'button';
					remove.setAttribute( 'value', '✕' );
					remove.setAttribute( 'onClick', 'this.parentElement.parentElement.remove();' );

					parent.appendChild( colourInput );
					parent.appendChild( hexOutput );
					parent.appendChild( colourName );
					parent.appendChild( rgbOutput );
					parent.appendChild( hslOutput );
					parent.appendChild( remove );
					grandParent.appendChild( parent );
					body.insertBefore( grandParent, body.childNodes[ body.childElementCount ]);
					quantity--;
				}
			}
			colourLibraryAnalyser.get.analysis();
		},
		remove: function( quantity ){
			// remove colours from the end of the library in the DOM
			let body = document.querySelectorAll( '#libraryBody' )[ 0 ];

			if( quantity > 0 ){
				while( quantity > 0 && body.childElementCount > 0 ){
					let parent = body.childNodes[ body.childElementCount - 1 ];

					body.removeChild( parent );
					quantity--;
				}
			}
			colourLibraryAnalyser.get.analysis();
		}
	},
	export: {
		// top level object for saving analyser information to other mediums
		csvDownloadButton: function( csvArray, filename, buttonText, name ){
			const csvUrl = colourLibraryAnalyser.convert.arrayTo.csvUrl( csvArray );
			let parentContainer = document.querySelectorAll( '#libraryFooter' )[ 0 ];
			let cta = document.createElement( 'a' );
			cta.setAttribute( 'href', csvUrl );
			cta.setAttribute( 'download', filename );
			cta.setAttribute( 'name' , name );
			cta.setAttribute( 'class', 'button' );
			cta.textContent = buttonText;
			parentContainer.appendChild( cta );
		},
		coloursTo: {
			csv: function(){
				let colourElements = document.querySelectorAll( '#colourLibrary input[type="color"]' );
				let csvArray = [[ 'name', 'hex', 'red', 'green', 'blue', 'hue', 'saturation', 'lightness' ]];

				colourElements.forEach( function( colourElement ){
					// fill array with colour library data
					let hex = colourElement.value;
					let rgb = colourLibraryAnalyser.convert.hexTo.sRGB( hex );
					let hsl = colourLibraryAnalyser.convert.rgbTo.hsl( rgb );
					let name = colourLibraryAnalyser.get.colourName( colourElement, 'name' );

					csvArray.push([ name, hex, rgb.red, rgb.green, rgb.blue, hsl.hue, hsl.saturation, hsl.lightness ]);
				});

				colourLibraryAnalyser.export.csvDownloadButton( csvArray, 'colour_library_analyser_colours.csv', 'Colours', 'downloadColours' );
			}
		},
		colourMatrixTo: {
			csv: function(){
				let colourElements = document.querySelectorAll( '#colourLibrary input[type="color"]' );
				const numberOfColours = colourElements[ 0 ].parentElement.parentElement.parentElement.childElementCount;
				let csvArray = [];
				let record = [];
				let hex = undefined;
				let name = undefined;

				colourElements.forEach( function( colourElement, index ){
					// get titles and write to record
					hex = colourElement.value;
					name = colourLibraryAnalyser.get.colourName( colourElement, 'name' );

					if( index == 0 ){
						record.push( '', hex + '_' + name );
					}
					else if( index > 0 && index < numberOfColours ){
						record.push( hex + '_' + name );
					}
				});
				csvArray.push( record );
				record = [];
				colourElements.forEach( function( colourElement, index ){
					// fill array with colour library data
					hex = colourElement.value;
					name = colourLibraryAnalyser.get.colourName( colourElement, 'name' );
					let rgb = colourLibraryAnalyser.convert.hexTo.sRGB( hex );
					let recordArray = [];

					record.push( hex + '_' + name );

					colourElements.forEach( function( colourElement, index ){
						let compareHex = colourElement.value;
						let compareName = colourLibraryAnalyser.get.colourName( colourElement, 'name' );
						let contrastRatio = colourLibraryAnalyser.get.contrastRatio( hex, compareHex );

						record.push( contrastRatio );
					});
					csvArray.push( record );
					record = [];
				});

				colourLibraryAnalyser.export.csvDownloadButton( csvArray, 'colour_library_analyser_contrast_matrix.csv', 'Colour Contrast Matrix', 'downloadColourContrastMatrix' );
			}
		},
		pageTo: {
			pdf: function(){
				let parentContainer = document.querySelectorAll( '#libraryFooter' )[ 0 ];
				let cta = document.createElement( 'a' );
				cta.setAttribute( 'onclick', "document.title = 'colour_library_analyser.pdf'; window.print();" );
				cta.setAttribute( 'name' , 'downloadPDF' );
				cta.setAttribute( 'class', 'button' );
				cta.href = '#';
				cta.textContent = 'PDF';
				parentContainer.appendChild( cta );
			}
		}
	}
};
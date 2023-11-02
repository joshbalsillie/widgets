/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2023-10-27
 */

'use strict'; // ECMAScript version 5 strict mode

var colourLibraryAnalyser = {
	// global placeholder object for defining variables and methods for this file
	get: {
		colours: function(){
			let colourElements = document.querySelectorAll('color');
			//let library = allTags.
		},
		relativeLuminance: {
			// Calculate: the relative brightness of any point in a colorspace, normalized to 0 for darkest black and 1 for lightest white
			// https://www.w3.org/TR/WCAG20/#relativeluminancedef
			sRGB: function( red, green, blue ){
				// Calculate the relative luminance of an sRGB colour
				if( colourLibraryAnalyser.dataTypeIs.number( red ) && colourLibraryAnalyser.dataTypeIs.number( green ) && colourLibraryAnalyser.dataTypeIs.number( blue )){
					var RsRGB = red / 255;
					var GsRGB = green / 255;
					var BsRGB = blue / 255;
				}

				let R = ( RsRGB <= 0.03928 ) ? RsRGB / 12.92 : Math.pow(( RsRGB + 0.055 ) / 1.055, 2.4 );
				let G = ( GsRGB <= 0.03928 ) ? GsRGB / 12.92 : Math.pow(( GsRGB + 0.055 ) / 1.055, 2.4 );
				let B = ( BsRGB <= 0.03928 ) ? BsRGB / 12.92 : Math.pow(( BsRGB + 0.055 ) / 1.055, 2.4 );

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

			let rL1 = ( colourLibraryAnalyser.get.relativeLuminance.sRGB( 0, 0, 0 ));
			//let rL1 = ( colourLibraryAnalyser.get.relativeLuminance.hex( colour1 ));

			if( colourLibraryAnalyser.typeIs.object( typeof colour1 )){
				
			}
			else if( colourLibraryAnalyser.typeIs.string( typeof colour1 )){

			}
			let L1 = ( rL1 >= rL2 ) ? rL1 : rL2; // L1 is the relative luminance of the lighter of the colors
			let L2 = ( rL1 >= rL2 ) ? rL2 : rL1; // L2 is the relative luminance of the darker of the colors

			let contrastRatio = ( L1 + 0.05 ) / ( L2 + 0.05 );

			return contrastRatio;
		},
	},
	convert: {
		hexTo: {
			sRGB: function( hex ){
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
			}
		}
	},
	add: {
		colours: function( quantity ){
			let form = document.getElementById( 'colourLibrary' );

			if( quantity > 0 ){
				while( quantity > 0 ){
					let parent = document.createElement( 'div' );
					let colourInput = document.createElement( 'input' );
					let colourOutput = document.createElement( 'output' );
					let colourName = document.createElement ( 'input' );
					let remove = document.createElement( 'input' );

					parent.style.backgroundColor = '#000000';
					colourInput.type = 'color';
					colourInput.setAttribute( 'value', '#000000' );
					colourInput.setAttribute( 'oninput', 'this.nextElementSibling.value = this.value; this.parentElement.style.backgroundColor = this.value;' );
					colourOutput.setAttribute( 'onchange', 'this.nextElementSibling.value = this.name;' );
					colourOutput.innerText = '#000000';
					colourName.type = 'text';
					colourName.value = 'Colour ' + ( form.childElementCount );
					remove.type = 'button';
					remove.setAttribute( 'value', '✕' );
					remove.setAttribute( 'onClick', 'this.parentElement.remove();' );

					parent.appendChild( colourInput );
					parent.appendChild( colourOutput );
					parent.appendChild( colourName );
					parent.appendChild( remove );
					form.insertBefore( parent, form.childNodes[ form.childElementCount ]);
					quantity--;
				}
			}
			else if( quantity < 0 ){
				while( quantity < 0 ){
					let parent = form.childNodes[ form.childElementCount - 1 ];
					form.removeChild( parent );
					quantity++;
				}
			}
		}
	},
	dataTypeIs: {
		undefined: function( value ){
			typeof value == 'undefined' ? true : false;
		},
		boolean: function( value ){
			typeof value == 'boolean' ? true : false;
		},
		number: function( value ){
			typeof value == 'number' ? true : false;
		},
		string: function( value ){
			typeof value == 'string' ? true : false;
		},
		symbol: function( value ){
			typeof value == 'symbol' ? true : false;
		},
		function: function( value ){
			typeof value == 'function' ? true : false;
		},
		object: function( value ){
			typeof value == 'object' ? true : false;
		}
	},
};
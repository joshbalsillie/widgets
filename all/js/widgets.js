/*
 * @author: Joshua Balsillie
 * @version: 1.0
 * @since: 2019-01-20
 */

(function(){
	// Functions that should run as this file loads
	initiate();

	function initiate(){
		// Primary function that controls this file
		if( typeof window.tagBuilder === 'function' ){
			// if the tagBuilder function is in global scope
			var tagBuilder = window.tagBuilder();
			var parentTag = document.head || document.getElementsByTagName( "head" )[ 0 ];
			var childTags = tagBuilder.createTags( getVariables() );
			
			tagBuilder.tag = parentTag;
			tagBuilder.addChildren( childTags );
		}
		else{
			console.error( 'function tagBuilder is not defined. tabBuilder is a dependency.')
		}
	}
	function getVariables(){
	 	// get the variables required for this javascript file
	 	const theRoot = '../../../';
		var thePath = 'widgets/';
		const pathFromRoot = theRoot + thePath;
	 	var variables = [
	 		// copy and paste html elements as they would appear in the <head> tag, example: '<tagname attribute="value">'
	 		'<script src="' + pathFromRoot + 'google-analytics/js/google-analytics.js" async></script>',
	 		'<script src="' + pathFromRoot + 'favicon/js/favicon.js" async></script>',
	 		'<script src="' + pathFromRoot + 'tags/footer/js/footer.js" async></script>',
	 	];
	 	return variables;
	}
})();
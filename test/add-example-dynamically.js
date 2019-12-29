function toExecutable( tagElement ){
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
function execute( anyScriptElement ){
    var tag = toExecutable( anyScriptElement );
    document.getElementsByTagName( 'head' )[ 0 ].append( tag );
}
var theScript = document.createElement( 'script' );
theScript.src = 'example.js';
execute( theScript ); // not working
<?php

/*
 * @author: Joshua Balsillie
 * @version: 1.1
 * @since: 2016-04-02
 *
 * Description: validate user information and submit to recipent.
*/

// Message to display to user
$userMessages = array();

// Recipient of message
$recipient = 'Joshua Balsillie <joshbalsillie@gmail.com>';

// On submit execute form action
if ( $_POST[ 'submit' ] )
{
	submitForm( 'name', 'email', 'subject', 'message', 'file' );
}

// On submit check form for errors, if no errors send mail
function submitForm( $nameRef, $emailRef, $subjectRef, $messageRef, $fileRef )
{
	checkFormErrors( $nameRef, $emailRef, $subjectRef, $messageRef, $fileRef );
	global $userMessages, $recipient;
	
	if( empty( $userMessages ))
	{
		$message = makeMessage( $messageRef, $nameRef, $emailRef, $fileRef );
		$header = makeHeaders( $nameRef, $emailRef );
		
		sendEmail( $recipient, $subjectRef, $message, $header );
	}
	
	displayMessage( $userMessages );
}

// Check form for errors
function checkFormErrors( $nameRef, $emailRef, $subjectRef, $messageRef, $fileRef )
{
	// Check fields that should not be left blank
	checkBlank( $nameRef );
	checkBlank( $subjectRef );
	checkBlank( $messageRef );
	
	// Validate email
	if( checkBlank( $emailRef ) === false )
	{
		checkEmail( $emailRef );
	}
}

// Try to send email or throw error
function sendEmail( $recipient, $subject, $message, $header )
{
	try
	{
		if( !mail( $recipient, $subject, $message, $header )) throw "Your message could not be sent.";
		mail( $recipient, $subject, $message, $header );
		addMessage( "", "Your message has been sent." );
	}
	catch( Exception $error )
	{
		addMessage( "Error: ", $error );
	}
}

// Display message / errors to user
function displayMessage( $array )
{
	for( $counter = 0; $counter < count( $array ); ++$counter )
	{
		echo $array[ $counter ] . '<br>';
	}
}

// Display message / errors to user
function displayMessageNew( $array ) // !!!!!! not working
{
	$_SESSION[ $array ] = $array;
	
	if( isset( $_SESSION[ $array ] ) )
	{
		for( $counter = 0; $counter < count( $array ); ++$counter )
		{
			echo $_SESSION[ $array[ $counter ] ] . '<br>';
			unset( $_SESSION[ $array[ $counter ] ] ) . '<br>';
		}
	}
}

// Make the headers for the email
function makeHeaders( $nameRef, $emailRef )
{
	$sender = makeEmailId( $nameRef, $emailRef );
	
	$headerData = "MIME-Version: 1.0" . "\r\n";
	$headerData .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
	$headerData .= 'From: ' . $sender . "\r\n";
	$headerData .= 'Mailed-by: ' . $sender . "\r\n";
	
	return $headerData;
}

// Make email identifier of a person to be placed in email
function makeEmailId( $nameRef, $emailRef )
{
	$firstName = retrieveData( $nameRef );
	$lastName = retrieveData( $lastNameRef );
	$email = retrieveData( $emailRef );
	
	$person = $firstName . ' ' . $lastName . ' <' . $email . '>';
	return $person;
}

// Organize the data for the email message
function makeMessage( $messageRef, $nameRef, $emailRef, $fileRef )
{
	$message = retrieveData( $messageRef );
	$name = retrieveData( $nameRef );
	$email = retrieveData( $emailRef );
	$file = retrieveData( $fileRef );
	
	$messageDetails = nl2br( $message ) . '<br><br>';
	$messageDetails .= $name . " | " . $email;
	
	return $messageDetails;
}

// Check if field was blank
function checkBlank( $fieldName )
{
	$fieldData = retrieveData( $fieldName );
	
	switch( $fieldData )
	{
		case "":
			addMessage( $fieldName, " was blank." );
			return true;
			break;
		case NULL:
			addMessage( $fieldName, " was NULL." );
			return true;
			break;
		default:
			return false;
	}
}

// Validate email
function checkEmail( $fieldName )
{
	$fieldData = retrieveData( $fieldName );
	
	if ( !filter_var( $fieldData, FILTER_VALIDATE_EMAIL ) === true )
		{
			addMessage( $fieldName, " is invalid." );
		}
}

// Add to array of messages to user
function addMessage( $fieldName, $messageToUser )
{
	global $userMessages;
	$userMessages[ count( $userMessages ) ] = $fieldName . $messageToUser;
}

// Retrieve form data
function retrieveData( $tagNameRef )
{
	$data = ( $_POST[ $tagNameRef ] ? sanitizeString( $_POST[ $tagNameRef ]) : "" );
	return $data;
}

// Sanitize strings for security measure
function sanitizeString( $var )
{
	$var = stripcslashes( $var );
	$var = strip_tags( $var );
	$var = htmlentities( $var );
	return $var;
}
?>

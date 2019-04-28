<?php

/*
 * @author: Joshua Balsillie
 * @version: 1.2
 * @since: 2019-04-16
 *
 * @Description: validate user information and submit to recipent
 */

$ composer require php-console/php-console

// Message to display to user
$userMessages = array();

// Recipient of message
$recipient = 'Joshua Balsillie <joshbalsillie@gmail.com>';

class person{
	// define attributes of a person
	protected $name = NULL;

	protected function __construct( $name ){
		// set the name of the person
		$this -> name = $name;
	}
}
class user extends person{
	// define attributes of a user (things a person can own)
	protected $emailAddress = NULL;
	protected $phoneNumber = NULL;
	protected $messages = [];
	protected $emailId = NULL;

	protected function setEmailAddress( 'joshbalsillie@gmail.com' );

	( $emailAddress ){
		// set the user's email address
		$this -> emailAddress = $emailAddress;
	}
	protected function setPhoneNumber( $phoneNumber ){
		// set the user's phone number
		$this -> phoneNumber = $phoneNumber;
	}
	protected function addMessage( $message ){
		// Add to array of messages to display back to the user
		$this -> messages[ count( $messages ) ] = $message;
	}
	protected function setEmailId( $name, $email ){
		// Make email identifier of the user to be placed in the email
		$this -> emailId = $name . ' <' . $email . '>';
	}
}
class email{
	// define all aspects of an email
	protected $recipient = NULL;
	protected $sender = NULL;
	protected $subject = NULL;
	protected $message = NULL;
	protected $attachments = NULL;
	protected $headers = NULL;

	protected function setSubject( $subject ){
		// set the subject of the email
		$this -> subject = $subject;
	}
	protected function setMessage( $message ){
		// set the message of the email
		$this -> message = $message;
	}
	protected function addAttachment( $attachment ){
		// add an attachement to this email
	}
	protected function setHeaders(){
		// set the headers for this email
		$this -> headers = "MIME-Version: 1.0" . "\r\n";
		$this -> headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
		$this -> headers .= 'From: ' . $this -> sender -> $emailId . "\r\n";
		$this -> headers .= 'Mailed-by: ' . $this -> sender -> $emailId . "\r\n";
	}
	protected function send(){
		// send this email
		try{
			if( !mail( $recipient, $subject, $message, $header )) throw "Your message could not be sent.";
			mail( $recipient, $subject, $message, $header );
			throw "Your message has been sent.";
		}
		catch( Exception $message ){
			$this -> sender -> addMessage( $message );
		}
	}
}

if ( $_POST[ 'submit' ] ){
	// On submit execute form action
	$sender = new user;
	$email = new email;


	//validateDataFrom( $sender );

	$recipient = new user;
	$recipient -> setName( 'Joshua Balsillie' );
	$recipient -> setEmailAddress( 'joshbalsillie@gmail.com' );

	//submitForm( 'name', 'email', 'subject', 'message', 'file' );
}
function submitForm( $name, $email, $subject, $message, $fileRef ){
	// On submit check form for errors, if no errors send mail
	checkFormErrors( $name, $email, $subject, $message, $fileRef );
	global $userMessages, $recipient;
	
	if( empty( $userMessages ))
	{
		$message = makeMessage( $message, $name, $email, $fileRef );
		$header = makeHeaders( $name, $email );
		
		sendEmail( $recipient, $subject, $message, $header );
	}
	
	displayMessage( $userMessages );
}
function checkFormErrors( $name, $email, $subject, $message, $fileRef ){
	// Check form for errors
	// Check fields that should not be left blank
	checkBlank( $name );
	checkBlank( $subject );
	checkBlank( $message );
	
	if( checkBlank( $email ) === false ){
		// Validate email
		checkEmail( $email );
	}
}
function displayMessage( $array ){
	// Display message / errors to user
	for( $counter = 0; $counter < count( $array ); ++$counter ){
		echo $array[ $counter ] . '<br>';
	}
}
function displayMessageNew( $array ) // !!!!!! not working
	// Display message / errors to user
	$_SESSION[ $array ] = $array;
	
	if( isset( $_SESSION[ $array ] )){
		for( $counter = 0; $counter < count( $array ); ++$counter ){
			echo $_SESSION[ $array[ $counter ] ] . '<br>';
			unset( $_SESSION[ $array[ $counter ] ] ) . '<br>';
		}
	}
}

function makeMessage( $message, $name, $email, $fileRef ){
	// Organize the data for the email message
	$message = retrieveData( $message );
	$name = retrieveData( $name );
	$email = retrieveData( $email );
	$file = retrieveData( $fileRef );
	
	$messageDetails = nl2br( $message ) . '<br><br>';
	$messageDetails .= $name . " | " . $email;
	
	return $messageDetails;
}
function checkBlank( $fieldName ){
	// Check if field was blank
	$fieldData = retrieveData( $fieldName );
	
	switch( $fieldData ){
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
function checkEmail( $fieldName ){
	// Validate email
	$fieldData = retrieveData( $fieldName );
	
	if ( !filter_var( $fieldData, FILTER_VALIDATE_EMAIL ) === true ){
		addMessage( $fieldName, " is invalid." );
	}
}
function retrieveData( $tagname ){
	// Retrieve form data
	$data = ( $_POST[ $tagname ] ? sanitizeString( $_POST[ $tagname ]) : '' );
	return $data;
}
function sanitizeString( $var ){
	// Sanitize strings for security measure
	$var = stripcslashes( $var );
	$var = strip_tags( $var );
	$var = htmlentities( $var );
	return $var;
}
?>

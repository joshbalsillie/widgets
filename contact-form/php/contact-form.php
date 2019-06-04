<?php

/*
 * @author: Joshua Balsillie
 * @version: 1.2
 * @since: 2019-04-16
 *
 * @Description: validate user information and submit to recipent
 */

class person{
	// define attributes of a person
	protected $name = NULL;

	protected function setName( $value ){
		// set the name of the person
		$this -> name = $value;
	}
}
class user extends person{
	// define attributes of a user (things a person can own)
	protected $emailAddress = NULL;
	protected $phoneNumber = NULL;
	protected $notifications = [];
	protected $emailId = NULL;

	protected function setEmailAddress( $value ){
		// set the user's email address
		$this -> emailAddress = $value;
		if( !isBlank( $this -> name )){
			// check if the name is blank, and if not set the email ID
			setEmailId();
		}
	}
	protected function setPhoneNumber( $value ){
		// set the user's phone number
		$this -> phoneNumber = $value;
	}
	protected function addNotification( $value ){
		// Add to array of messages to display back to the user
		$this -> notifications[ count( $notifications ) ] = $value;
	}
	protected function setEmailId(){
		// Make email identifier of the user to be placed in the email
		$this -> emailId = $this -> $name . ' <' . $this -> $emailAddress . '>';
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

	protected function setRecipient( $value ){
		// set the recipient of the email
		$this -> recipient = $value;
	}
	protected function setSender( $value ){
		// set the sender of the email
		$this -> sender = $value;
		$this -> setHeaders();
	}
	protected function setSubject( $value ){
		// set the subject of the email
		$this -> subject = $value;
	}
	protected function setMessage( $value ){
		// set the message of the email
		$this -> message = $value;
	}
	protected function addAttachment( $attachment ){
		// add an attachement to this email
	}
	protected function setHeaders(){
		// set the headers for this email
		$this -> headers = "MIME-Version: 1.0" . "\r\n";
		$this -> headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
		$this -> headers .= 'From: ' . $this -> sender -> emailId . "\r\n";
		$this -> headers .= 'Reply-To: ' . $this -> sender -> emailId . "\r\n";
	}
	protected function send(){
		// send this email
		try{
			$emailId = $this -> recipient -> emailId;
			$subject = $this -> subject;
			$message = $this -> message;
			$headers = $this -> headers;

			if( !mail( $emailId, $subject, $message, $headers )){
				throw "Your message could not be sent.";
			}
			else{
				mail( $emailId, $subject, $message, $headers );
				throw "Your message has been sent.";
			}
		}
		catch( Exception $message ){
			$this -> sender -> addNotification( $message );
		}
		finally{
			displayNotifications( $this -> sender );
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
	$messageDetails .= $name . ' | ' . $email;
	
	return $messageDetails;
}
if ( $_POST[ 'submit' ] ){
	// On submit execute form action
	$sender = new user;
	$sender -> setName( retrieveData( 'name' ));
	$sender -> setEmailAddress( retrieveData( 'emailAddress' ));
	$sender -> setEmailId( $sender -> name, $sender -> emailAddress );

	$recipient = new user;
	$recipient -> setName( 'Joshua Balsillie' );
	$recipient -> setEmailAddress( 'joshbalsillie@gmail.com' );
	$recipient -> setEmailId( $recipient -> name, $recipient -> emailAddress );

	$email = new email;
	$email -> setRecipient( $recipient -> getEmailId() );
	$email -> setSender( $sender );
	$email -> setSubject( retrieveData( 'subject' ));
	$email -> setMessage( retrieveData( 'message' ));
	$email -> setHeaders();

	if( formHasErrors( $sender, $email )){
		displayNotifications( $sender );
	}
	else{
		$email -> send();
	}
}
function formHasErrors( $sender, $email ){
	// Check form for errors
	if( isBlank( $sender -> name )){
		$sender -> addNotification( 'Name is a required field.' );		
	}
	if( isBlank( $sender -> emailAddress )){
		$sender -> addNotification( 'Email address is a required field.' );
	}
	elseif( !isValidEmail( $sender -> emailAddress )){
		$sender -> addNotification( 'Email address is invalid.' );
	}
	if( isBlank( $sender -> subject )){
		$sender -> addNotification( 'Subject is a required field.' );
	}
	if( isBlank( $sender -> subject )){
		$sender -> addNotification( 'Message is a required field.' );
	}
	return empty( $sender -> notifications ) ? false : true; // if there are no error message, return false
}
function displayNotifications( $sender ){
	// Display message / errors to user
	for( $counter = 0; $counter < count( $array ); ++$counter ){
		echo $array[ $counter ] . '<br>';
	}
}
function isBlank( $value ){
	// Check if value is blank
	return is_null( $value ) || empty( $value ) ? true : false;
}
function isValidEmail( $value ){
	// Check if email is valid
	return filter_var( $value, FILTER_VALIDATE_EMAIL ) ? true : false;
}
function retrieveData( $attributeNameValue ){
	// Retrieve form data
	return ( $_POST[ $attributeNameValue ] ? sanitizeString( $_POST[ $attributeNameValue ]) : NULL );
}
function stringToInteger( $value ){
	// Convert a string into an integer ignoring decimals and other characters
	return preg_replace('/[^0-9]/', '', $value );
}
function sanitizeString( $value ){
	// Sanitize strings for security measure
	$value = stripcslashes( $value );
	$value = strip_tags( $value );
	$value = htmlentities( $value );
	return $value;
}
?>

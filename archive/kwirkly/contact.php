<?php

$EmailFrom = "newhype@hypenation.com";
$EmailTo = "opemipoaikomo@gmail.com";
$Subject = "Enquiry";
$Name = Trim(stripslashes($_POST['Name'])); 
$Tel = Trim(stripslashes($_POST['Tel'])); 
$Email = Trim(stripslashes($_POST['Email'])); 
$Message = Trim(stripslashes($_POST['Message'])); 
$Choice = $_GET['Option'];
$Choice = $_POST['Option'];

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Tel: ";
$Body .= $Tel;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "Choice: ";
$Body .= $Choice;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";

if(isset($_POST['submit'])) {

// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// redirect to success page 
if($sent)
{echo "<p>"."Your enquiry/complaint was lodged. We will contact you soon."."</p>"; }
else
{echo "<p>"."Your enquiry/complaint was not submitted. Please try again"."</p>"; }

}
?>
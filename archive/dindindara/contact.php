<?php

$EmailFrom = "newsong@dindindara.com";
$EmailTo = "opemipoaikomo@gmail.com";
$Subject = "New song";
$Name = Trim(stripslashes($_POST['Name'])); 
$SongTitle = Trim(stripslashes($_POST['SongTitle'])); 
$SongInfo = Trim(stripslashes($_POST['SongInfo'])); 

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Song Title: ";
$Body .= $SongTitle;
$Body .= "\n";
$Body .= "Song Info: ";
$Body .= $SongInfo;
$Body .= "\n";

// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=success.html\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
}
?>
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

// Instantiation and passing [ICODE]true[/ICODE] enables exceptions
    $mail = new PHPMailer(true);
    $name =  strval($_POST['name']);
    $usermail =  strval($_POST['email']);

try {
    
    //Server settings
    $mail->CharSet = "utf-8";
    $mail->SMTPDebug = 2;                                       // Enable verbose debug output
    $mail->isSMTP();                                            // Set mailer to use SMTP
    $mail->Host       = 'mail.adm.tools';  // Specify main and backup SMTP servers
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'mail@fitspas.com.ua';                     // SMTP username
    $mail->Password   = 'mP2&;CB2nf&3';                               // SMTP password
    $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, [ICODE]ssl[/ICODE] also accepted
    $mail->Port       = '2525';                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('mail@fitspas.com.ua', 'fitspas');
    $mail->addAddress($usermail, $name);
    //$mail->addAddress('kvadratvkube@gmail.com', 'Den Hofmann');     // Add a recipient
    $mail->addAddress('recipient2@example.com');               // Name is optional
    $mail->addReplyTo('info@example.com', 'Information');
    $mail->addCC('cc@example.com');
    $mail->addBCC('bcc@example.com');

    // Attachments
   //$mail->addAttachment('calendar.pdf');         // Add attachments
    //$mail->addAttachment('/home/cpanelusername/image.jpg', 'new.jpg');    // Optional name

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Доступ до відео';
    $mail->Body    = $name.', вітаємо з придбанням ';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    $data = json_encode([
        'success'=>'true',
        'mail'=> $usermail
    ]);
    $mail->send();
    echo $data;

} catch (Exception $e) {

    $Falsedata =  json_encode([
        "success" =>"false",
        "error" => $e
    ]);

    echo $Falsedata;
}
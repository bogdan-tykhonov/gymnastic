<?php
if(isset($_POST['id'])){
    $id = $_POST['id'];
    $amount = $_POST['amount'];
    $description = $_POST['description'];
    $json_string = array(
        'public_key' => 'sandbox_i45245880172',
        'version' => '3',
        'action' => 'pay',
        'amount'=> $amount,
        'currency'=> 'UAH',
        'description'=> $description,
        'order_id'=>  $id, 
        'language'=>  'ru', 
        'result_url'=>  'https://www.fitspas.com.ua/', 
        'server_url'=>  'https://www.fitspas.com.ua/'
    );
    $data = base64_encode(json_encode($json_string));
    $privat = 'sandbox_5SnWIm1JXRNTh3qsu0pz8fRxk0qPehjDEC7GRXhL';
    $sign_string = $privat.$data.$privat;
    $signature = base64_encode(sha1($sign_string, true));

   echo json_encode(array(
       'data' => $data,
       'signature' => $signature
   ));
}
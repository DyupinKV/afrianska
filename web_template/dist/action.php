<?php


if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["message"])) {

    $result = array(
        'name' => $_POST["name"],
        'email' => $_POST["email"],
        'message' => $_POST["message"]
    );


    $dataFile = file_get_contents('data.json');

    $formArr = json_decode($dataFile,TRUE);
    $formArr[] = array($result);

    file_put_contents('data.json',json_encode($formArr));
}


<?php
$file = $_FILES['file'];

$fileName = $_FILES['file']['name'];
$fileTmpName = $_FILES['file']['tmp_name'];
$fileSize = $_FILES['file']['size'];
$fileError = $_FILES['file']['error'];
$fileType = $_FILES['file']['type'];

$fileExt = explode('.' , $fileName);
$fileActualExt = strtolower(end($fileExt));

$allowed = array('jpg' , 'jpeg' , 'png' , 'pdf');
// $allowed = array('hex');
//  ********** files **********

    if(in_array($fileActualExt , $allowed)){
        if ($fileError === 0){
            if ($fileSize < 1000000){
                // $fileNameNew = date("d-m-Y--h-i") . "_" .$fileName ;
                $fileNameNew = uniqid('' , true) . "." . $fileActualExt;
                $fileDestination = 'uploaded/' . $fileNameNew;
                move_uploaded_file($fileTmpName, $fileDestination);
                // echo "secceded";
                echo "<h1> please take the file name screenshot and keep it </h1> <br/> <h2>" . dirname(__FILE__) . "\\" . $fileNameNew . "</h2>" ;
                // add key and insert to api
                    // path to your JSON file
                    $file = 'api/api.json'; 
                    // put the content of the file in a variable
                    $data = file_get_contents($file); 
                    // JSON decode
                    $obj = json_decode($data); 

                    $obj[] = array('file' => $fileNameNew , 'key' => uniqid() , 'count' => 0);

                    $myfile = fopen("api/api.json", "w") or die("Unable to open file!");
                    $txt = json_encode($obj);
                    fwrite($myfile, $txt);
                    fclose($myfile);
                // add key and insert to api
            } else {
                echo "your file is too big";
            }
        } else {
            echo "There was an error while uploadin file!";
        }
    } else {
        echo "You cannot upload files of this types";
    }
    
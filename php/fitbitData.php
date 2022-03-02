<?php

    if(file_exists('./env.php')) {
        include './env.php';
    }

    if(!function_exists('env')) {
        function env($key, $default = null)
        {
            $value = getenv($key);
            if ($value === false) {
                return $default;
            }
            return $value;
        }
    }
    $fitbitToken = env('fitbitToken');
    
    
    
    if(isset($_POST['action'])){
        $actionURL = "https://api.fitbit.com/1/user/-/activities/{$_POST['action']}/date/2022-01-01/today.json";
        if ($_POST['action'] == "steps") { connectToFitbit($actionURL,$fitbitToken); }
        // if ($_POST['action'] == "elevation") { connectToFitbit($actionURL,$fitbitToken); }
        // if ($_POST['action'] == "floors") { connectToFitbit($actionURL,$fitbitToken); }
        // if ($_POST['action'] == "calories") { connectToFitbit($actionURL,$fitbitToken); }
    }

    function connectToFitbit($url, $token) {
        // Initalize cURL connection
        $ch = curl_init($url);
        // Create Options/Headers
        curl_setopt($ch, CURLOPT_HTTPGET, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer {$token}"]);
        // Execute cURL
        $response_json = curl_exec($ch);
        // Close cURL connection
        curl_close($ch);
        // return response
        echo $response_json;
    }
?>
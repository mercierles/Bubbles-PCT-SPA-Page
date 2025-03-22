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
    
    if(isset($_GET['action'])){
        if(isset($_GET['date'])){
            $date = $_GET['date'];
        }else{
            $date = "2022-01-01";
        }
        $action = trim($_GET['action'],"'");
        $actionURL = "https://api.fitbit.com/1/user/-/activities/{$action}/date/{$date}/today.json";
        getWeeklyAverageStatForAction($action,$actionURL,$fitbitToken);
    }

    function connectToFitbit($url, $token) {
        if(empty($token))  {
            echo "%%ERROR%%";
            return;
        }
        // Initalize cURL connection
        $ch = curl_init($url);
        // Create Options/Headers
        curl_setopt($ch, CURLOPT_HTTPGET, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // Add token to HTTP Header
        curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer {$token}"]);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        // Execute cURL
        $response_json = curl_exec($ch);
        // Echo Errors
        if(curl_errno($ch)){
            echo "err".curl_error($ch);
        }
        // Close cURL connection
        curl_close($ch);
        // return response
        return $response_json;
    }

    function getWeeklyAverageStatForAction($action, $actionURL,$fitbitToken){
        $totalGained = 0;
        // Get Dataset for action from fitbit
        $actionData = connectToFitbit($actionURL,$fitbitToken);
        // Decode dataset into an Array
        $decodedActionData = json_decode($actionData, TRUE);
        // Loop through dataset calculating the weeks average
        foreach($decodedActionData['activities-'.$action] as $key) 
        {
         $totalGained = $totalGained + $key['value'];
        }
        // Return the Actions Calculated Avg 
        echo bcdiv($totalGained,count($decodedActionData['activities-'.$action]));
     }
?>
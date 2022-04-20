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

    if(isset($_GET['lighterpackurl'])){
        $url = trim($_GET['lighterpackurl'],"'");
    }else{
        $url = "https://lighterpack.com/r/c0z1be";
    }

    getLighterPackHTML($url);

    function getLighterPackHTML($url) {
        // Initalize cURL connection
        $ch = curl_init($url);
        // Create Options/Headers
        curl_setopt($ch, CURLOPT_HTTPGET, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        // Execute cURL
        $response_json = curl_exec($ch);
        // Echo Errors
        if(curl_errno($ch)){
            echo "err".curl_error($ch);
        }
        // Close cURL connection
        curl_close($ch);

        $start = stripos($response_json, '<ul class="lpCategories">');
        $end = stripos($response_json, '<div class="lpDialog" id="lpImageDialog">', $offset = $start);
        $length = $end - $start;
        $htmlSection = substr($response_json, $start, $length);
        
        echo $htmlSection;
    }
?>
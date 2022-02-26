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

// Get curl version array
    $token = env('token');
    $url = "https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token={$token}";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    curl_close($ch);
    // $response=json_decode($response_json, true);
    echo $response_json
?>
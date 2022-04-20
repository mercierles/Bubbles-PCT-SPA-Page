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
    $token = env('token');
    $instagramGraphURL = "https://graph.instagram.com/me/media?";
    $instagramGraphURLChildren = "https://graph.instagram.com"; //   /17970968002096395/children?";
    createMediaPostArray();

    function createMediaPostArray(){
        // Get latest Media Post
        $jsonResponse = getLatestMediaPost();
        $jsonResponse = json_decode($jsonResponse, TRUE);
        // If error from instagram check access token
        // Create new mediaPost Array
        $jsonMediaPostArray = '{"main":[],"children":[]}';
        $jsonMediaPostArray = json_decode($jsonMediaPostArray, TRUE);
        $jsonMediaPostArray['main'][] = ['id' => $jsonResponse['data'][0]['id'], 'caption' => $jsonResponse['data'][0]['caption'], 'url' => $jsonResponse['data'][0]['media_url']]; 
        // echo json_encode($jsonResponse['data'][1]['id']);
        // Populate mediaPost Array with its children images
        $jsonMediaPostArray = getLatestMediaPostChildren($jsonMediaPostArray);

        // return json string
        echo json_encode($jsonMediaPostArray);
    }
    function getLatestMediaPost()
    {
        $token = env('token');
        $url = $GLOBALS['instagramGraphURLChildren']."/me/media?fields=id,caption,media_type,media_url,children&access_token=".$GLOBALS['token'];
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HTTPGET, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response_json = curl_exec($ch);
        // Echo Errors
        if(curl_errno($ch)){
            echo "err".curl_error($ch);
        }
        curl_close($ch);
        return $response_json;
    }

    function getLatestMediaPostChildren($jsonMediaPostArray){
        
        $url = $GLOBALS['instagramGraphURLChildren']."/". $jsonMediaPostArray["main"][0]["id"] ."/children?fields=id,media_url,children&access_token=".$GLOBALS['token'];
        // echo $url;
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HTTPGET, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response_json = curl_exec($ch);
        // Echo Errors
        if(curl_errno($ch)){
            echo "err".curl_error($ch);
        }
        curl_close($ch);
        $response_json = json_decode($response_json, TRUE);
        if(count($response_json["data"]) > 0){
            foreach($response_json["data"] as $key => $value){
                $jsonMediaPostArray["children"][] = ["url" => $value["media_url"]];
            }
        }
        return $jsonMediaPostArray;
    }
?>
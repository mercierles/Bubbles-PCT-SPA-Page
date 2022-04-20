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

    if(isset($_GET['fileName'])){
        $fn = trim($_GET['fileName'],"'");
        getFile($fn);
    }else{
        // Default to First File
        getFirstFile();
    }

    function getFileNames() {
        $dir = env('blogFolder');
        $fileList = glob("{$dir}/*.txt");
        usort( $fileList, function( $a, $b ) { return filemtime($b) - filemtime($a); } );
        $files = array();
        foreach($fileList as $filename){
            if(is_file($filename)){
                array_push($files, $filename);
            }   
        }
        return $files;
    }

    function getFile($fileName) {
        $dir = env('blogFolder');
        $path = "{$dir}/{$fileName}";
        if ( !file_exists($path) ) {
            echo json_encode('File not found');
        }else{
            $arr = array(getFileNames());
            $myfile = fopen("$path", "r") or die("Unable to open file!");
            array_push($arr, fread($myfile,filesize("$path")));
            array_push($arr, $fileName);
            echo json_encode($arr);
            fclose($myfile);
        }
    }

    function getFirstFile() {
        $fileNames = getFileNames();
        $firstFile = array_shift($fileNames);
        if($firstFile != ""){
            $dir = env('blogFolder');
            $path = "{$dir}/{$firstFile}";
            if ( !file_exists($path) ) {
                echo json_encode('File not found');
            }else{
                $arr = array(getFileNames());
                $myfile = fopen("$path", "r") or die("Unable to open file!");
                array_push($arr, fread($myfile,filesize("$path")));
                array_push($arr, $firstFile);
                echo json_encode($arr);
                fclose($myfile);
            }
        }else{
            echo json_encode('File not found');
        }
    }
?>
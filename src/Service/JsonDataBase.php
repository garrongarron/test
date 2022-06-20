<?php

// src/Service/MessageGenerator.php
namespace App\Service;

use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Path;

class JsonDataBase
{
    function __construct()
    {
        $this->JSON_FILE_PATH =  dirname(__FILE__) . "/Posts";
    }
   
    public function getPost(): array
    {
        $handle = opendir($this->JSON_FILE_PATH);
        $files = [];
        while ($name = readdir($handle)) {
            $files[] = "$name";
        }
        sort($files);
        array_shift($files);
        array_shift($files);
        closedir($handle);
        return $files;
    }
    
    public function getFile($fineName): string
    {
        $content =  file_get_contents($this->JSON_FILE_PATH.'/'.$fineName);
        return $content;
    }
    public function save($filename, $json): bool
    {
        $myfile = fopen($this->JSON_FILE_PATH . '/' . $filename, "w") or die("Unable to open file!");
        fwrite($myfile, json_encode($json));
        fclose($myfile);
        return true;
    }
}

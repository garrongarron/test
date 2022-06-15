<?php

// src/Service/MessageGenerator.php
namespace App\Service;

class Courses
{
    public function getCourses(): array
    {
        $courses = [
            ['name'=>'Modelado 3D'],
            ['name'=>'Godot'],
            ['name'=>'Unity'],
            ['name'=>'Unreal'],
        ];
        return $courses;
    }
}
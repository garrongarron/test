<?php

// src/Service/MessageGenerator.php
namespace App\Service;

class Categories
{
    public function getCategory(): array
    {
        $categories = [
            ['name'=>'Modelado 3D'],
            ['name'=>'Godot'],
            ['name'=>'Unity'],
            ['name'=>'Unreal'],
        ];
        return $categories;
    }
}
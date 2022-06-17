<?php

namespace App\Controller;

use App\Service\JsonDataBase;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class JsonDataController extends AbstractController
{
    /**
     * @Route("/editor", name="editor")
     */
    public function editor(): Response
    {
        return $this->render('main/editor.html.twig', []);
    }

    /**
     * @Route("/editor/{json}", name="editor_json")
     */
    public function editorJson($json): Response
    {
        return $this->render('main/editor.html.twig', []);
    }
    
    /**
     * @Route("/api/files", name="json_files", methods={"GET"})
     */
    public function index(JsonDataBase $jsonDataBase): Response
    {
        return new JsonResponse($jsonDataBase->getPost());
    }

    /**
     * @Route("/api/files", name="json_data", methods={"POST"})
     */
    public function save(JsonDataBase $jsonDataBase, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        return new JsonResponse($jsonDataBase->save($data['fileName'], $data['json']));
    }

    /**
     * @Route("/api/files/{filename}", name="json_file_data", methods={"GET"})
     */
    public function getFile(JsonDataBase $jsonDataBase, $filename): Response
    {
        try {
            return new JsonResponse(json_decode($jsonDataBase->getFile($filename)));
        } catch (\Throwable $th) {
            return new JsonResponse(json_decode('[]'));
        }
        
    }

    
}
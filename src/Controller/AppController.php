<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AppController extends AbstractController
{
    // #[Route('/homepage', name: 'app_homepage')]
    /**
     * @Route("/homepage", name="app_homepage")
     */
    public function index(): Response
    {
        return $this->render('app/index.html.twig', [
            'user' => $this->getUser()
        ]);
    }


    /**
     * @Route("/course/landing", name="alternate_page")
     */
    public function alternatePage(): Response
    {
        return $this->render('app/alternate-page.html.twig', []);
    }

    /**
     * @Route("/", name="home")
     */
    public function home(): Response
    {
        return $this->render('main/index.html.twig', []);
    }

    /**
     * @Route("/nosotros", name="nosotros")
     */
    public function nosotros(): Response
    {
        return $this->render('main/nosotros.html.twig', []);
    }
    
    /**
     * @Route("/cursos", name="cursos")
     */
    public function cursos(): Response
    {
        return $this->render('main/cursos.html.twig', []);
    }

    /**
     * @Route("/equipo", name="equipo")
     */
    public function equipo(): Response
    {
        return $this->render('main/equipo.html.twig', []);
    }

    /**
     * @Route("/blog", name="blog")
     */
    public function blog(): Response
    {
        return $this->render('main/blog.html.twig', []);
    }

    /**
     * @Route("/detail", name="detail")
     */
    public function detail(): Response
    {
        return $this->render('main/blog-single.html.twig', []);
    }

    /**
     * @Route("/contacto", name="contact")
     */
    public function contacto(): Response
    {
        return $this->render('main/contacto.html.twig', []);
    }
}
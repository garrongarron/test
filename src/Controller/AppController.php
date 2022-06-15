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
    public function number(): Response
    {
        $number = random_int(0, 10);

        return new Response(
            '<html><body>Lucky number: '.$number.'</body></html>'
        );
    }
}
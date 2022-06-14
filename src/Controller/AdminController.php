<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminController extends AbstractController
{
    // #[Route('/admin/dashboard', name: 'admin_dashboard')]
    /**
     * @Route("/admin/dashboard", name="admin_dashboard")
     */
    public function dashboard(): Response
    {
        return $this->render('admin/dashboard.html.twig', [
            'user' => $this->getUser()
        ]);
    }

}
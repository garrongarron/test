<?php

namespace App\Controller;

use MercadoPago\SDK;
use MercadoPago\Preference;
use MercadoPago\Item;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MercadoPagoController extends AbstractController
{
    /**
     * @Route("/mp", name="mercadopago")
     */
    public function mp(): Response
    {
        return $this->render('todo.html.twig', []);
        //ejemplo https://github.dev/mercadopago/checkout-payment-sample/tree/master/server/php
        SDK::setAccessToken('PROD_ACCESS_TOKEN');
        // Crea un objeto de preferencia
        $preference = new Preference();

        // Crea un ítem en la preferencia
        $item = new Item();
        $item->title = 'Mi producto';
        $item->quantity = 1;
        $item->unit_price = 75.56;
        $preference->items = array($item);
        
        //rutas de respuesta
         $preference->back_urls = array(
            'success'=> 'http://'.$_SERVER['HTTP_HOST'].'/captura',
            'fail'=> 'http://'.$_SERVER['HTTP_HOST'].'/fail'
        );
        
        $preference->auto_return = "approved";
        $preference->binary_mode = true;

        $preference->save();

        return $this->render('mercadopago/tienda.html.twig', [
            'PREFERENCE_ID' => $preference->id
        ]);
    }
    
    /**
     * @Route("/captura", name="mercadopago_captura")
     */
    public function captura(){
        return $this->render('todo.html.twig', []);
        $_GET['payment_id'];
        $_GET['status'];
        $_GET['payment_type'];
        $_GET['merchant_order_id'];
    }

    /**
     * @Route("/fail", name="mercadopago_fail")
     */
    public function fail(){
        return $this->render('todo.html.twig', []);
    }
}
<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

abstract class SerializerController extends Controller
{
    public function serialize($data, $format, Array $headers = [])
    {
        $json = $this->get('jms_serializer')->serialize($data, $format);

        return new Response($json, 200, array_merge([
            'Content-Type' => 'application/json'
        ], $headers));
    }
}
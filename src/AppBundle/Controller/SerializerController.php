<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

abstract class SerializerController extends Controller
{
    public function serialize($data, $format, Array $headers = [])
    {
        return new Response(
            $this->get('jms_serializer')->serialize($data, $format),
            200,
            $headers
        );
    }
}
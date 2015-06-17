<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Choice;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ChoiceController extends SerializerController
{
    /**
     * @Route("/choice/{id}.{_format}", name="choice_update", options={"expose"=true})
     * @Method({"PUT"})
     * @Security("is_granted('manage', choice)")
     *
     * @param Choice  $choice
     * @param Request $request
     * @return Response
     */
    public function updateAction(Choice $choice, Request $request)
    {
        $post = $request->request;

        if ($post->get('name')) {
            $choice->setName($post->get('name'));
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($choice);
        $em->flush();

        return $this->serialize($choice, $request->getRequestFormat());
    }
}
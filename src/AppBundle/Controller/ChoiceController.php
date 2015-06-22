<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Choice;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class ChoiceController
 * @Route(
 *   "/choice/{id}",
 *   defaults={"_format": "json"},
 *   requirements={
 *     "id": "\d+",
 *     "_format": "json|xml|yml"
 *   },
 *   options={"expose"=true}
 * )
 * @Security("is_granted('manage', choice.getDecision())")
 */
class ChoiceController extends SerializerController
{
    /**
     * @Route(".{_format}", name="choice_get")
     * @Method({"GET"})
     *
     * @param Choice  $choice
     * @param Request $request
     * @return Response
     */
    public function getAction(Choice $choice, Request $request)
    {
        return $this->serialize(
            $choice,
            $request->getRequestFormat(),
            ['Content-Type' => 'application/json']
        );
    }

    /**
     * @Route(".{_format}", name="choice_update")
     * @Method({"PUT"})
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
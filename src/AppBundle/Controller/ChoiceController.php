<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Choice;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
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

    /**
     * @Route(
     *   "/choice/new.{_format}",
     *   name="choice_new",
     *   defaults={"_format": "json"},
     *   requirements={
     *     "_format": "json|xml|yml",
     *     "decision_id": "\d+"
     *   },
     *   options={"expose"=true}
     * )
     * @ParamConverter()
     * @Method({"GET"})
     * @Security("has_role('ROLE_USER')")
     *
     * @param Request $request
     * @return Response
     */
    public function newAction(Request $request) {
        $em = $this->getDoctrine()->getManager();
        $decision_id = $request->query->get('decision_id');

        $decision = $this->getDoctrine()->getRepository('AppBundle:Decision')->find($decision_id);
        if (!$decision) {
            $this->createNotFoundException("Decision not found with id: ${$decision_id}");
        }
        $this->denyAccessUnlessGranted('manage', $decision);

        $choice = new Choice();
        $choice->setDecision($decision);
        $choice->setName("Enter a choice here!");
        $choice->setPriority(5);

        $em->persist($choice);
        $em->flush();

        return $this->serialize($choice, $request->getRequestFormat());
    }
}
<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Activity;
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

        $choice->setName($post->get('name'));
        $choice->setPriority($post->get('priority'));

        $em = $this->getDoctrine()->getManager();
        $em->persist($choice);
        $em->flush();

        return $this->serialize($choice, $request->getRequestFormat());
    }

    /**
     * @Route(".{_format}", name="choice_remove")
     * @Method({"DELETE"})
     *
     * @param Choice  $choice
     * @param Request $request
     * @return Response
     */
    public function removeAction(Choice $choice, Request $request)
    {
        $response = [
            'choiceId' => $choice->getId(),
            'decisionId' => $choice->getDecision()->getId()
        ];

        $em = $this->getDoctrine()->getManager();
        $em->remove($choice);
        $em->flush();

        $response['status'] = 'success';

        return $this->serialize($response, $request->getRequestFormat());
    }

    /**
     * @Route("/logActivity.{_format}", name="choice_log_activity")
     * @Method({"GET"})
     *
     * @param Choice  $choice
     * @param Request $request
     * @return Response
     */
    public function logActivityAction(Choice $choice, Request $request)
    {
        $activity = new Activity();
        $activity->setChoice($choice);

        $em = $this->getDoctrine()->getManager();
        $em->persist($activity);
        $em->flush();

        return $this->serialize($choice, $request->getRequestFormat());
    }
}
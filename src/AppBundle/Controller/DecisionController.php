<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Decision;
use AppBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DecisionController
 * @Route(
 *   "/",
 *   defaults={"_format": "json"},
 *   requirements={
 *     "_format": "json|xml|yml"
 *   },
 *   options={"expose"=true}
 * )
 */
class DecisionController extends SerializerController
{
    /**
     * @Route(
     *   "/decisions.{_format}",
     *   name="decisions_list",
     *   defaults={"_format": "html"},
     *   requirements={"_format": "html|json|xml|yml"}
     * )
     * @Method({"GET"})
     * @Security("has_role('ROLE_USER')")
     *
     * @param Request $request
     * @return Response
     */
    public function listAction(Request $request)
    {
        $decisionManager = $this->get('manager.decision');

        $user = $this->get('security.token_storage')->getToken()->getUser();
        $decisions = $decisionManager->getDecisionsForUserWithAnswers($user);

        if ($request->getRequestFormat() === 'html') {
            return $this->render('decisions/list.html.twig', [
                'decisions' => $decisions
            ]);
        } else {
            return $this->serialize($decisions, $request->getRequestFormat());
        }
    }

    /**
     * @Route("/decision/{id}/answer.{_format}", name="decision_answer")
     * @Method({"GET"})
     * @Security("is_granted('manage', decision)")
     *
     * @param Decision $decision
     * @return Response
     */
    public function answerAction(Decision $decision)
    {
        $choice = $this->get('manager.decision')->pickChoice($decision);

        return $this->serialize($choice, 'json');
    }

    /**
     * @Route("/decision/{id}.{_format}", name="decision_update")
     * @Method({"PUT"})
     * @Security("is_granted('manage', decision)")
     *
     * @param Decision $decision
     * @param Request  $request
     * @return Response
     */
    public function updateAction(Decision $decision, Request $request)
    {
        $post = $request->request;

        if ($post->get('theme')) {
            $decision->setTheme($post->get('theme'));
        }

        if ($post->get('question')) {
            $decision->setQuestion($post->get('question'));
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($decision);
        $em->flush();

        return $this->serialize($decision, $request->getRequestFormat());
    }

    /**
     * @Route("/decision/new.{_format}", name="decision_new")
     * @Method({"GET"})
     * @Security("has_role('ROLE_USER')")
     *
     * @param Request $request
     * @return Response
     */
    public function newAction(Request $request) {
        $decision = new Decision();
        $decision->setUser($this->getUser());
        $decision->setQuestion('Enter a question here!');
        $decision->setTheme('blue');

        $em = $this->getDoctrine()->getManager();
        $em->persist($decision);
        $em->flush();

        return $this->serialize($decision, $request->getRequestFormat());
    }

    /**
     * @Route("/decision/{id}.{_format}", name="decision_delete")
     * @Method({"DELETE"})
     * @Security("is_granted('manage', decision)")
     *
     * @param Decision $decision
     * @param Request  $request
     * @return Response
     */
    public function removeAction(Decision $decision, Request $request)
    {
        $response = [
            'id' => $decision->getId()
        ];

        $em = $this->getDoctrine()->getManager();
        $em->remove($decision);
        $em->flush();

        $response['status'] = 'success';

        return $this->serialize($response, $request->getRequestFormat());
    }
}
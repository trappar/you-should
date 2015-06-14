<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Decision;
use AppBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DecisionController extends SerializerController
{
    /**
     * @Route(
     *   "/decisions.{_format}",
     *   name="decisions_list",
     *   defaults={"_format": "html"},
     *   requirements={
     *     "_format": "html|json|xml|yml"
     *   },
     *   options={"expose"=true})
     * @Security("has_role('ROLE_USER')")
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
     * @Route("/decision/{id}/answer.json", name="decision_answer", options={"expose"=true})
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
}
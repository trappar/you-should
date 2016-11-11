<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Activity;
use AppBundle\Entity\Choice;
use AppBundle\Entity\Decision;
use AppBundle\Service\EntityChangerOptions;
use Doctrine\Common\Collections\Criteria;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DecisionController
 * @Route(
 *   "/",
 *   requirements={
 *     "_format": "json|xml|yml"
 *   },
 *   options={"expose"=true}
 * )
 */
class DecisionController extends Controller
{
    /**
     * @Route("/decision/update.{_format}", name="receive_update")
     * @Method({"POST"})
     * @Security("has_role('ROLE_USER')")
     * @param Request $request
     * @return Response
     */
    public function receiveUpdate(Request $request)
    {
        $changes = json_decode($request->getContent(), true);

        $entityChanger = $this->get('entity_changer');

        /** @var Decision $decision */
        $decision = $entityChanger->acceptChanges(
            EntityChangerOptions::create($changes, Decision::class)
                ->setAllowedProperties(['question', 'theme'])
                ->setFindEntity(function ($id) {
                    return $this->getDoctrine()
                        ->getRepository('AppBundle:Decision')
                        ->findDecisionsForUser($this->getUser(), $id);
                })
                ->setModifyAdded(function (Decision $decision) {
                    $decision->setUser($this->getUser());
                })
        );

        if ($decision) {
            foreach ($changes['choices'] ?? [] as $choiceChanges) {
                $entityChanger->acceptChanges(
                    EntityChangerOptions::create($choiceChanges, Choice::class)
                        ->setAllowedProperties(['name', 'priority'])
                        ->setFindEntity(function ($id) use ($decision) {
                            return $decision->getChoices()->matching(
                                Criteria::create()->where(Criteria::expr()->eq('id', $id))
                            )->first();
                        })
                        ->setModifyAdded(function (Choice $choice) use ($decision) {
                            $choice->setDecision($decision);
                            $decision->getChoices()->add($choice);
                        })
                );
            }
            $decision->setAnswer(
                $this->get('manager.decision')->pickChoice($decision)
            );
        }


        $this->getDoctrine()->getManager()->flush();

        return $this->serialize($decision, $request->getRequestFormat());
    }

    /**
     * @Route("/decisions.{_format}", name="decisions_list")
     * @Method({"GET"})
     * @Security("has_role('ROLE_USER')")
     *
     * @param Request $request
     * @return Response
     */
    public function listAction(Request $request)
    {
        $decisionManager = $this->get('manager.decision');

        $user      = $this->get('security.token_storage')->getToken()->getUser();
        $decisions = $decisionManager->getDecisionsForUserWithAnswers($user);

        return $this->serialize($decisions, $request->getRequestFormat());
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
     * @Route(
     *   "/decision/{id}.{_format}",
     *   name="decision_remove",
     *   requirements={"id": "\d+"}
     * )
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

    /**
     * @Route(
     *     "/choice/{id}/logActivity.{_format}",
     *     name="choice_log_activity",
     *     requirements={
     *         "id": "\d+",
     *     }
     * )
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

    private function serialize($data, $format)
    {
        return new Response(
            $this->get('serializer')->serialize($data, $format, ['groups' => ['decision']])
        );
    }
}
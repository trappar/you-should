<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Choice;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        return $this->render('default/index.html.twig');
    }

//    /**
//     * @Route("/", name="homepage")
//     */
//    public function indexAction()
//    {
//        $decisionRepo = $this->getDoctrine()->getRepository('AppBundle:Decision');
//        $decisions = $decisionRepo->findAll();
//        $decision = $decisions[0];
//
//        $activities = $this->getDoctrine()->getRepository('AppBundle:Activity')->findActivitiesByDecision($decision);
//
//        dump($decision);
//        dump($activities);
//        exit;
//
//        $tasks = $choiceRepo->findAll();
//        $activities = $this->getDoctrine()->getRepository('AppBundle:Activity')->getActivitiesByDate(10);
//
//        $doThisTask = $this->get('manager.task')->pickRandomTaskByPriority($tasks);
//
//        return $this->render('default/index.html.twig', [
//            'activities' => $activities,
//            'doThis' => $doThisTask
//        ]);
//    }
}

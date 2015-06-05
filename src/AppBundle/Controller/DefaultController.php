<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Choice;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction()
    {
//        $taskRepo = $this->getDoctrine()->getRepository('AppBundle:Choice');
//
//        $tasks = $taskRepo->findAll();
//        $activities = $this->getDoctrine()->getRepository('AppBundle:Activity')->getActivitiesByDate(10);
//
//        $doThisTask = $this->get('manager.task')->pickRandomTaskByPriority($tasks);

        return $this->render('default/index.html.twig', [
//            'activities' => $activities,
//            'doThis' => $doThisTask
        ]);
    }
}

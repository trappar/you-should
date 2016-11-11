<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    public function reactRouterAction(Request $request)
    {
        $serializer      = $this->get('serializer');
        $decisionManager = $this->get('manager.decision');

        $appState = $serializer->serialize(
            [
                'user'      => $this->getUser(),
                'decisions' => $decisionManager->getDecisionsForUserWithAnswers($this->getUser()),
                'alerts'   => count($flashes = $request->getSession()->getFlashBag()->all()) ? $flashes : null,
                'posts' => $this->getDoctrine()->getRepository('AppBundle:Post')->findBy([], ['id' => 'desc'], 5),
            ],
            'json',
            ['groups' => ['user', 'decision', 'post']]
        );

        return $this->render('react_router.html.twig', ['appState' => $appState]);
    }
}

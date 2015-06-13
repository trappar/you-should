<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DecisionController extends Controller
{
    /**
     * @Route("/decisions.json");
     * @Security("has_role('ROLE_USER')")
     */
    public function listAction()
    {
        /** @var User $user */
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $json = $this->get('jms_serializer')->serialize($user->getDecisions()->getValues(), 'json');

        return new Response($json, 200, [
            'Content-Type' => 'application/json'
        ]);
    }
}
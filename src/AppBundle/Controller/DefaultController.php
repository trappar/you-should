<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Choice;
use AppBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class DefaultController extends Controller
{
    public function reactRouterAction($url)
    {
        $user = $this->getDoctrine()->getRepository('AppBundle:User')->find(13);
        $this->get('manager.user')->setCurrentUser($user);

        return $this->render('react_router.html.twig');
    }
}

<?php

namespace AppBundle\Controller;

use JMS\DiExtraBundle\Annotation\Service;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class SecurityController
 *
 * @Route(
 *   "/",
 *   defaults={"_format": "json"},
 *   requirements={
 *     "_format": "json|xml|yml"
 *   },
 *   options={"expose"=true}
 * )
 */
class SecurityController extends SerializerController
{
    /**
     * @Route(
     *   "/user/me.{_format}",
     *   name="security_user_current"
     * )
     * @Method({"GET"})
     * @param Request $request
     * @return Response
     */
    public function getCurrentUserAction(Request $request)
    {
        return $this->serialize($this->getUser(), $request->getRequestFormat());
    }
}
<?php

namespace AppBundle\Security\Authentication;

use JMS\DiExtraBundle\Annotation as DI;
use JMS\Serializer\Serializer;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Logout\LogoutSuccessHandlerInterface;

/**
 * AuthenticationHandler
 *
 * @DI\Service("authentication_handler")
 */
class AuthenticationHandler
    implements AuthenticationSuccessHandlerInterface, AuthenticationFailureHandlerInterface, LogoutSuccessHandlerInterface
{
    /**
     * @var Router
     */
    private $router;
    /**
     * @var Session
     */
    private $session;
    /**
     * @var Serializer
     */
    private $serializer;

    /**
     * @DI\InjectParams({
     *   "router" = @DI\Inject("router"),
     *   "session" = @DI\Inject("session"),
     *   "serializer" = @DI\Inject("jms_serializer")
     * })
     * @param Router     $router
     * @param Session    $session
     * @param Serializer $serializer
     */
    public function __construct(Router $router, Session $session, Serializer $serializer)
    {
        $this->router = $router;
        $this->session = $session;
        $this->serializer = $serializer;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        return new Response($this->serializer->serialize($token->getUser(), 'json'));
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new Response($this->serializer->serialize($exception, 'json'));
    }

    public function onLogoutSuccess(Request $request)
    {
        return new Response(null, 200);
    }
}
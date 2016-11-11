<?php

namespace AppBundle\Security\Authentication;

use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Http\Logout\LogoutSuccessHandlerInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Translation\IdentityTranslator;

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
     * @var IdentityTranslator
     */
    private $translator;

    /**
     * @DI\InjectParams({
     *   "router" = @DI\Inject("router"),
     *   "session" = @DI\Inject("session"),
     *   "serializer" = @DI\Inject("serializer"),
     *   "translator" = @DI\Inject("translator")
     * })
     * @param Router             $router
     * @param Session            $session
     * @param Serializer         $serializer
     * @param IdentityTranslator $translator
     */
    public function __construct(
        Router $router,
        Session $session,
        Serializer $serializer,
        IdentityTranslator $translator
    )
    {
        $this->router     = $router;
        $this->session    = $session;
        $this->serializer = $serializer;
        $this->translator = $translator;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        return new Response($this->serializer->serialize($token->getUser(), $request->getRequestFormat(), ['groups' => ['user']]));
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new JsonResponse(['error' => $this->translator->trans($exception->getMessage(), [], 'security')]);
    }

    public function onLogoutSuccess(Request $request)
    {
        return new Response(null, 200);
    }
}
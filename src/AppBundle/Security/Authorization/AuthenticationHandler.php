<?php

namespace AppBundle\Security\Authorization;

use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

/**
 * AuthenticationHandler
 *
 * @DI\Service("authentication_handler")
 */
class AuthenticationHandler implements AuthenticationSuccessHandlerInterface, AuthenticationFailureHandlerInterface
{
    /**
     * @var Router
     */
    private $router;

    /**
     * @DI\InjectParams({
     *   "router" = @DI\Inject("router")
     * })
     * @param Router $router
     */
    public function __construct(Router $router)
    {
        $this->router = $router;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        if ($request->isXmlHttpRequest()) {
            // Handle XHR here
        } else {
            // If the user tried to access a protected resource and was forced to login
            // redirect him back to that resource
            if ($targetPath = $request->getSession()->get('_security.default.target_path')) {
                $url = $targetPath;
            } else {
                // Otherwise, redirect him to wherever you want
                $url = $this->router->generate('decisions_list');
            }

            return new RedirectResponse($url);
        }
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        if ($request->isXmlHttpRequest()) {
            // Handle XHR here
        } else {
            // Save the security error in the session
            $request->getSession()->set(Security::AUTHENTICATION_ERROR, $exception);

            $url = $this->router->generate('login');

            return new RedirectResponse($url);
        }
    }
}
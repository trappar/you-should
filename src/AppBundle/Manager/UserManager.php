<?php

namespace AppBundle\Manager;

use AppBundle\Entity\User;
use JMS\DiExtraBundle\Annotation as DI;
use JMS\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

/**
 * Class UserManager
 *
 * @DI\Service("manager.user")
 */
class UserManager
{
    /**
     * @var TokenStorage
     */
    private $tokenStorage;
    /**
     * @var Session
     */
    private $session;

    /**
     * @param TokenStorage $tokenStorage
     * @param Session      $session
     * @DI\InjectParams({
     *   "tokenStorage" = @DI\Inject("security.token_storage"),
     *   "session" = @DI\Inject("session")
     * })
     */
    public function __construct(
        TokenStorage $tokenStorage,
        Session $session
    )
    {
        $this->tokenStorage = $tokenStorage;
        $this->session = $session;
    }

    public function setCurrentUser(User $user)
    {
        $token = new UsernamePasswordToken($user, null, 'default', $user->getRoles());
        $this->session->set('_security_default', serialize($token));
        $this->session->save();
        $this->tokenStorage->setToken($token);
    }

}
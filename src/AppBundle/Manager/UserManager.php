<?php

namespace AppBundle\Manager;

use AppBundle\Entity\User;
use AppBundle\Entity\UserToken;
use AppBundle\Service\Emailer;
use JMS\DiExtraBundle\Annotation as DI;
use JMS\Serializer\Serializer;
use Mailgun\Mailgun;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Encoder\PasswordEncoderInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;

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
     * @var PasswordEncoderInterface
     */
    private $passwordEncoder;
    /**
     * @var Emailer
     */
    private $emailer;

    /**
     * @DI\InjectParams({
     *     "tokenStorage" = @DI\Inject("security.token_storage"),
     *     "session" = @DI\Inject("session"),
     *     "passwordEncoder" = @DI\Inject("security.password_encoder"),
     *     "emailer" = @DI\Inject("emailer")
     * })
     * @param TokenStorage        $tokenStorage
     * @param Session             $session
     * @param UserPasswordEncoder $passwordEncoder
     * @param Emailer             $emailer
     */
    public function __construct(
        TokenStorage $tokenStorage,
        Session $session,
        UserPasswordEncoder $passwordEncoder,
        Emailer $emailer
    )
    {
        $this->tokenStorage    = $tokenStorage;
        $this->session         = $session;
        $this->passwordEncoder = $passwordEncoder;
        $this->emailer = $emailer;
    }

    public function setCurrentUser(User $user)
    {
        $token = new UsernamePasswordToken($user, null, 'default', $user->getRoles());
        $this->session->set('_security_default', serialize($token));
        $this->session->save();
        $this->tokenStorage->setToken($token);
    }
}
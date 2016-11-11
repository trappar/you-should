<?php

namespace AppBundle\EventListener;

use AppBundle\Entity\User;
use AppBundle\Entity\UserToken;
use AppBundle\Service\Emailer;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;

/**
 * Class UserListener
 * @package AppBundle\EventListener
 * @DI\DoctrineListener(events = {"prePersist"})
 */
class UserListener
{
    /**
     * @var UserPasswordEncoder
     */
    private $passwordEncoder;
    /**
     * @var Emailer
     */
    private $emailer;

    /**
     * UserListener constructor.
     * @param UserPasswordEncoder $passwordEncoder
     * @param Emailer             $emailer
     * @DI\InjectParams({
     *     "passwordEncoder" = @DI\Inject("security.password_encoder"),
     *     "emailer" = @DI\Inject("emailer")
     * })
     */
    public function __construct(UserPasswordEncoder $passwordEncoder, Emailer $emailer)
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->emailer         = $emailer;
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        if ($args->getObject() instanceof User) {
            /** @var User $user */
            $user = $args->getObject();
            $user->setPassword(
                $this->passwordEncoder->encodePassword($user, $user->getPlainPassword())
            );

            $confirmToken = new UserToken();
            $confirmToken
                ->setUser($user)
                ->setType(UserToken::TYPE_CONFIRM_EMAIL)
                ->setExpiration(new \DateTime('+1 day'));
            $user->getTokens()->add($confirmToken);

            $this->emailer->send(
                $user->getEmail(),
                'Confirm your account',
                'email/confirm-email.html.twig',
                ['token' => $confirmToken]
            );
        }
    }
}
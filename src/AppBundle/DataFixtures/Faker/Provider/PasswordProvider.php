<?php

namespace AppBundle\DataFixtures\Faker\Provider;

use AppBundle\Entity\User;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;

/**
 * Class PasswordProvider
 * @package AppBundle\DataFixtures\Faker\Provider
 * @DI\Service("faker.provider.password")
 * @DI\Tag(name="hautelook_alice.faker.provider")
 */
class PasswordProvider
{
    /**
     * @var UserPasswordEncoder
     */
    private $passwordEncoder;

    /**
     * PasswordProvider constructor.
     * @DI\InjectParams({
     *     "passwordEncoder" = @DI\Inject("security.password_encoder")
     * })
     * @param UserPasswordEncoder $passwordEncoder
     */
    public function __construct(UserPasswordEncoder $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function password($data)
    {
        $user     = new User();
        $password = $this->passwordEncoder->encodePassword($user, $data);

        return $password;
    }
}
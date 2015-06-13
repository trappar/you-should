<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\User;
use Hautelook\AliceBundle\Alice\DataFixtureLoader;
use Nelmio\Alice\Fixtures;

class AppFixtures extends DataFixtureLoader
{
    /**
     * {@inheritDoc}
     */
    protected function getFixtures()
    {
        return  array(
            __DIR__ . '/fixtures.yml',
        );
    }

    public function encodePassword($data)
    {
        $user = new User();
        $encoder = $this->container->get('security.password_encoder');
        $password = $encoder->encodePassword($user, $data);

        return $password;
    }
}
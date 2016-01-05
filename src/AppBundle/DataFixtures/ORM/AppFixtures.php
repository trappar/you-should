<?php

namespace AppBundle\DataFixtures\ORM;

use Hautelook\AliceBundle\Doctrine\DataFixtures\AbstractLoader;
use Nelmio\Alice\Fixtures;

class AppFixtures extends AbstractLoader
{
    /**
     * {@inheritDoc}
     */
    public function getFixtures()
    {
        return  array(
            __DIR__ . '/fixtures.yml',
        );
    }
}
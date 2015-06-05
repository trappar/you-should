<?php

namespace AppBundle\Entity;

use Doctrine\ORM\EntityRepository;

class ChoiceRepository extends EntityRepository
{
    public function getChoiceCount()
    {
        $dbh = $this->getEntityManager()->getConnection();
        $sth = $dbh->query("
            SELECT COUNT(*)
            FROM choice
        ");
        return $sth->fetchColumn();
    }
}
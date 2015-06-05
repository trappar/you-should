<?php

namespace AppBundle\Entity;

use Doctrine\ORM\EntityRepository;

class TaskRepository extends EntityRepository
{
    public function getTaskCount()
    {
        $dbh = $this->getEntityManager()->getConnection();
        $sth = $dbh->query("
            SELECT COUNT(*)
            FROM task
        ");
        return $sth->fetchColumn();
    }
}
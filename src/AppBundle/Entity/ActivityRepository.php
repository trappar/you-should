<?php

namespace AppBundle\Entity;

use Doctrine\ORM\EntityRepository;

class ActivityRepository extends EntityRepository
{
    public function getActivitiesByDate($maxResults)
    {
        return $this->createQueryBuilder('t')
            ->orderBy('t.date', 'DESC')
            ->setMaxResults($maxResults)
            ->getQuery()
            ->getResult();
    }
}
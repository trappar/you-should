<?php

namespace AppBundle\Entity;

use Doctrine\ORM\EntityRepository;

class ActivityRepository extends EntityRepository
{
    public function findActivitiesByDecision(Decision $decision, $maxResults = null)
    {
        $qb = $this->createQueryBuilder('a')
            ->join('a.choice', 'c')
            ->where('c.decision = :decision')
            ->setParameter('decision', $decision)
            ->orderBy('a.date', 'DESC');

        if ($maxResults) {
            $qb->setMaxResults($maxResults);
        }

        return $qb->getQuery()->getResult();
    }
}
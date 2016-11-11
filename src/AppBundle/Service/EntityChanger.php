<?php

namespace AppBundle\Service;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManager;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\Serializer\Serializer;

/**
 * Class EntityChanger
 * @package Tests\AppBundle\Service
 * @DI\Service("entity_changer")
 */
class EntityChanger
{
    /**
     * @var EntityManager
     */
    private $em;
    /**
     * @var Serializer
     */
    private $serializer;

    /**
     * EntityChanger constructor.
     * @param EntityManager $em
     * @param Serializer    $serializer
     * @DI\InjectParams({
     *     "em" = @DI\Inject("doctrine.orm.entity_manager"),
     *     "serializer" = @DI\Inject("serializer")
     * })
     */
    public function __construct(EntityManager $em, Serializer $serializer)
    {
        $this->em         = $em;
        $this->serializer = $serializer;
    }

    public function acceptChanges(EntityChangerOptions $options) {
        $changes = $options->getChanges();
        $changesType = $changes['type'] ?? null;
        $class = $options->getClass();

        $entity = null;
        if ($changesType === 'add') {
            $entity = new $class();
            if ($options->getModifyAdded()) {
                call_user_func($options->getModifyAdded(), $entity);
            }
        } else {
            $entityId = $changes['id'] ?? null;
            if ($options->getFindEntity()) {
                $entity = call_user_func($options->getFindEntity(), $entityId);
                if (is_array($entity)) {
                    switch (count($entity)) {
                        case 0:
                            $entity = null;
                            break;
                        case 1:
                            $entity = $entity[0];
                            break;
                        default:
                            throw new \Exception('Multiple entities returned by findEntity callable passed to AcceptChanges method of EntityChanger.');
                    }
                }
            } else {
                $entity = $this->em->getRepository($class)->findOneBy(['id' => $entityId]);
            }
        }

        if ($entity) {
            if ($changesType === 'remove') {
                $this->em->remove($entity);

                return true;
            } else {
                $changes = $changes['object'] ?? null;
                if ($changes) {
                    $changes = array_filter($changes, function($propName) use($options) {
                        return in_array($propName, $options->getAllowedProperties());
                    }, ARRAY_FILTER_USE_KEY);
                    $entity = $this->serializer->denormalize(
                        $changes,
                        $class,
                        null,
                        ['object_to_populate' => $entity]
                    );
                }

                $this->em->persist($entity);

                return $entity;
            }
        } else {
            return false;
        }
    }
}
<?php

namespace AppBundle\Manager;

use AppBundle\Entity\Choice;
use AppBundle\Entity\ChoiceRepository;
use Doctrine\ORM\EntityManager;
use JMS\DiExtraBundle\Annotation AS DI;

/**
 * Class ChoiceManager
 * @package AppBundle\Manager
 *
 * @DI\Service("manager.task")
 */
class ChoiceManager
{
    /**
     * @var EntityManager
     */
    private $em;

    /**
     * @var ChoiceRepository
     */
    private $choiceRepo;

    /**
     * @param EntityManager $em
     * @DI\InjectParams({
     *   "em" = @DI\Inject("doctrine.orm.entity_manager")
     * })
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
        $this->taskRepo = $this->em->getRepository('AppBundle:Task');
    }

    /**
     * @param Choice[] $choices
     * @return Choice
     */
    public function pickRandomTaskByPriority($choices)
    {
        $totalPriority = array_reduce($choices, function($total, $choice){
            /** @var Choice $choice */
            return $total + $choice->getAdjustedPriority();
        }, 0);

        $random = rand() / getrandmax() * $totalPriority;
        $current = 0;
        $chosenTask = null;
        foreach ($choices as $choice) {
            if ($random > $current && $random <= $current + $choice->getAdjustedPriority()) {
                $chosenTask = $choice;
                break;
            } else {
                $current += $choice->getAdjustedPriority();
            }
        }

        return $chosenTask;
    }
}
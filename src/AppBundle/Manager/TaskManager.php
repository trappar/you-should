<?php

namespace AppBundle\Manager;

use AppBundle\Entity\Task;
use AppBundle\Entity\TaskRepository;
use Doctrine\ORM\EntityManager;
use JMS\DiExtraBundle\Annotation AS DI;

/**
 * Class TaskManager
 * @package AppBundle\Manager
 *
 * @DI\Service("manager.task")
 */
class TaskManager
{
    /**
     * @var EntityManager
     */
    private $em;

    /**
     * @var TaskRepository
     */
    private $taskRepo;

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
     * @param Task[] $tasks
     * @return Task
     */
    public function pickRandomTaskByPriority($tasks)
    {
        $totalPriority = array_reduce($tasks, function($total, $task){
            /** @var Task $task */
            return $total + $task->getAdjustedPriority();
        }, 0);

        $random = rand() / getrandmax() * $totalPriority;
        $current = 0;
        $chosenTask = null;
        foreach ($tasks as $task) {
            if ($random > $current && $random <= $current + $task->getAdjustedPriority()) {
                $chosenTask = $task;
                break;
            } else {
                $current += $task->getAdjustedPriority();
            }
        }

        return $chosenTask;
    }
}
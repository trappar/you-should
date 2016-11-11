<?php

namespace AppBundle\Manager;

use AppBundle\Entity\Choice;
use AppBundle\Entity\ChoiceRepository;
use AppBundle\Entity\Decision;
use AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use JMS\DiExtraBundle\Annotation AS DI;

/**
 * Class DecisionManager
 * @package AppBundle\Manager
 *
 * @DI\Service("manager.decision")
 */
class DecisionManager
{
    /**
     * @var EntityManager
     */
    private $em;

    /**
     * DecisionManager constructor.
     * @DI\InjectParams({
     *     "em" = @DI\Inject("doctrine.orm.entity_manager")
     * })
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em) {
        $this->em = $em;
    }

    public function getDecisionsForUserWithAnswers(User $user = null)
    {
        if ($user) {
            $decisions = $this->em->getRepository('AppBundle:Decision')->findDecisionsForUser($user);

            foreach ($decisions as $decision) {
                $decision->setAnswer($this->pickChoice($decision));
            }

            return $decisions;
        }

        return null;
    }

    /**
     * @param Decision $decision
     * @return Choice
     */
    public function pickChoice(Decision $decision)
    {
        $choices = $decision->getChoices();
        $choices = $choices->filter(function ($choice) {
            /** @var Choice $choice */
            return strlen($choice->getName());
        });

        $totalPriority = array_reduce($choices->getValues(), function ($total, $choice) {
            /** @var Choice $choice */
            return $total + $choice->getAdjustedPriority();
        }, 0);

        $random       = rand() / getrandmax() * $totalPriority;
        $current      = 0;
        $chosenChoice = null;
        foreach ($choices as $choice) {
            if ($random > $current && $random <= $current + $choice->getAdjustedPriority()) {
                $chosenChoice = $choice;
                break;
            } else {
                $current += $choice->getAdjustedPriority();
            }
        }

        return $chosenChoice;
    }
}
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
    public function getDecisionsForUserWithAnswers(User $user)
    {
        $decisions = $user->getDecisions();

        foreach ($decisions as $decision) {
            $decision->setAnswer($this->pickChoice($decision));
        }

        return $decisions;
    }

    /**
     * @param Decision $decision
     * @return Choice
     */
    public function pickChoice(Decision $decision)
    {
        $choices = $decision->getChoices();
        $totalPriority = array_reduce($choices->getValues(), function($total, $choice){
            /** @var Choice $choice */
            return $total + $choice->getAdjustedPriority();
        }, 0);

        $random = rand() / getrandmax() * $totalPriority;
        $current = 0;
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
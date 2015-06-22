<?php

namespace AppBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as SER;

/**
 * Choice
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="ChoiceRepository")
 * @SER\ExclusionPolicy("none")
 */
class Choice
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var integer
     *
     * @ORM\Column(name="priority", type="float")
     */
    private $priority;

    /**
     * @var Decision
     *
     * @ORM\ManyToOne(targetEntity="Decision")
     * @ORM\JoinColumn(name="decision_id", referencedColumnName="id")
     * @SER\Exclude()
     */
    private $decision;

    /**
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="Activity", mappedBy="choice")
     * @SER\Exclude()
     */
    private $activities;

    /**
     * @SER\Exclude()
     */
    private $adjustedPriority;

    public function __construct()
    {
        $this->activities = new ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Choice
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set priority
     *
     * @param float $priority
     * @return Choice
     */
    public function setPriority($priority)
    {
        $this->priority = $priority;

        return $this;
    }

    /**
     * Get priority
     *
     * @return float
     */
    public function getPriority()
    {
        return $this->priority;
    }

    /**
     * @return Decision
     */
    public function getDecision()
    {
        return $this->decision;
    }

    /**
     * @param Decision $decision
     */
    public function setDecision($decision)
    {
        $this->decision = $decision;
    }

    /**
     * @return ArrayCollection
     */
    public function getActivities()
    {
        return $this->activities;
    }

    /**
     * @return int
     */
    public function getAdjustedPriority()
    {
        if ($this->adjustedPriority == null) {
            $this->adjustedPriority = $this->priority;

            foreach ($this->getActivities() as $activity) {
                $daysSince = $activity->getDate()->diff(new DateTime())->days;
                if ($daysSince > 28) {
                    continue;
                }

                $this->adjustedPriority *= 1 - (.6 * (28 - $daysSince) / 28);
            }
        }

        return $this->adjustedPriority;
    }

    /**
     * @SER\VirtualProperty()
     * @return int
     */
    public function getDecisionId()
    {
        return $this->getDecision()->getId();
    }
}

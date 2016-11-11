<?php

namespace AppBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Choice
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ChoiceRepository")
 */
class Choice
{
    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"decision"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255)
     * @Groups({"decision"})
     */
    private $name = '';

    /**
     * @var integer
     *
     * @ORM\Column(type="float")
     * @Groups({"decision"})
     */
    private $priority = 10;

    /**
     * @var Decision
     *
     * @ORM\ManyToOne(targetEntity="Decision", inversedBy="choices", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $decision;

    /**
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="Activity", mappedBy="choice", cascade={"persist", "remove"})
     */
    private $activities;

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
}

<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as SER;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Decision
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Repository\DecisionRepository")
 */
class Decision
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"decision"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="question", type="text")
     * @Groups({"decision"})
     */
    private $question;

    /**
     * @var string
     *
     * @ORM\Column(name="theme", type="string", length=20)
     * @Groups({"decision"})
     */
    private $theme = 'blue';

    /**
     * @var ArrayCollection|Choice[]
     * @ORM\OneToMany(targetEntity="Choice", mappedBy="decision", cascade={"persist", "remove"})
     * @Groups({"decision"})
     */
    private $choices;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="decisions")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @var Choice
     * @Groups({"decision"})
     */
    private $answer;

    public function __construct()
    {
        $this->question = "";
        $this->choices = new ArrayCollection();
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
     * Set question
     *
     * @param string $question
     * @return Decision
     */
    public function setQuestion($question)
    {
        $this->question = $question;

        return $this;
    }

    /**
     * Get question
     *
     * @return string 
     */
    public function getQuestion()
    {
        return $this->question;
    }

    /**
     * @return string
     */
    public function getTheme()
    {
        return $this->theme;
    }

    /**
     * @param string $theme
     */
    public function setTheme($theme)
    {
        $this->theme = $theme;
    }

    /**
     * @return ArrayCollection
     */
    public function getChoices()
    {
        return $this->choices;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return Choice
     */
    public function getAnswer()
    {
        return $this->answer;
    }

    /**
     * @param Choice|null $answer
     */
    public function setAnswer($answer)
    {
        $this->answer = $answer;
    }

    public function __toString()
    {
        return (string)$this->getId();
    }
}

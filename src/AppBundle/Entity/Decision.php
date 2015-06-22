<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as SER;

/**
 * Decision
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\DecisionRepository")
 * @SER\ExclusionPolicy("none")
 */
class Decision
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
     * @ORM\Column(name="question", type="text")
     */
    private $question;

    /**
     * @var string
     *
     * @ORM\Column(name="theme", type="string", length=20)
     */
    private $theme;

    /**
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="Choice", mappedBy="decision", cascade={"remove"})
     */
    private $choices;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * @SER\Exclude()
     */
    private $user;

    /**
     * @var Choice
     */
    private $answer;

    public function __construct()
    {
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
}

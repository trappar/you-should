<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class UserToken
 * @package AppBundle\Entity
 * @ORM\Entity()
 */
class UserToken
{
    const TYPE_CONFIRM_EMAIL = 'conf-email';

    /**
     * @var int
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="tokens")
     * @ORM\JoinColumn()
     */
    private $user;

    /**
     * @var string
     * @ORM\Column(type="string", length=20, nullable=false)
     */
    private $type;

    /**
     * @var \DateTime
     * @ORM\Column(type="datetime", nullable=false)
     */
    private $expiration;

    /**
     * @var string
     * @ORM\Column(type="string", length=64, nullable=false)
     */
    private $token;

    public function __construct()
    {
        $this->token = hash('sha256', uniqid('', true));
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return UserToken
     */
    public function setId(int $id): UserToken
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param User $user
     * @return UserToken
     */
    public function setUser(User $user): UserToken
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type
     * @return UserToken
     */
    public function setType(string $type): UserToken
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getExpiration(): \DateTime
    {
        return $this->expiration;
    }

    /**
     * @param \DateTime $expiration
     * @return UserToken
     */
    public function setExpiration(\DateTime $expiration): UserToken
    {
        $this->expiration = $expiration;

        return $this;
    }

    /**
     * @return string
     */
    public function getToken(): string
    {
        return $this->token;
    }
}
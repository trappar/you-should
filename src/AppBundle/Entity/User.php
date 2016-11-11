<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * User
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 * @UniqueEntity("username", message="This username is already taken.")
 * @UniqueEntity("email", message="This email is already taken.")
 */
class User implements UserInterface, \Serializable
{
    /**
     * @var int
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"user"})
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(type="string", length=25, unique=true)
     * @Groups({"user"})
     * @Assert\NotBlank(message="Username must not be blank.")
     * @Assert\Length(
     *     min=4,
     *     minMessage="Username must be at least 4 characters.",
     *     max=25,
     *     maxMessage="Username should be no more than 25 characters."
     * )
     */
    private $username;

    /**
     * @var string
     * @Assert\NotBlank(message="Password must not be blank.")
     * @Assert\Length(
     *     min=6,
     *     minMessage="Password must be at least 4 characters.",
     *     max=4096,
     *     maxMessage="Your password length is totally unnecessary. They all get hashed anyway you know..."
     * )
     */
    private $plainPassword;

    /**
     * @var string
     * @ORM\Column(type="string", length=64)
     */
    private $password;

    /**
     * @var string
     * @ORM\Column(type="string", length=100, unique=true)
     * @Groups({"user"})
     * @Assert\Email(message="Email is not valid.")
     * @Assert\NotBlank(message="Email must not be blank.")
     * @Assert\Length(max=100, maxMessage="Email must not be longer than 100 characters.")
     */
    private $email;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    private $emailConfirmed = false;

    /**
     * @var array
     * @ORM\Column(type="simple_array")
     */
    private $roles;

    /**
     * @var ArrayCollection|Decision[]
     * @ORM\OneToMany(targetEntity="Decision", mappedBy="user", cascade={"persist", "remove"})
     */
    private $decisions;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\UserToken", mappedBy="user", cascade={"persist", "remove"})
     */
    private $tokens;

    public function __construct()
    {
        $this->decisions = new ArrayCollection();
        $this->tokens    = new ArrayCollection();
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
     * @return User
     */
    public function setId(int $id): User
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param string $username
     * @return User
     */
    public function setUsername(string $username): User
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @return string
     */
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    /**
     * @param string $plainPassword
     * @return User
     */
    public function setPlainPassword(string $plainPassword): User
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @param string $password
     * @return User
     */
    public function setPassword(string $password): User
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return User
     */
    public function setEmail(string $email): User
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return boolean
     */
    public function isEmailConfirmed(): bool
    {
        return $this->emailConfirmed;
    }

    /**
     * @param boolean $emailConfirmed
     * @return User
     */
    public function setEmailConfirmed(bool $emailConfirmed): User
    {
        $this->emailConfirmed = $emailConfirmed;

        return $this;
    }

    /**
     * @return array
     */
    public function getRoles(): array
    {
        return $this->roles;
    }

    /**
     * @param array $roles
     * @return User
     */
    public function setRoles(array $roles): User
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @return ArrayCollection
     */
    public function getTokens(): ArrayCollection
    {
        return $this->tokens;
    }

    /**
     * @param ArrayCollection $tokens
     * @return User
     */
    public function setTokens(ArrayCollection $tokens): User
    {
        $this->tokens = $tokens;

        return $this;
    }

    /**
     * No salt is used, so this returns null
     *
     * @return null
     */
    public function getSalt()
    {
        return null;
    }

    /**
     * @return ArrayCollection
     */
    public function getDecisions()
    {
        return $this->decisions;
    }

    /**
     * Removes sensitive data from the user.
     */
    public function eraseCredentials()
    {
    }

    /** @see \Serializable::serialize() */
    public function serialize()
    {
        return serialize(array(
            $this->id,
            $this->username,
            $this->password,
        ));
    }

    /**
     * @see \Serializable::unserialize()
     * @param string $serialized
     */
    public function unserialize($serialized)
    {
        list (
            $this->id,
            $this->username,
            $this->password,
            ) = unserialize($serialized);
    }

    /**
     * @return int
     * @Groups({"user"})
     */
    public function getDecisionCount()
    {
        return $this->decisions->count();
    }
}
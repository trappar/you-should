<?php

namespace AppBundle\Service;

final class EntityChangerOptions
{
    /** @var array */
    private $changes;
    /** @var string */
    private $class;
    /** @var callable */
    private $findEntity;
    /** @var callable */
    private $modifyAdded;
    /** @var array */
    private $allowedProperties = [];

    public function __construct(array $changes, string $class)
    {
        $this->changes = $changes;
        $this->class   = $class;
    }

    public static function create(array $changes, string $class)
    {
        return new self($changes, $class);
    }

    /**
     * @return array
     */
    public function getChanges(): array
    {
        return $this->changes;
    }

    /**
     * @return string
     */
    public function getClass(): string
    {
        return $this->class;
    }

    /**
     * @return callable
     */
    public function getFindEntity(): callable
    {
        return $this->findEntity;
    }

    /**
     * @param callable $findEntity
     * @return EntityChangerOptions
     */
    public function setFindEntity(callable $findEntity): EntityChangerOptions
    {
        $this->findEntity = $findEntity;

        return $this;
    }

    /**
     * @return callable
     */
    public function getModifyAdded(): callable
    {
        return $this->modifyAdded;
    }

    /**
     * @param callable $modifyAdded
     * @return EntityChangerOptions
     */
    public function setModifyAdded(callable $modifyAdded): EntityChangerOptions
    {
        $this->modifyAdded = $modifyAdded;

        return $this;
    }

    /**
     * @return array
     */
    public function getAllowedProperties(): array
    {
        return $this->allowedProperties;
    }

    /**
     * @param array $allowedProperties
     * @return EntityChangerOptions
     */
    public function setAllowedProperties(array $allowedProperties): EntityChangerOptions
    {
        $this->allowedProperties = $allowedProperties;

        return $this;
    }
}
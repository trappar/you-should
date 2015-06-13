<?php

namespace AppBundle\Security\Authorization\Voter;

use AppBundle\Entity\Decision;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * DecisionVoter
 *
 * @DI\Service("security.access.decision_voter", public=false)
 * @DI\Tag("security.voter")
 */
class DecisionVoter implements VoterInterface
{
    const MANAGE = 'manage';

    /**
     * Checks if the voter supports the given attribute.
     *
     * @param string $attribute An attribute
     *
     * @return bool true if this Voter supports the attribute, false otherwise
     */
    public function supportsAttribute($attribute)
    {
        return $attribute === self::MANAGE;
    }

    /**
     * Checks if the voter supports the given class.
     *
     * @param string $class A class name
     *
     * @return bool true if this Voter can process the class
     */
    public function supportsClass($class)
    {
        return $class === 'AppBundle\Entity\Decision';
    }

    /**
     * Returns the vote for the given parameters.
     *
     * This method must return one of the following constants:
     * ACCESS_GRANTED, ACCESS_DENIED, or ACCESS_ABSTAIN.
     *
     * @param TokenInterface $token      A TokenInterface instance
     * @param Decision|null  $decision   The object to secure
     * @param array          $attributes An array of attributes associated with the method being invoked
     *
     * @return int either ACCESS_GRANTED, ACCESS_ABSTAIN, or ACCESS_DENIED
     */
    public function vote(TokenInterface $token, $decision, array $attributes)
    {
        if (!$this->supportsClass(get_class($decision))) {
            return VoterInterface::ACCESS_ABSTAIN;
        }

        $user = $token->getUser();

        if (!$user instanceof UserInterface) {
            return VoterInterface::ACCESS_DENIED;
        }

        $attribute = $attributes[0];
        if (count($attributes) !== 1 || $attribute !== self::MANAGE) {
            throw new \InvalidArgumentException(
                'Only the manage attribute is allowed'
            );
        }

        if ($decision->getUser() === $user) {
            return VoterInterface::ACCESS_GRANTED;
        } else {
            return VoterInterface::ACCESS_DENIED;
        }
    }
}
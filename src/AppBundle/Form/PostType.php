<?php

namespace AppBundle\Form;

use AppBundle\Entity\User;
use AppBundle\Repository\UserRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PostType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('subject')
            ->add('body')
            ->add('postedBy', EntityType::class, [
                'class' => 'AppBundle:User',
                'query_builder' => function(UserRepository $repo) {
                    return $repo->createQueryBuilder('user')
                        ->where('user.roles LIKE :role')
                        ->setParameter('role', 'ROLE_ADMIN');
                },
                'choice_label' => function(User $user) {
                    return $user->getUsername();
                }
            ]);
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Post'
        ));
    }
}

<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Entity\UserToken;
use AppBundle\Form\UserType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class SecurityController
 *
 * @Route(
 *   "/",
 *   defaults={"_format": "json"},
 *   requirements={
 *     "_format": "json|xml|yml"
 *   },
 *   options={"expose"=true}
 * )
 */
class SecurityController extends Controller
{
    /**
     * @Route(
     *   "/user/me.{_format}",
     *   name="security_user_current"
     * )
     * @Method({"GET"})
     * @param Request $request
     * @return Response
     */
    public function getCurrentUserAction(Request $request)
    {
        return new Response(
            $this->get('serializer')->serialize(
                $this->getUser(),
                $request->getRequestFormat(),
                ['groups' => ['user']]
            )
        );
    }

    /**
     * @Route("/user/register.{_format}")
     * @param Request $request
     * @return Response
     */
    public function registerAction(Request $request)
    {
        $user = new User();
        $user->setRoles(['ROLE_USER']);
        $form = $this->get('form.factory')->createNamed(null, UserType::class, $user);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em     = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $output = ['success' => 'Success! An email has been sent to your registered email address. Please follow the instructions listed there to complete your registration.'];
        } else {
            $errors = [];
            foreach ($form->getErrors(true, true) as $error) {
                $errors[] = $error->getMessage();
            }
            $output = ['error' => $errors];
        }

        return new Response($this->get('serializer')->serialize($output, 'json'));
    }

    /**
     * @Route("/user/confirm/{token}", name="security_user_confirm")
     * @param $token
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function confirmUserAction($token)
    {
        $em = $this->getDoctrine()->getManager();

        $userToken = $em->getRepository('AppBundle:UserToken')->findOneBy([
            'token' => $token,
            'type' => UserToken::TYPE_CONFIRM_EMAIL
        ]);
        if ($userToken) {
            if (new \DateTime() > $userToken->getExpiration()) {
                $this->addFlash('error', 'The link you clicked on has expired. Please use the link below to send yourself a new confirmation email with a fresh link.');
            } else {
                $user = $userToken->getUser();
                $user->setEmailConfirmed(true);
                $em->persist($user);
                $this->addFlash('success', 'Your email address has been confirmed!');
            }
            $em->remove($userToken);
            $em->flush();
        } else {
            $this->addFlash('error', 'The link you clicked on is not valid. This may happen if you already confirmed your email address. Try logging in to see if that\'s the case.');
        }

        return $this->redirect('/login');
    }
}
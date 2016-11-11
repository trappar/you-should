<?php

namespace AppBundle\Service;

use JMS\DiExtraBundle\Annotation as DI;
use Mailgun\Mailgun;

/**
 * Class Emailer
 * @package AppBundle\Service
 * @DI\Service("emailer")
 */
class Emailer
{
    /**
     * @var Mailgun
     */
    private $mailgun;
    /**
     * @var \Twig_Environment
     */
    private $twig;
    private $domain;

    /**
     * @param Mailgun           $mailgun
     * @param \Twig_Environment $twig
     * @param                   $domain
     * @DI\InjectParams({
     *     "mailgun" = @DI\Inject("mailgun"),
     *     "twig" = @DI\Inject("twig"),
     *     "domain" = @DI\Inject("%domain%"),
     * })
     */
    public function __construct(Mailgun $mailgun, \Twig_Environment $twig, $domain)
    {
        $this->mailgun = $mailgun;
        $this->twig = $twig;
        $this->domain = $domain;
    }

    public function send($to, $subject, $template, $params) {
        return $this->mailgun->sendMessage($this->domain, [
            'from'    => 'noreply@' . $this->domain,
            'to'      => $to,
            'subject' => $this->domain . ' - ' . $subject,
            'html'    => $this->twig->render($template, $params)
        ]);
    }
}
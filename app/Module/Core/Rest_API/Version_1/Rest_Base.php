<?php

namespace HelpGent\Module\Core\Rest_API\Version_1;

use HelpGent\Module\Core\Rest_API\Base;

abstract class Rest_Base extends Base {

    /**
     * @var string
     */
    public $namespace = HELPGENT_REST_BASE_PREFIX . '/v1';

}

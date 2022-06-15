<?php

namespace WPWaxCustomerSupportApp\Module\Core\Rest_API\Version_1;

use WPWaxCustomerSupportApp\Module\Core\Rest_API\Base;

abstract class Rest_Base extends Base {

    /**
     * @var string
     */
    public $namespace = WPWAX_CUSTOMER_SUPPORT_APP_REST_BASE_PREFIX . '/v1';

}

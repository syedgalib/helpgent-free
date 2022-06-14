<?php
/**
 * API Ref: https://gist.github.com/kowsar89/56e857d85ad0ceb595828fdb4a5a05e5
 *
 * @author  wpWax
 */

namespace WPWaxCustomerSupportApp\Module\Core\Rest_API\Version_1;

use WPWaxCustomerSupportApp\Module\Core\Rest_API\Base;

abstract class Rest_Base extends Base {

    /**
     * @var string
     */
    public $namespace = WPWAX_CUSTOMER_SUPPORT_APP_REST_BASE_PREFIX . '/v1';

}

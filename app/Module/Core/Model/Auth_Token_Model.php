<?php

namespace WPWaxCustomerSupportApp\Module\Core\Model;

use \WP_Error;
use WPWaxCustomerSupportApp\Model\DB_Model;
use WPWaxCustomerSupportApp\Base\Helper;

class Auth_Token_Model extends DB_Model {

    /**
     * Table Name
     *
     * @var string
     */
    public static $table = 'auth_tokens';


}


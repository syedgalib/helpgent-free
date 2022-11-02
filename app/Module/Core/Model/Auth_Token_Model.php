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


	/**
     * Get Items
     *
     * @param array $args
     * @return array
     */
    public static function get_items( $args = [] ) {
        global $wpdb;

		$table = self::get_table_name( self::$table );

        $default = [];

        $default['limit'] = 20;
        $default['page']  = 1;

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

		$pagination = '';

		if ( $args['limit'] > -1 ) {
			$limit      = $args['limit'];
			$offset     = ( $limit * $args['page'] ) - $limit;
			$pagination = " LIMIT $limit OFFSET $offset";
		}

		$table_field_map = [
			'email'      => 'token',
			'token'      => 'token',
			'expires_at' => 'token',
		];

		$where_query = ( ! empty( $args['where'] ) ) ? $args['where'] : [];

		$where = self::prepare_where_query_v2( $where_query, $table_field_map );

		$select = "SELECT * FROM $table as token";

		$query = $select . $where . $pagination;

		file_put_contents( WPWAX_CUSTOMER_SUPPORT_APP_BASE . '__log/token.sql', $query );

		return $wpdb->get_results( $query, ARRAY_A );

    }

    /**
     * Get Item
     *
     * @param int $email
     * @return array|WP_Error
     */
    public static function get_item( $email ) {
        global $wpdb;

        if ( empty( $email ) ) {
            $message = __( 'The email ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$table = self::get_table_name( self::$table );

		$query = $wpdb->prepare( "SELECT * FROM $table WHERE email = %s", array( $email ) );

		$result = $wpdb->get_row( $query, ARRAY_A );

        if ( empty( $result ) ) {
            $message = __( 'Could not find the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		return $result;
    }

    /**
     * Create Item
     *
     * @param array $args
     * @return array|WP_Error
     */
    public static function create_item( $args = [] ) {
        global $wpdb;

        $table = self::get_table_name( self::$table );

        $default = [
			'email'      => '',
			'token'      => '',
			'expires_at' => null,
		];

        $args = Helper\filter_params( $default, $args );

		if ( empty( $args['token'] ) ) {
			$message = __( 'Token is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		if ( empty( $args['email'] ) ) {
			$message = __( 'Email is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		if ( ! is_email( $args['email'] ) ) {
			$message = __( 'A valid email is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		$result = $wpdb->insert( $table, $args );

        if ( ! $result ) {
            $message = __( 'Could not create the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return self::get_item( $args['email'] );
    }

    /**
     * Update Item
     *
     * @param array $args
     * @return array|WP_Error
     */
    public static function update_item( $args = [] ) {
        global $wpdb;

        if ( empty( $args['email'] ) ) {
            $message = __( 'Email is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $email = $args['email'];

		$table    = self::get_table_name( self::$table );
		$old_data = self::get_item( $email );

        if ( is_wp_error( $old_data ) ) {
            $message = __( 'The resource not found.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $args = ( is_array( $args ) ) ? array_merge( $old_data, $args ) : $old_data;

        $where = [ 'email' => $email ];

        $result = $wpdb->update( $table, $args, $where, null, '%s' );

        if ( ! $result ) {
            $message = __( 'Could not update the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return self::get_item( $email );
    }

    /**
     * Delete Item
     *
     * @param int $id
     * @return bool
     */
    public static function delete_item( $email ) {
        global $wpdb;

        if ( empty( $email ) ) {
            $message = __( 'Email is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$table = self::get_table_name( self::$table );
		$where = ['email' => $email ];

		$status = $wpdb->delete( $table, $where, '%s' );

        if ( empty( $status ) ) {
            $message = __( 'Could not delete the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return ( ! empty( $status ) ) ? true : false;
    }

	/**
     * Create Token
     *
	 * @param string $email
     * @return string|WP_Error Token or WP_Error
     */
    public static function create_token( $email ) {

		if ( empty( $email ) ) {
            $message = __( 'Email is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		if ( ! is_email( $email ) ) {
			$message = __( 'A valid email is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		$user_exists = Helper\user_exists( $email );

		if ( is_wp_error( $user_exists ) ) {
			return $user_exists;
		}

		if ( ! $user_exists ) {
			$message = __( 'You must be a registered user to create the token.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		// Create new token
		$token = self::generate_token();

		$existing_token = self::get_items([
			'limit' => 1,
			'where' => [
				'token' => $token,
			]
		]);

		if ( ! empty( $existing_token ) ) {
			$message = __( 'Something went wrong, please try again.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		// Delete old token
		self::delete_item( $email );
		$expires_at = self::get_expiry_date();

		$status = self::create_item([
			'token'      => $token,
			'email'      => $email,
			'expires_at' => helpgent_get_duration_date( HELPGENT_AUTH_TOKEN_EXPIRES_AFTER_DAYS ),
		]);

		if ( is_wp_error( $status ) ) {
			return $status;
		}

		/**
		 * Fiers after successfully generate a token
		 */
		do_action( 'helpgent_guest_token_created', $status );

		return $status;
	}

	/**
	 * Validate Token
	 *
	 * @param string $email
	 * @param string $token
	 *
	 * @return bool Status
	 */
	public static function has_valid_token( $email, $token ) {

		$token_data = self::get_item( $email );

		if ( is_wp_error( $token_data ) ) {
			return false;
		}

		$auth_token = $token_data['token'];

		if ( $auth_token !== $token ) {
			return false;
		}

		$expires_at = $token_data['expires_at'];

		if ( empty( $expires_at ) ) {
			return true;
		}

		$now = current_time( 'mysql', true );

		if ( $expires_at > $now ) {
			return true;
		}

		return false;

	}

	/**
	 * Get User Email By Token
	 *
	 * @param string $token
	 */
	public static function get_user_email_by_token( $token = '' ) {

		$existing_token = self::get_items([
			'limit' => 1,
			'where' => [
				'token' => $token,
			]
		]);

		if ( empty( $existing_token ) ) {
			return false;
		}


		return $existing_token[0]['email'];
	}

	/**
     * Generate Token
     *
     * @return string Token
     */
    public static function generate_token() {
		$time   = microtime();
		$time   = str_replace( array( ' ', '.' ), '', $time );
		$chars  = substr( str_shuffle( 'abcdefghijklmnopqrstuvwxyz' ), 1, 10 );
		$random = $chars . $time;
		$token  = str_shuffle( $random );

		return $token;
	}

}


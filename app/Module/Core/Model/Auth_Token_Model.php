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

		$limit  = $args['limit'];
		$offset = ( $limit * $args['page'] ) - $limit;

		$where = ' WHERE 1=1';

		$select = "SELECT * FROM $table";

		$query = $select . $where . " LIMIT $limit OFFSET $offset";

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

		// Delete old token
		self::delete_item( $email );

		// Create new token
		$token      = self::generate_token();
		$expires_at = self::get_expiry_date();

		$status = self::create_item([
			'token'      => $token,
			'email'      => $email,
			'expires_at' => $expires_at,
		]);

		if ( is_wp_error( $status ) ) {
			return $status;
		}

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

	/**
	 * Get expiry date
	 *
	 * @return string Expiry Date
	 */
	public static function get_expiry_date() {
		$now     = current_time( 'mysql', true );
		$days    = apply_filters( 'helpgent_auth_token_expires_after_days', 7 );
		$hour    = $days * 24;
		$minutes = $hour * 60;
		$seconds = $minutes * 60;

		$expiry = date( 'Y-m-d H:i:s', strtotime( $now ) + $seconds );
		$expiry = apply_filters( 'helpgent_auth_token_expiry_date', $expiry );

		return $expiry;

	}

}


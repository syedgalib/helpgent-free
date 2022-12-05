<?php

namespace HelpGent\Module\Core\Rest_API\Version_1;

use \WP_REST_Server;
use \WP_Error;
use \WP_REST_Response;
use HelpGent\Module\Core\Rest_API\Rest_Helper;
use HelpGent\Base\Helper;


class Licensing extends Rest_Base {

    /**
     * Rest Base
     *
     * @var string
     */
    public $rest_base = 'license';

    public function register_routes() {

        register_rest_route( $this->namespace, '/' . $this->rest_base, array(
			
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'create_item' ),
				'permission_callback' => array( $this, 'create_item_permissions_check' ),
				'args'                => array_merge( $this->get_endpoint_args_for_item_schema( WP_REST_Server::CREATABLE ), array(
					'license' => array(
						'description' => __( 'License key is required.', 'helpgent' ),
						'required' => true,
						'type'     => 'string',
					),
					'action' => array(
						'description' => __( 'License action is required.', 'helpgent' ),
						'required' => true,
						'type'     => 'string',
						'enum'     => [ 'activate', 'deactivate' ],
					),
				) ),
			),
			'schema' => array( $this, 'get_public_item_schema' ),
		) );

    }

	/**
	 * Create a single user.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function create_item( $request ) {


		$license = $request['license'];
		$action  = $request['action'];

		// data to send in our API request
		$api_params = array(
			'edd_action' => $action . '_license',
			'license' => $license,
			'item_id' => HELPGENT_DOWNLOAD_ID, // The ID of the item in EDD
			'url' => home_url()
		);

		// Call the custom API.
		$response = wp_remote_post( HELPGENT_AUTHOR_URL, array('timeout' => 15, 'sslverify' => false, 'body' => $api_params));

		$response_code = wp_remote_retrieve_response_code( $response );
		// make sure the response came back okay
		if ( is_wp_error($response) || 200 !== $response_code ) {

			return new WP_Error( 'helpgent_license_error', __('Something went wrong, please try again.', 'helpgent'), $response_code );

		} 
		
		$license_data = json_decode(wp_remote_retrieve_body($response));

		if ( ! $license_data ) {

			return new WP_Error( 'helpgent_license_data_not_found', __('License data not found.', 'helpgent'), $response_code );

		}

		if( false === $license_data->success ) {

			switch ($license_data->error) {
				case 'expired' :

					return new WP_Error( 'helpgent_license_expired',  __('License expired.', 'helpgent'), $response_code );

				case 'revoked' :
					
					return new WP_Error( 'helpgent_license_revoked', __('License revoked.', 'helpgent'), $response_code );

				case 'missing' :

					return new WP_Error( 'helpgent_invalid_license', __('License is not valid.', 'helpgent'), $response_code );

				case 'invalid' :
				case 'site_inactive' :

					return new WP_Error( 'helpgent_license_remote_not_found', __('License remote not found.', 'helpgent'), $response_code );

				case 'item_name_mismatch' :

					return new WP_Error( 'helpgent_license_dismatch', __('License dismatch.', 'helpgent'), $response_code );

				case 'no_activations_left':

					return new WP_Error( 'helpgent_license_limit_exceeded', __('License limit exceeded.', 'helpgent'), $response_code );

				default :

				return new WP_Error( 'helpgent_license_error', __('Something went wrong, please try again.', 'helpgent'), $response_code );

			}
		
		}
	

		$response = [
			'success' 	=> true,
			'data' 		=> $license_data,
			'message' 	=> __( 'License activation successfull', 'helpgent' ),
		];

		Helper\update_option( 'helpgent_license', $license );
		Helper\update_option( 'helpgent_license_activated', 1 );

		if( $action === 'deactivate') {
			$response['message'] = __( 'License deactivation successfull', 'helpgent' );
			Helper\update_option( 'helpgent_license_activated', '' );
		}

		$response = rest_ensure_response( $response );
		$response->set_status( 201 );
		$response->header( 'Location', rest_url( sprintf( '/%s/%s/%d', $this->namespace, $this->rest_base, [] ) ) );

		return $response;
	}


	/**
	 * Check if a given request has access to create a user.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|boolean
	 */
	public function create_item_permissions_check( $request ) {
	
		if ( ! current_user_can( 'manage_options' )) {
			return new WP_Error( 'helpgent_rest_cannot_create', __( 'Sorry, you are not allowed to modify lincense.', 'helpgent' ), array( 'status' => rest_authorization_required_code() ) );
		}

		return true;
	}

}

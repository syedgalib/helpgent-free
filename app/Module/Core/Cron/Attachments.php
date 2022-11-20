<?php

namespace HelpGent\Module\Core\Cron;

use HelpGent\Module\Core\Model\Attachment_Model;
use HelpGent\Base\Helper;

class Attachments {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_action( 'helpgent_daily_cron', [ $this, 'manage' ] );

    }

	/**
	 * Delete all the expired attachments
	 *
	 * @return void
	 */
    public function manage() {

		$auto_delete_after = (int) Helper\get_option( 'attatchmentDeletionAfter' );

		if( $auto_delete_after <= 0 ) {
			return;
		}

		$date 	= "-{$auto_delete_after} days";
		$value 	= "'" . date('Y-m-d H:i:s', strtotime( $date ) ) . "'";

		$args['where'] = [
			'created_at' => [
				'field' 	=> 'created_at',
				'value'		=> $value,
				'compare'	=> '<',
			],
		];

		$expired = Attachment_Model::get_items( $args );
		
		if( ! empty( $expired ) ) {
			foreach( $expired as $attachment ) {
				Attachment_Model::delete_item( $attachment['id'] );
				/**
				 * Fires after deleted an attachment
				 * @param array $attachment
				 */
				do_action( 'helpgent_attachment_deleteded', $attachment );
			}
		}
	}


}
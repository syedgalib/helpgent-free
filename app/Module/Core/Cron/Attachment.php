<?php

namespace HelpGent\Module\Core\Cron;

use HelpGent\Module\Core\Model\Attachment_Model;
use HelpGent\Base\Helper;

class Attachment {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_action( 'helpgent_hourly_cron', [ $this, 'manage_attachments' ] );

    }



	/**
	 * Clean/Delete expired attachments
	 *
	 * @return void
	 */

	public function manage_attachments() {
		$this->delete_attachments();

	}

	/**
	 * Delete all the expired attachments
	 *
	 * @return void
	 */
    public function delete_attachments() {

		$auto_delete_after = Helper\get_option( 'hgAttatchmentDeletionAfter', 45 );
		$date 	= "-$auto_delete_after days";
		$value 	= "'" . date('Y-m-d H:i:s', strtotime( $date ) ) . "'";

		$args['where'] = [
			'created_on' => [
				'field' 	=> 'created_on',
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
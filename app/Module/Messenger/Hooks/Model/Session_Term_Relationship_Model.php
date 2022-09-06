<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Hooks\Model;

use WPWaxCustomerSupportApp\Module\Messenger\Model\Session_Term_Relationship_Model as ModelSession_Term_Relationship_Model;

class Session_Term_Relationship_Model {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_filter( 'wpwax_cs_after_term_deleted', [ $this, 'remove_session_term_relationship' ], 20, 1 );
    }

    /**
     * Remove Session Term Relationship
     *
	 * @param int
     * @return void
     */
    public function remove_session_term_relationship( $term_id = 0 ) {
		ModelSession_Term_Relationship_Model::delete_item_where([ 'term_taxonomy_id' => $term_id  ]);
    }

}
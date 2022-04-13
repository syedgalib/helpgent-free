<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm;

class Post_type {

	public function __construct() {
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action( 'init', array( $this, 'register_taxonomy_form' ) );
		add_action( 'init', array( $this, 'register_taxonomy_tag' ) );
	}

	public function register_post_type() {
		$args = array(
			'label'                 => __( 'Video Message', 'wpwaxvm' ),
			'supports'              => array( 'title', 'page-attributes' ),
			'hierarchical'          => false,
			'public'                => false,
			'show_ui'               => true, // false
			'show_in_menu'          => true, // false
			'show_in_admin_bar'     => false,
			'show_in_nav_menus'     => false,
			'can_export'            => false,
			'has_archive'           => false,
			'exclude_from_search'   => true,
			'publicly_queryable'    => false, // maybe
			'capability_type'       => 'page',
		);
		register_post_type( 'video_message', $args );
	}

	function register_taxonomy_form() {

		$labels = array(
			'name'                       => _x( 'Forms', 'Taxonomy General Name', 'wpwaxvm' ),
			'singular_name'              => _x( 'Form', 'Taxonomy Singular Name', 'wpwaxvm' ),
			'menu_name'                  => __( 'Forms', 'wpwaxvm' ),
		);

		$args = array(
			'labels'                     => $labels,
			'hierarchical'               => false,
			'public'                     => true, // false
			'show_ui'                    => true, // false
			'show_admin_column'          => false,
			'show_in_nav_menus'          => false,
			'show_tagcloud'              => false,
			'show_in_rest'               => false,
		);

		register_taxonomy( 'vm_form', array( 'video_message' ), $args );
	}

	function register_taxonomy_tag() {

		$labels = array(
			'name'                       => _x( 'Tags', 'Taxonomy General Name', 'wpwaxvm' ),
			'singular_name'              => _x( 'Tag', 'Taxonomy Singular Name', 'wpwaxvm' ),
			'menu_name'                  => __( 'Tags', 'wpwaxvm' ),
			'all_items'                  => __( 'All Items', 'wpwaxvm' ),
			'parent_item'                => __( 'Parent Item', 'wpwaxvm' ),
			'parent_item_colon'          => __( 'Parent Item:', 'wpwaxvm' ),
			'new_item_name'              => __( 'New Item Name', 'wpwaxvm' ),
			'add_new_item'               => __( 'Add New Item', 'wpwaxvm' ),
			'edit_item'                  => __( 'Edit Item', 'wpwaxvm' ),
			'update_item'                => __( 'Update Item', 'wpwaxvm' ),
			'view_item'                  => __( 'View Item', 'wpwaxvm' ),
			'separate_items_with_commas' => __( 'Separate items with commas', 'wpwaxvm' ),
			'add_or_remove_items'        => __( 'Add or remove items', 'wpwaxvm' ),
			'choose_from_most_used'      => __( 'Choose from the most used', 'wpwaxvm' ),
			'popular_items'              => __( 'Popular Items', 'wpwaxvm' ),
			'search_items'               => __( 'Search Items', 'wpwaxvm' ),
			'not_found'                  => __( 'Not Found', 'wpwaxvm' ),
			'no_terms'                   => __( 'No items', 'wpwaxvm' ),
			'items_list'                 => __( 'Items list', 'wpwaxvm' ),
			'items_list_navigation'      => __( 'Items list navigation', 'wpwaxvm' ),
		);
		$args = array(
			'labels'                     => $labels,
			'hierarchical'               => false,
			'public'                     => true,
			'show_ui'                    => true,
			'show_admin_column'          => false,
			'show_in_nav_menus'          => false,
			'show_tagcloud'              => false,
			'show_in_rest'               => false,
		);

		register_taxonomy( 'vm_tag', array( 'video_message' ), $args );
	}
}
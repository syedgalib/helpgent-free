<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm\db;

trait Forms_Trait {

	public static function get_forms( $page = 1 ) {
		global $wpdb;

		$table  = self::get_table( 'forms' );
		$limit  = 20;
		$offset = ( $limit * $page ) - $limit;

		$query = $wpdb->prepare( "SELECT form_id, name FROM $table LIMIT %d OFFSET %d", array( $limit, $offset ) );

		return $wpdb->get_results( $query );
	}

	public static function get_form( $form_id ) {
		global $wpdb;

		$table = self::get_table( 'forms' );

		$query = $wpdb->prepare( "SELECT * FROM $table WHERE form_id = %d", array( $form_id ) );

		$result = $wpdb->get_row( $query, ARRAY_A );

		if ( ! empty( $result['options'] ) ) {
			$result['options'] = maybe_unserialize( $result['options'] );
		}

		return $result;
	}

	public static function create_form( $args ) {
		global $wpdb;

		$table = self::get_table( 'forms' );

		$options = json_decode( $args['options'], true );
		$options = maybe_serialize( $options );

		$data  = array(
			'name'    => $args['name'],
			'options' => $options,
		);

		$result = $wpdb->insert( $table, $data );

		return $result ? $wpdb->insert_id : false;
	}

	public static function update_form( $args ) {
		global $wpdb;

		$table = self::get_table( 'forms' );
		$where = array(
			'form_id' => $args['form_id'],
		);

		$options = json_decode( $args['options'], true );
		$options = $options ? maybe_serialize( $options ) : '';

		$data = array(
			'name'    => $args['name'],
			'options' => $options,
		);
		$data = array_filter( $data );

		return $wpdb->update( $table, $data, $where, null, '%d' );
	}

	public static function delete_form( $form_id ) {
		global $wpdb;

		$table = self::get_table( 'forms' );
		$where = array(
			'form_id' => $form_id,
		);

		return $wpdb->delete( $table, $where, '%d' );
	}
}

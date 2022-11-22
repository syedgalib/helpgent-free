<?php

namespace HelpGent\Base\Helper;

use WP_Error;
use WP_Query;
use WP_User;
use HelpGent\Module\Core\Model\Auth_Token_Model;
use HelpGent\Module\Core\Model\Guest_User_Model;
use HelpGent\Module\Core\Model\Term_Model;
use HelpGent\Module\Messenger\Model\Conversation_Model;

/**
 * Get The Public Template
 *
 * @param string $path
 * @param array $data
 * @param bool $extract
 *
 * @return string Public Template
 */
function get_template($path = '', $data = [], $extract = true)
{

	ob_start();

	get_the_template($path, $data, $extract);

	return ob_get_clean();
}

/**
 * Prints The Public Template
 *
 * @param string $path
 * @param array $data
 * @param bool $extract
 *
 * @return void Prints Public Template
 */
function get_the_template($path = '', $data = [], $extract = true)
{

	$file_path = HELPGENT_TEMPLATE_PATH . $path;

	get_the_file_content($file_path, $data, $extract);
}


/**
 * Get The Admin Template
 *
 * @param string $path
 * @param array $data
 * @param bool $extract
 *
 * @return string Admin Template
 */
function get_view($path = '', $data = [], $extract = true)
{

	ob_start();

	get_the_view($path, $data, $extract);

	return ob_get_clean();
}

/**
 * Prints The Admin Template
 *
 * @param string $path
 * @param array $data
 * @param bool $extract
 *
 * @return void Prints Admin Template
 */
function get_the_view($path = '', $data = [], $extract = true)
{

	$file_path = HELPGENT_VIEW_PATH . $path;

	get_the_file_content($file_path, $data, $extract);
}

/**
 * Prints The File Content
 *
 * @param string $path
 * @param array $data
 * @param bool $extract
 *
 * @return void Prints the file contents
 */
function get_the_file_content($path = '', $data = [], $extract = true)
{

	$file = $path . '.php';

	if (!file_exists($file)) {
		return;
	}

	if ($extract) {
		extract($data);
	}

	include $file;
}

/**
 * Handle Upload
 *
 * @return mixed
 */
function handle_media_upload( $file, $overrides = array( 'test_form' => false ) )
{
	include_media_uploader_files();

	add_filter( 'upload_dir', 'wpwax_vm_change_upload_directory' );

	$time = current_time('mysql');
	$file = wp_handle_upload( $file, $overrides, $time );

	remove_filter( 'upload_dir', 'wpwax_vm_change_upload_directory' );

	return $file;
}


/**
 * Filter Params
 *
 * @param array $default
 * @param array $args
 *
 * @return array Merged Params
 */
function filter_params( $default = [], $args = [] )
{
	foreach ( $args as $key => $value ) {
		if ( ! in_array( $key, array_keys( $default ) ) ) {
			unset( $args[ $key ] );
		}
	}

	return $args;
}

/**
 * Exclude Params
 *
 * @param array $exclude
 * @param array $args
 *
 * @return array Merged Params
 */
function exclude_params( $exclude = [], $args = [] )
{
	foreach ( $args as $key => $value ) {
		if ( in_array( $key, array_keys( $exclude ) ) ) {
			unset( $args[ $key ] );
		}
	}

	return $args;
}

/**
 * Merge Params
 *
 * @param array $default
 * @param array $args
 *
 * @return array Merged Params
 */
function merge_params( $default = [], $args = [] )
{

	foreach ( $default as $default_key => $value ) {

		if ( is_null( $value ) && ! in_array( $default_key, array_keys( $args ) ) ) {
			unset( $default[ $default_key ] );
			continue;
		}

		if ( ! in_array( $default_key, array_keys( $args ) ) ) {
			continue;
		}

		$default[ $default_key ] = $args[ $default_key ];
	}

	return $default;
}

/**
 * Is Truthy
 *
 * @param mixed $value
 * @return bool
 */
function is_truthy($value)
{

	if (true === $value) {
		return true;
	}

	if ('true' === strtolower($value)) {
		return true;
	}

	if (1 === $value) {
		return true;
	}

	if ('1' === $value) {
		return true;
	}

	return false;
}

/**
 * List has same data
 *
 * @param array $list_a
 * @param array $list_b
 *
 * @return bool
 */
function list_has_same_data($list_a = [], $list_b = [])
{

	if (!is_array($list_a) || !is_array($list_b)) {
		return false;
	}

	if (count($list_a) < count($list_b)) {
		$smaller_list = $list_a;
		$larger_list  = $list_b;
	} else {
		$smaller_list = $list_b;
		$larger_list  = $list_a;
	}

	foreach ($smaller_list as $key => $value) {

		if (!isset($larger_list[$key])) {
			continue;
		}

		if ((string) $value !== (string) $larger_list[$key]) {
			return false;
		}
	}

	return true;
}

/**
 * Swap array keys
 *
 * @param array $list
 * @param array $swap_map
 *
 * @return array Swaped Array
 */
function swap_array_keys($list = [], $swap_map = [])
{

	if (!is_array($list) && !is_array($swap_map)) {
		return $list;
	}

	foreach ($list as $key => $value) {

		if (empty($swap_map[$key])) {
			continue;
		}

		unset($list[$key]);

		$swap_key = $swap_map[$key];
		$list[$swap_key] = $value;
	}

	return $list;
}

/**
 * Convert string to int array
 *
 * @param string $string
 * @param string $separator ,
 * @param string $remove_non_int_items true
 *
 * @return array
 */
function convert_string_to_int_array( $string, $separator = ',', $remove_non_int_items = true )
{
	$list = convert_string_to_array( $string, $separator );
	$list = parse_array_items_to_int( $list, $remove_non_int_items );

	return $list;
}

/**
 * Format as SQL date time
 *
 * @param string $date
 * @return string $date_time
 */
function format_as_sql_date_time($date = '')
{

	if (empty($date)) {
		return $date;
	}

	$is_sql_date      = !empty(preg_match("/^\d{4}-\d{2}-\d{2}$/", $date));
	$date             = ($is_sql_date) ? $date . ' 00:00:00' : $date;
	$is_sql_date_time = !empty(preg_match("/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/", $date));

	if (!$is_sql_date_time) {
		return '';
	}

	return $date;
}

/**
 * Format SQL date time as Array
 *
 * @param string $date_time
 * @return string $date_time
 */
function format_sql_date_time_as_array($date_time = '')
{
	$sql_date = format_as_sql_date_time($date_time);

	if (empty($sql_date)) {
		return [];
	}

	$date_time_array = [
		'day'    => '',
		'month'  => '',
		'year'   => '',
		'hour'   => '',
		'minute' => '',
		'second' => '',
	];

	if (empty($date_time)) {
		return [];
	}

	$date_time = explode(' ', $date_time);

	$date = explode('-', $date_time[0]);
	$time = explode(':', $date_time[1]);


	$date_time_array['day']  = $date[2];
	$date_time_array['month'] = $date[1];
	$date_time_array['year']  = $date[0];

	$date_time_array['hour']   = $time[0];
	$date_time_array['minute'] = $time[1];
	$date_time_array['second'] = $time[2];

	return $date_time_array;
}

/**
 * Convert string to array
 *
 * @param string $string
 * @param string $separator ,
 *
 * @return array
 */
function convert_string_to_array( $string, $separator = ',' )
{
	$string = trim( $string, ',\s' );
	$list   = explode( $separator, $string );

	if ( ! is_array( $list ) ) {
		return [];
	}

	return $list;
}

/**
 * Parse array items to int
 *
 * @param array $list
 *
 * @return array
 */
function parse_array_items_to_int( $list = [], $remove_non_int_items = true ) {
	if ( ! is_array( $list ) ) {
		return $list;
	}

	foreach ( $list as $key => $value ) {
		if ( is_numeric( $value ) ) {
			$list[$key] = (int) $value;
		}

		if ( ! is_numeric( $value ) && $remove_non_int_items ) {
			unset( $list[ $key ] );
		}
	}

	return array_values( $list );
}

/**
 * Generate Slug
 *
 * @param string $string
 *
 * @return string Slug
 */
function generate_slug($string)
{

	$slug = trim($string);
	$slug = sanitize_key($slug);
	$slug = strtolower($string);
	$slug = preg_replace('/\s{2,}/', ' ', $slug);
	$slug = preg_replace('/\s/', '-', $slug);

	return $slug;
}

/**
 * Delete File by URL
 *
 * @param string $file_url
 * @return bool
 */
function delete_file_by_url($file_url)
{
	$regex = '/wp-content.+/';

	$match = [];
	preg_match($regex, $file_url, $match);

	$file_path = (!empty($match)) ? $match[0] : '';

	$upload_dir = wp_upload_dir();
	$file_src   = preg_replace($regex, $file_path, $upload_dir['basedir']);

	if (file_exists($file_src)) {
		wp_delete_file($file_src);

		return true;
	}

	return false;
}

/**
 * Include Media Uploader Files
 *
 * @return void
 */
function include_media_uploader_files()
{

	require_once(ABSPATH . "wp-admin" . '/includes/image.php');
	require_once(ABSPATH . "wp-admin" . '/includes/file.php');
	require_once(ABSPATH . "wp-admin" . '/includes/media.php');
}


/**
 * Timezone - helper to retrieve the timezone string for a site until.
 * a WP core method exists (see https://core.trac.wordpress.org/ticket/24730).
 *
 * Adapted from https://secure.php.net/manual/en/function.timezone-name-from-abbr.php#89155.
 *
 * Copied from wc_timezone_string
 *
 * @return string PHP timezone string for the site
 */
function timezone_string()
{
	// Added in WordPress 5.3 Ref https://developer.wordpress.org/reference/functions/wp_timezone_string/.
	if (function_exists('wp_timezone_string')) {
		return wp_timezone_string();
	}

	// If site timezone string exists, return it.
	$timezone = get_option('timezone_string');
	if ($timezone) {
		return $timezone;
	}

	// Get UTC offset, if it isn't set then return UTC.
	$utc_offset = floatval(get_option('gmt_offset', 0));
	if (!is_numeric($utc_offset) || 0.0 === $utc_offset) {
		return 'UTC';
	}

	// Adjust UTC offset from hours to seconds.
	$utc_offset = (int) ($utc_offset * 3600);

	// Attempt to guess the timezone string from the UTC offset.
	$timezone = timezone_name_from_abbr('', $utc_offset);
	if ($timezone) {
		return $timezone;
	}

	// Last try, guess timezone string manually.
	foreach (timezone_abbreviations_list() as $abbr) {
		foreach ($abbr as $city) {
			// WordPress restrict the use of date(), since it's affected by timezone settings, but in this case is just what we need to guess the correct timezone.
			if ((bool) date('I') === (bool) $city['dst'] && $city['timezone_id'] && intval($city['offset']) === $utc_offset) { // phpcs:ignore WordPress.DateTime.RestrictedFunctions.date_date
				return $city['timezone_id'];
			}
		}
	}

	// Fallback to UTC.
	return 'UTC';
}


/*
 * Clean variables using sanitize_text_field. Arrays are cleaned recursively.
 * Non-scalar values are ignored.
 *
 * @param string|array $var Data to sanitize.
 * @return string|array
 */
function clean_var($var)
{
	if (is_array($var)) {
		return array_map('clean_var', $var);
	} else {
		return is_scalar($var) ? sanitize_text_field($var) : $var;
	}
}

/**
 * Sanitize List Items
 *
 * @param array $list
 * @param array $schema
 *
 * @return array Sanitized List
 */
function sanitize_list_items( $list = [], $schema = [], $args = [] )
{
	$default_schema = [];

	$default_schema['string']     = [];
	$default_schema['integer']    = ['id'];
	$default_schema['serialized'] = [];
	$default_schema['datetime']   = ['created_on', 'updated_on'];
	$default_schema['boolean']    = [];
	$default_schema['json']       = [];

	$schema = merge_params($default_schema, $schema);

	// Sanitize Fields
	foreach ($list as $key => $value) {

		// Sanitize String Fields
		if (in_array($key, $schema['string'])) {
			$list[$key] = (!empty($list[$key]) && is_string($list[$key])) ? sanitize_text_field($list[$key]) : null;
		}

		// Sanitize Integer Fields
		else if (in_array($key, $schema['integer'])) {
			$list[$key] = (!empty($list[$key]) && is_numeric($list[$key])) ? intval($list[$key]) : null;
			$list[$key] = (!empty($list[$key]) && is_numeric($list[$key])) ? intval($list[$key]) : null;
		}

		// Sanitize Boolean Fields
		else if (in_array($key, $schema['boolean'])) {
			$list[$key] = (!empty($list[$key]) && is_truthy($list[$key])) ? true : false;
		}

		// Sanitize Serialized Fields
		else if (in_array($key, $schema['serialized'])) {
			$list[$key] = (!empty($list[$key])) ? maybe_unserialize($value) : null;
		}

		// Sanitize JSON Fields
		else if (in_array($key, $schema['json'])) {
			$json_data    = json_decode($list[$key], true);
			$list[$key] = (!empty($list[$key]) && $json_data) ? $json_data : null;
		}

		// Sanitize Date Fields
		else if (in_array($key, $schema['datetime'])) {
			$formatted_key = $key . '_formatted';
			$timezone      = ( ! empty( $args['timezone'] ) ) ? $args['timezone'] : null;

			$list[ $formatted_key ] = ( ! empty( $list[ $key ] ) ) ? get_formatted_time( $list[ $key ], $timezone ) : null;
			$list[ $key ]           = ( ! empty( $list[ $key ] ) ) ? get_formatted_time( $list[ $key ], $timezone, HELPGENT_DB_DATE_TIME_FORMAT ) : null;
		}
	}

	return $list;
}

/**
 * Get Formatted Time
 *
 * @param $time
 * @param $timezone
 */
function get_formatted_time( $time, $timezone, $format = 'j M, y @g:i a' )
{
	$timezone_txt = $timezone ? sanitize_timezone_string( $timezone ) : wp_timezone_string();
	$timezone     = new \DateTimeZone( $timezone_txt );
	$timestamp    = strtotime( $time );

	$formatted_time = wp_date( $format, $timestamp, $timezone );

	return $formatted_time;
}

/**
 * Convert local time to DB timezone
 *
 * @param $time
 * @param $timezone
 */
function convert_to_db_timezone( $time, $local_timezone )
{
	$local_timezone = sanitize_timezone_string( $local_timezone );
	$db_timezone    = $local_timezone;

	if ( '+' === $local_timezone[0] ) {
		$db_timezone = str_replace( '+', '-', $local_timezone );
	} else if ( '-' === $local_timezone[0] ) {
		$db_timezone = str_replace( '-', '+', $local_timezone );
	}

	$timezone_txt = $db_timezone;
	$timezone     = new \DateTimeZone( $timezone_txt );
	$timestamp    = strtotime( $time );

	$formatted_time = wp_date( HELPGENT_DB_DATE_TIME_FORMAT, $timestamp, $timezone );

	return $formatted_time;
}

/**
 * Get WP Pages
 *
 * @return array Pages
 */
function get_wp_pages()
{
	$homepage = [ [ 'id' => 0, 'title' => __( 'Homepage', 'helpgent' ), ] ];

	$query = new WP_Query([
		'post_type'      => 'page',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'fields'         => 'ids',
	]);

	if ( ! $query->have_posts() ) {
		return $homepage;
	}

	$pages = [];

	foreach ( $query->posts as $id ) {
		$pages[] = [
			'id'    => $id,
			'title' => get_the_title( $id ),
		];
	}

	return array_merge( $homepage, $pages );
}

/**
 * Get Options
 *
 * @return array Options
 */
function get_options()
{
	return \get_option(HELPGENT_OPTIONS, []);
}

/**
 * Get Option
 *
 * @param string $option_key
 * @param mixed $default
 *
 * @return mixed Option
 */
function get_option( $option_key = '', $default = '' ) {
	$options = get_options();

	if ( ! isset( $options[ $option_key ] ) || '' === $options[ $option_key ] ) {
		return $default;
	}

	return $options[ $option_key ];
}

/**
 * Sets or Update Option
 *
 * @param string $option_key
 * @param mixed $value
 *
 * @return void
 */
function update_option($option_key = '', $value = '')
{
	$options = get_options();

	$options[$option_key] = $value;

	\update_option(HELPGENT_OPTIONS, $options);
}

/**
 * Sets or Update Options
 *
 * @param array $options
 * @return array $options
 */
function update_options($new_options = [])
{
	$old_options = get_options();

	$options = array_merge($old_options, $new_options);

	\update_option(HELPGENT_OPTIONS, $options);

	return $options;
}

/**
 * Sets or Update Option
 *
 * @return void
 */
function delete_option($option_key = '')
{
	$options = get_options();

	if (!isset($options[$option_key])) {
		return;
	}

	unset($options[$option_key]);

	\update_option(HELPGENT_OPTIONS, $options);
}

/**
 * Sets or Update Option
 *
 * @param array $deleting_options
 * @return array $options
 */
function delete_options($option_keys = [])
{
	$options = get_options();

	if (empty($options)) {
		return;
	}

	foreach ($option_keys as $key) {

		if (!isset($options[$key])) {
			continue;
		}

		unset($options[$key]);
	}

	\update_option(HELPGENT_OPTIONS, $options);

	return $options;
}


/**
 * Get Admin User
 *
 * @return array|null
 */
function get_admin_user()
{
	$admin_user = new \WP_User_Query([
		'role__in' => get_admin_roles()
	]);

	if (is_wp_error($admin_user)) {
		return [];
	}

	if (empty($admin_user->results)) {
		return [];
	}

	$admin_user = $admin_user->results[0];

	return prepare_user_data($admin_user);
}

/**
 * Get Default Admin User
 *
 * @return array|null
 */
function get_default_admin_user()
{
	$admin_email = get_option('admin_email', '');

	if (!is_email($admin_email)) {
		return null;
	}

	$admin_user = get_user_by('email', $admin_email);

	if (is_wp_error($admin_user)) {
		return [];
	}

	return prepare_user_data($admin_user);
}

function get_current_user() {
	$current_user = get_users_data_by( 'email', [ get_current_user_email() ] );

	if ( empty( $current_user) ) {
		return false;
	}

	return $current_user[0];
}

/**
 * Max upload size
 * @return int size in bytes
 */
function max_upload_size() {
	$custom_size = get_option( 'maxUploadSize', 100 ); // In MB
	$custom_size = ( is_numeric( $custom_size ) ) ? (int) $custom_size * ( 1024 * 1024) : 100;

	return $custom_size > wp_max_upload_size() ? wp_max_upload_size() : $custom_size;
}

/**
 * Video Record Time Limit
 *
 * @return int seconds
 */
function video_record_time_limit() {
	$min = get_option( 'maxVideoLength', 2 ); // In Minute
	return $min * 60;
}

/**
 * Voice Record Time Limit
 *
 * @return int seconds
 */
function voice_record_time_limit() {
	$min = get_option( 'maxVoiceLength', 2 ); // In Minute
	return $min * 60;
}

function get_mime_types($filter_type = '', $return_type = '')
{

	$supported_mime_types = wp_get_mime_types();

	// Filter
	if (!empty($filter_type)) {
		$filtered_supported_mime_types = [];

		foreach ($supported_mime_types as $key => $value) {
			$_type = preg_replace("/\/\w+$/", '', $value);

			if ($_type !== $filter_type) {
				continue;
			}

			$filtered_supported_mime_types[$key] = $value;
		}

		$supported_mime_types = $filtered_supported_mime_types;
	}

	// Convert as extension
	if ($return_type === 'extension') {
		$extensions = array_keys($supported_mime_types);

		$extended_extensions = [];

		foreach ($extensions as $extension) {
			$_sub_extensions = explode('|',  $extension);

			foreach ($_sub_extensions as $sub_extension) {
				$extended_extensions[] = '.' . $sub_extension;
			}
		}

		$supported_mime_types = array_values($extended_extensions);
	}

	return $supported_mime_types;
}

/**
 * Get users email
 *
 * @return string Email
 */
function get_current_user_email()
{
	global $helpgent_guest_user;

	$current_user = get_user_by( 'id', get_current_user_id() );
	$current_user = ( ! empty( $current_user ) ) ? $current_user->user_email : '';
	$current_user = ( empty( $current_user ) && ! empty( $helpgent_guest_user ) ) ? $helpgent_guest_user : $current_user;

	return $current_user;
}

/**
 * Get user data by.
 *
 * @param string $by
 * @param string $subject
 * @return array Users Data
 */
function get_user_data_by( $by = 'id', $subject = '' ) {

	if ( empty( $by ) || empty( $subject ) ) {
		return false;
	}

	$user = get_user_by( $by, $subject );

	if ( empty( $user ) ) {
		if ( 'email' === $by ) {
			$guest_user = Guest_User_Model::get_items([
				'where' => [
					'email' => $subject
				]
			]);

			if ( empty( $guest_user ) ) {
				return false;
			}

			$user_data = prepare_guest_user_data( $guest_user[0] );

			if ( $user_data ) {
				return $user_data;
			}

			return false;
		}

		return false;
	}

	return prepare_user_data( $user );
}

/**
 * Get users data by.
 *
 * @param array $items
 * @return array Users Data
 */
function get_users_data_by( $by = 'id', $items = [] )
{

	if ( empty( $items ) ) {
		return [];
	}

	$users = [];

	foreach ( $items as $item ) {
		$user = get_user_by( $by, $item );

		if ( empty( $user ) ) {
			if ( 'email' === $by ) {
				$guest_user = Guest_User_Model::get_items([
					'where' => [
						'email' => $item
					]
				]);

				if ( empty( $guest_user ) ) {
					continue;
				}

				$user_data = prepare_guest_user_data( $guest_user[0] );

				if ( $user_data ) {
					array_push( $users, $user_data );
				}

				continue;
			}

			continue;
		}

		$user_data = prepare_user_data( $user );

		if ( $user_data ) {
			array_push( $users, $user_data );
		}

	}

	return $users;
}

/**
 * Get users data by IDs.
 *
 * @param array $user_ids
 * @return array Users Data
 */
function get_users_data_by_ids($user_ids = [])
{

	if (empty($user_ids)) {
		return [];
	}

	$users = [];

	foreach ($user_ids as $user_id) {
		$user = get_user_by('id', $user_id);

		if (empty($user)) {
			continue;
		}

		array_push($users, prepare_user_data($user));
	}

	return $users;
}

/**
 * Search Users
 *
 * @param string $keyword
 * @param array $fields
 *
 * @return array Users
 */
function search_users( $keyword = '', $fields = [] ) {
	$users = [];

	$wp_users    = search_wp_users( $keyword, $fields );
	$guest_users = search_guest_users( $keyword );

	$users = array_merge( $users, $wp_users, $guest_users );

	return $users;
}


/**
 * Search WP Users
 *
 * @param string $keyword
 * @param array $fields
 *
 * @return array Users
 */
function search_wp_users( $keyword = '', $fields = [] ) {
	if ( empty( $keyword ) ) {
		return [];
	}

	$prepared_args = [];

	if ( is_email( $keyword ) ) {
		// Search by email.
		$prepared_args['search']         = $keyword;
		$prepared_args['search_columns'] = array( 'user_email' );
	} else {
		// Search by name.
		$name_parts = explode( ' ', trim( $keyword ) );
		$name_query = ['relation' => 'OR'];

		foreach ( $name_parts as $name ) {
			$name_query[] = [
				'key'     => 'display_name',
				'value'   => $name,
				'compare' => 'LIKE',
			];
			$name_query[] = [
				'key'     => 'first_name',
				'value'   => $name,
				'compare' => 'LIKE',
			];
			$name_query[] = [
				'key'     => 'last_name',
				'value'   => $name,
				'compare' => 'LIKE',
			];
			$name_query[] = [
				'key'     => 'nickname',
				'value'   => $name,
				'compare' => 'LIKE',
			];
		}

		$prepared_args['meta_query'][] = $name_query;
	}

	$users_data = [];
	$users = new \WP_User_Query($prepared_args);

	foreach ( $users->results as $user ) {
		$user_data = prepare_user_data($user, $fields);

		if ( ! empty( $user_data ) ) {
			$users_data[] = $user_data;
		}
	}

	return $users_data;
}

/**
 * Search Guest Users
 *
 * @param string $keyword
 * @param array $fields
 *
 * @return array Users
 */
function search_guest_users( $keyword = '', $fields = [] ) {
	$query_args = [
		'where' => [
			'name' => [
				'key'     => 'name',
				'compare' => 'like',
				'value'   => $keyword,
			]
		]
	];

	if ( is_email( $keyword ) ) {
		$query_args['where'] = [
			'email' => $keyword,
		];
	}

	$users = Guest_User_Model::get_items( $query_args );

	$users_data = [];

	foreach ( $users as $user ) {
		$user_data = prepare_guest_user_data( $user );

		if ( ! empty( $user_data ) ) {
			$users_data[] = $user_data;
		}
	}

	return $users_data;
}


/**
 * Prepare User Data
 *
 * @param WP_User $user
 * @return array|false User
 */
function prepare_user_data( $user, $fields = [] ) {

	if ( empty( $user ) ) {
		return false;
	}

	$user_info = [];

	$default_fields = ['id', 'email', 'name', 'username', 'first_name', 'last_name', 'roles', 'avater', 'is_admin', 'is_guest' ];
	$fields = ( ! empty( $fields ) ) ? $fields : $default_fields;

	if ( in_array( 'id', $fields ) ) {
		$user_info['id'] = $user->ID;
	}

	if ( in_array( 'name', $fields ) ) {
		$user_info['name'] = $user->display_name;
	}

	if ( in_array( 'username', $fields ) ) {
		$user_info['username'] = $user->user_login;
	}

	if ( in_array('email', $fields ) ) {
		$user_info['email'] = $user->user_email;
	}

	if ( in_array( 'first_name', $fields ) ) {
		$user_info['first_name'] = get_user_meta( $user->ID, 'first_name', true );
	}

	if ( in_array( 'last_name', $fields ) ) {
		$user_info['last_name'] = get_user_meta( $user->ID, 'last_name', true );
	}

	if ( in_array( 'avater', $fields ) ) {
		$avater = get_user_meta($user->ID, '_wpwax_vm_avater', true);
		$avater = ( ! empty($avater ) ) ? $avater : get_avatar_url($user->ID);

		$user_info['avater'] = $avater;
	}

	if ( in_array( 'roles', $fields ) ) {
		$user_info['roles'] = $user->roles;
	}

	if ( in_array( 'is_admin', $fields ) ) {
		$user_info['is_admin'] = is_user_admin( $user ) ;
	}

	if ( in_array( 'is_guest', $fields ) ) {
		$user_info['is_guest'] = false;
	}

	return $user_info;
}

/**
 * Prepare Guest User Data
 *
 * @param array $user
 * @return array|false User
 */
function prepare_guest_user_data( $user = [] ) {
	if ( empty( $user ) ) {
		return false;
	}

	$user['avater']    = get_avatar_url( $user['email'] );
	$user['roles']     = [];
	$user['username']  = $user['id'];
	$user['is_admin']  = false;
	$user['is_guest']  = true;

	return $user;
}

/**
 * Check if current user is admin
 *
 * @return bool
 */
function is_current_user_admin() {
	return is_user_admin( get_current_user_email() );
}

/**
 * Check if current user is client
 *
 * @return bool
 */
function is_current_user_guest() {
	$email = get_current_user_email();

	if ( empty( $email ) ) {
		return false;
	}

	$user_exists = Guest_User_Model::user_exists( $email );

	if ( is_wp_error( $user_exists ) ) {
		return false;
	}

	return $user_exists;
}

/**
 * Get Authentication Token
 *
 * @return string Token
 */
function get_auth_token() {
	global $helpgent_token;
	return ( ! empty( $helpgent_token ) ) ? $helpgent_token : '';
}


/**
 * Get Token Email
 *
 * @return string Email
 */
function get_auth_token_email() {

	$token = get_auth_token();

	if ( empty( $token ) ) {
		return '';
	}

	$email = Auth_Token_Model::get_user_email_by_token( $token );

	return $email;
}

/**
 * Check if has expaired token
 *
 * @return bool
 */
function has_expaired_token() {

	global $helpgent_has_expaired_token;

	if ( is_null( $helpgent_has_expaired_token ) ) {
		return false;
	}

	return $helpgent_has_expaired_token;
}

/**
 * Get Authentication Expaired Token
 *
 * @return string Token
 */
function get_auth_expaired_token() {
	global $helpgent_expaired_token;
	return ( ! empty( $helpgent_expaired_token ) ) ? $helpgent_expaired_token : '';
}

/**
 * Get Authentication Expaired Token Email
 *
 * @return string Email
 */
function get_auth_expaired_token_email() {

	$token = get_auth_expaired_token();

	if ( empty( $token ) ) {
		return '';
	}

	$email = Auth_Token_Model::get_user_email_by_token( $token );

	return $email;
}

/**
 * Check If User Is Authenticated
 *
 * @return bool Status
 */
function is_user_authenticated() {
	return ! empty( get_current_user_email() );
}

/**
 * Check if user is client
 *
 * @return bool
 */
function is_user_guest( $email )
{
	return Guest_User_Model::user_exists( $email );
}

/**
 * Check if user is client
 *
 * @param WP_User $user
 * @return bool
 */
function is_user_client( $user )
{

	if ( ! $user instanceof WP_User ) {
		return false;
	}

	return user_can( $user, 'wpwax_vm_client' );
}

/**
 * Check if user is admin
 *
 * @param WP_User|String|Integer|Array $user
 * @return bool
 */
function is_user_admin( $user )
{
	if ( empty ( $user ) ) {
		return false;
	}

	if ( is_numeric( $user ) ) {
		$user = get_user_by( 'id', $user );
	} else if ( is_string( $user ) ) {
		$user = get_user_by( 'email', $user );
	} else if ( is_array( $user ) && ! empty( $user['email'] ) ) {
		$user = get_user_by( 'email', $user['email'] );
	}

	if ( ! $user instanceof WP_User ) {
		return false;
	}

	$accepted_roles = get_admin_roles();

	$accepted_roles_check = array_unique(array_map( function ( $rule ) use ( $accepted_roles ) {
		return in_array( $rule, $accepted_roles ) ? 1 : 0;
	}, $user->roles) );

	return in_array( 1, $accepted_roles_check ) ? true : false;
}


/**
 * Get Accepted Admin Roles
 *
 * @return array
 */
function get_admin_roles() {
	return apply_filters( HELPGENT_PREFIX . '_admin_roles', ['administrator'] );
}

/**
 * Get Terms
 *
 * @return array
 */
function get_terms() {

	$terms = Term_Model::get_items( [ 'limit' => -1 ] );
	return $terms['results'];

}


/**
 * Sanitize Timezone String
 *
 * @param string $timezone_string
 * @return string Timezone String
 */
function sanitize_timezone_string( $timezone_string ) {

	if ( empty( $timezone_string ) ) {
		return $timezone_string;
	}

	$timezone_string = sanitize_text_field( $timezone_string );
	$has_symbol      = in_array( $timezone_string[0], [ '+', '-' ] );
	$timezone_string = ( $has_symbol ) ? $timezone_string : '+' . $timezone_string;

	return $timezone_string;
}

/**
 * Get Attachment Link
 *
 * @param int $attachment_id
 * @return string Attachment Link
 */
function get_attachment_link( $attachment_id = 0 ) {

	if ( empty( $attachment_id ) ) {
		return '';
	}

	return admin_url( 'admin-post.php?action=dynamic_attachment_link&attachment_id=' . $attachment_id );
}


/**
 * Get terms taxonomy IDs
 *
 * @param string $term_list
 * @return mixed Taxonomy IDs
 */
function get_terms_taxonomy_ids( $tax_query = [], $return_type = 'string' ) {
	$taxonomy = ( ! empty( $tax_query['taxonomy'] ) ) ? $tax_query['taxonomy'] : '';
	$field    = ( ! empty( $tax_query['field'] ) ) ? $tax_query['field'] : '';
	$terms    = ( ! empty( $tax_query['terms'] ) ) ? $tax_query['terms'] : '';

	$terms_args = [ 'where' => [] ];

	if ( ! empty( $taxonomy ) ) {
		$terms_args['where']['taxonomy'] = $taxonomy;
	}

	if ( ! empty( $field ) ) {
		$terms_args['where']['terms'] = [
			'key'     => $field,
			'compare' => 'IN',
			'value'   => $terms,
		];
	}

	$term_list = Term_Model::get_items( $terms_args );

	$term_list = ( ! empty( $term_list['results'] ) ) ? array_map( function( $item ) { return $item['term_taxonomy_id']; }, $term_list['results'] ) : [];

	if ( 'array' === $return_type ) {
		return $term_list;
	}

	$term_list = trim( join( ',', $term_list ), ',' );

	return $term_list;
}


/**
 * Check if user exists
 *
 * @param string $email
 * @return bool|WP_Error
 */
function user_exists( $email ) {

	if ( empty( $email ) ) {
		$message = __( 'The email is required.', 'helpgent' );
		return new WP_Error( 403, $message );
	}

	if ( ! is_email( $email ) ) {
		$message = __( 'A valid email is required.', 'helpgent' );
		return new WP_Error( 403, $message );
	}

	// Check if the user exists in WP
	$wp_user = get_user_by( 'email', $email );

	if ( ! empty( $wp_user ) ) {
		return true;
	}

	// Check if guest user exists
	$guest_user = Guest_User_Model::user_exists( $email );

	if ( is_wp_error( $guest_user ) ) {
		return $guest_user;
	}

	if ( $guest_user ) {
		return true;
	}

	return false;
}
/**
 * Get Dashboard Page Link
 *
 * @return string Dashboard Page Link
 */
function get_dashboard_page_link() {

	$link = home_url();
	$page_id = get_option( 'userDashboardPage' );

	if ( $page_id )  {
		$link = get_permalink( $page_id );
	}

	return apply_filters( 'helpgent_dashboard_page_link', $link, $page_id );
}

/**
 * Check If Current User Can View Conversation
 *
 * @param string $conversation_id
 * @return bool
 */
function current_user_can_view_conversation( $conversation_id ) {

	if ( is_current_user_admin() ) {
		return true;
	}

	$conversation = Conversation_Model::get_item( $conversation_id );

	if ( is_wp_error( $conversation ) ) {
		return false;
	}

	return $conversation['created_by'] === get_current_user_email();
}


/**
 * Get date time of specified duration
 *
 * @param int $duration_in_days Duration in days
 * @return string DateTime
 */
function get_duration_in_date( $duration_in_days ) {
	$now     = current_time( 'mysql', true );
	$seconds = DAY_IN_SECONDS * $duration_in_days;
	$expiry  = date( 'Y-m-d H:i:s', strtotime( $now ) + $seconds );

	return $expiry;
}
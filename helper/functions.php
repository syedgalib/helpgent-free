<?php

namespace WPWaxCustomerSupportApp\Base\Helper;

use WP_Query;
use WP_User;

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

	$file_path = WPWAX_CUSTOMER_SUPPORT_APP_TEMPLATE_PATH . $path;

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

	$file_path = WPWAX_CUSTOMER_SUPPORT_APP_VIEW_PATH . $path;

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
function handle_media_upload($file, $overrides = array('test_form' => false))
{
	include_media_uploader_files();

	$time = current_time('mysql');
	$file = wp_handle_upload($file, $overrides, $time);

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

		if ( ! isset( $default[ $key ] ) ) {
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
function merge_params($default = [], $args = [])
{

	foreach ($default as $key => $value) {

		if (!isset($args[$key])) {
			continue;
		}

		$default[$key] = $args[$key];
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
function convert_string_to_int_array($string, $separator = ',', $remove_non_int_items = true)
{
	$list = convert_string_to_array($string, $separator);
	$list = parse_array_items_to_int($list, $remove_non_int_items);

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
function convert_string_to_array($string, $separator = ',')
{

	$string = trim($string, ',\s');
	$list   = explode($separator, $string);

	if (!is_array($list)) {
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
function parse_array_items_to_int($list = [], $remove_non_int_items = true)
{

	if (!is_array($list)) {
		return $list;
	}

	foreach ($list as $key => $value) {

		$list[$key] = 0;

		if (is_numeric($value)) {
			$list[$key] = (int) $value;
		}

		if (!is_numeric($value) && $remove_non_int_items) {
			unset($list[$key]);
		}
	}

	return array_values($list);
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
function sanitize_list_items($list = [], $schema = [])
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
			$timezone      = (!empty($request_params['timezone'])) ? $request_params['timezone'] : null;

			$list[$formatted_key] = (!empty($list[$key])) ? esc_html(get_formatted_time($list[$key], $timezone)) : null;
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
function get_formatted_time($time, $timezone)
{
	$timezone  = $timezone ? $timezone : wp_timezone_string();
	$timezone  = new \DateTimeZone($timezone);
	$timestamp = strtotime($time);

	return wp_date('j M y @ G:i', $timestamp, $timezone);
}

/**
 * Get WP Pages
 *
 * @return array Pages
 */
function get_wp_pages()
{
	$homepage = [ [ 'id' => 0, 'title' => __( 'Homepage', 'wpwax-customer-support-app' ), ] ];

	$query = new WP_Query([
		'post_type'     => 'page',
		'post_status'   => 'publish',
		'post_per_page' => -1,
		'fields'        => 'ids',
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
	return \get_option(WPWAX_CUSTOMER_SUPPORT_APP_OPTIONS, []);
}

/**
 * Get Option
 *
 * @param string $option_key
 * @param mixed $default
 *
 * @return mixed Option
 */
function get_option($option_key = '', $default = '')
{
	$options = get_options();

	if (empty($options)) {
		return '';
	}

	if (!isset($options[$option_key])) {
		return $default;
	}

	return $options[$option_key];
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

	\update_option(WPWAX_CUSTOMER_SUPPORT_APP_OPTIONS, $options);
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

	\update_option(WPWAX_CUSTOMER_SUPPORT_APP_OPTIONS, $options);

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

	\update_option(WPWAX_CUSTOMER_SUPPORT_APP_OPTIONS, $options);
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

	\update_option(WPWAX_CUSTOMER_SUPPORT_APP_OPTIONS, $options);

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

function get_current_user($return_wp_user = false)
{
	$current_user = get_user_by('id', get_current_user_id());

	if (empty($current_user)) {
		return false;
	}

	if ($return_wp_user) {
		return $current_user;
	}

	return prepare_user_data($current_user);
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
function search_users($keyword = '', $fields = [])
{

	if (empty($keyword)) {
		return [];
	}

	$prepared_args = [];

	if (is_email($keyword)) {
		// Search by email.
		$prepared_args['search']         = $keyword;
		$prepared_args['search_columns'] = array('user_email');
	} else {
		// Search by name.
		$name_parts = explode(' ', trim($keyword));
		$name_query = ['relation' => 'OR'];

		foreach ($name_parts as $name) {
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

	foreach ($users->results as $user) {
		$user_data = prepare_user_data($user, $fields);

		if (!empty($user_data)) {
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
function prepare_user_data($user, $fields = [])
{

	if (empty($user)) {
		return false;
	}

	$user_info = [];

	$default_fields = ['id', 'email', 'name', 'first_name', 'last_name', 'roles', 'avater'];
	$fields = (!empty($fields)) ? $fields : $default_fields;

	if (in_array('id', $fields)) {
		$user_info['id'] = $user->ID;
	}

	if (in_array('name', $fields)) {
		$user_info['name'] = $user->display_name;
	}

	if (in_array('email', $fields)) {
		$user_info['email'] = $user->user_email;
	}

	if (in_array('first_name', $fields)) {
		$user_info['first_name'] = get_user_meta($user->ID, 'first_name', true);
	}

	if (in_array('last_name', $fields)) {
		$user_info['last_name'] = get_user_meta($user->ID, 'last_name', true);
	}

	if (in_array('avater', $fields)) {
		$avater = get_user_meta($user->ID, '_wpwax_vm_avater', true);
		$avater = (!empty($avater)) ? $avater : get_avatar_url($user->ID);

		$user_info['avater'] = $avater;
	}

	if (in_array('roles', $fields)) {
		$user_info['roles'] = $user->roles;
	}

	return $user_info;
}

/**
 * Check if user is admin
 *
 * @param WP_User $user
 * @return bool
 */
function is_user_admin($user)
{

	if (empty($user)) {
		return false;
	}

	$accepted_roles = get_admin_roles();

	$accepted_roles_check = array_unique(array_map(function ($rule) use ($accepted_roles) {
		return in_array($rule, $accepted_roles) ? 1 : 0;
	}, $user->roles));

	return in_array(1, $accepted_roles_check) ? true : false;
}


/**
 * Get Accepted Admin Roles
 *
 * @return array
 */
function get_admin_roles()
{
	return apply_filters(WPWAX_CUSTOMER_SUPPORT_APP_PREFIX . '_admin_roles', ['administrator']);
}

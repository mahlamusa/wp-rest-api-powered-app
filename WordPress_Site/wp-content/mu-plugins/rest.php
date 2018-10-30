<?php

/**
 * Register custom rest fields
 */
add_action( 'rest_api_init',  'register_custom_fields' );

/**
 * Register rest fields and endpoint
 *
 * @return void
 */
function register_custom_fields() {

    // Register post attachment url field
    register_rest_field( 'post', 'attachment_url',
    //register_rest_field( array('post', 'suggestion' ), 'attachment_url',
        array(
            'get_callback'          => 'get_attachment_url' ,
            'update_callback'       => 'set_attachment_url' ,
            'show_in_rest'          => true,
            'auth_callback'	        => 'attachment_url_permission_check',
        )
    );

    // Register post thumbs_up and thumbs_down field
    register_rest_field( 'post', 'thumbs_up',
        array(
            'get_callback'          => 'get_thumbs_up' ,
            'update_callback'       => 'set_thumbs_up' ,
            'show_in_rest'          => true,
            'auth_callback'	        => 'permission_check',
        )
    );

    register_rest_field( 'post', 'thumbs_down',
        array(
            'get_callback'          => 'get_thumbs_down' ,
            'update_callback'       => 'set_thumbs_down' ,
            'show_in_rest'          => true,
            'auth_callback'	        => 'permission_check',
        )
    );

    // Register suggestions up/down votes
    register_rest_field( 'suggestion', 'up_vote',
        array(
            'get_callback'          => 'get_up_vote' ,
            'update_callback'       => 'set_up_vote' ,
            'show_in_rest'          => true,
            'auth_callback'	        => 'permission_check',
        )
    );

    register_rest_field( 'suggestion', 'down_vote',
        array(
            'get_callback'          => 'get_down_vote' ,
            'update_callback'       => 'set_up_vote' ,
            'show_in_rest'          => true,
            'auth_callback'	        => 'permission_check',
        )
    );

    // Register endpoint: domain.com/wp-json/powerapi/v1/siteinformation
	register_rest_route( 'powerapi/v1', '/siteinformation', array(
		'methods' => 'GET',
		'callback' => 'get_site_information'
    ) );
    
    // Register endpoint: domain.com/wp-json/powerapi/v1/thingstoget
    register_rest_route( 'powerapi/v1', 'things', array(
        'methods'   => 'GET, POST, DELETE',
        'callback'  => 'get_the_things',
        'args'		=> array(
            'id'           => array( 'validate_callback' => 'validate_id' ),
            'title'        => array( 'validate_callback' => 'validate_id' )
        ),
        'permission_callback'	=> 'permission_check',
    ));

    // Register endpoint: domain.com/wp-json/powerapi/v1/thingstoget
    register_rest_route( 'powerapi/v1', 'things/(?P<link_id>\d+)', array(
        'methods'   => 'GET, POST, PUT, PATCH, DELETE',
        'callback'  => 'get_one_thing',
        'args'		=> array(
            'id'           => array( 'validate_callback' => 'validate_id' ),
            'title'        => array( 'validate_callback' => 'validate_id' )
        ),
        'permission_callback'	=> 'permission_check',
    ));
}

/**
 * Retrieve information for a custom endpoint
 *
 * @return WP_Rest_Response
 */
function get_site_information() {
	return new WP_Rest_Response( array(
		'pages'	        => wp_count_posts('page'),
		'posts'         => wp_count_posts('post'),
		'suggestion'    => wp_count_posts('suggestion'),
	) );
}

/**
 * Register 'suggestion' post type and make it available through the rest API
 * Accessible through /wp/v2/suggestions
 */
add_action( 'init', 'register_suggestions_post_type' );
function register_suggestions_post_type() {
    $args = array(
        'label' => 'Suggestions',
        'public'    => true,
        'show_ui'   => true,
        'show_in_menu'  => true,
        'show_in_rest'  => true, // /wp/v2/suggestions
        'rest_base' => 'suggestions',
        'menu_icon' => 'dashicons-lightbulb',
        'supports'  => array( 'title', 'excerpt', 'thumbnail')
    );
    register_post_type( 'suggestion', $args );
}


/**
 * Get the thumbnail url of a given post
 *
 * @param array $post
 * @return string
 */
function get_attachment_url( $post ) {
    return get_the_post_thumbnail_url( $post, 'large' );
}

/**
 * Update the post thumbnail url (Just return for now)
 *
 * @param string $value
 * @param array $post
 * @param WP_Rest_Request $request
 * @return string
 */
function set_attachment_url( $value, $post, $request ) {
    return get_the_post_thumbnail_url( $post, 'large' );
}

/**
 * 
 *
 * @param string $object the object type
 * @param string $field_name name of the field to retrieve
 * @param WP_Rest_Request $request
 * @return string
 */
function get_thumbs_up( $post,  $field_name, $request ) {
    $thumbs = get_post_meta( $post['id'], 'thumbs_up', true );
    $thumbs = ! empty( $thumbs ) ? $thumbs : 0;
    return $thumbs;
}

/**
 * Update
 *
 * @param string $value - the new value to be saved
 * @param string $field_name - name of the field to retrieve
 * @param WP_Rest_Request $request - the current rest request object
 * @return string
 */
function set_thumbs_up( $value, $post, $field_name ) {
    $thumbs_up = get_thumbs_up( $post ) + $value;
    return update_post_meta( $post['id'], $field_name, $thumbs_up );
}

/**
 * 
 *
 * @param string $object the object type
 * @param string $field_name name of the field to retrieve
 * @param WP_Rest_Request $request
 * @return string
 */
function get_thumbs_down( $post,  $field_name, $request ) {
    $thumbs = get_post_meta( $post['id'], $field_name, true );
    $thumbs = ! empty( $thumbs ) ? $thumbs : 0;
    return $thumbs;
}

/**
 * Update
 *
 * @param string $value - the new value to be saved
 * @param string $field_name - name of the field to retrieve
 * @param WP_Rest_Request $request - the current rest request object
 * @return string
 */
function set_thumbs_down( $value, $post, $field_name ) {
    $thumbs_up = get_thumbs_down( $post ) + $value;
    return update_post_meta( $post['id'], $field_name, $thumbs_up );
}

/**
 * 
 *
 * @param string $object the object type
 * @param string $field_name name of the field to retrieve
 * @param WP_Rest_Request $request
 * @return string
 */
function get_up_vote( $suggestion, $field_name, $request = '') {
    $up_vote = get_post_meta( $suggestion['id'], $field_name, true );
    $up_vote = $up_vote ? $up_vote : 0;

    return $up_vote;
}


/**
 * Update
 *
 * @param string $value - the new value to be saved
 * @param array $suggestion - the object to be updated
 * @param string $field_name - name of the field to retrieve 
 * @return int 
 */
function set_up_vote( $value, $suggestion, $field_name ) {
    $up_vote = get_up_vote( $suggestion, $field_name ) + 1; // OR + $value
    return update_post_meta( $suggestion['id'], $field_name, $up_vote );
}

/**
 * 
 *
 * @param string $object the object type
 * @param string $field_name name of the field to retrieve
 * @param WP_Rest_Request $request
 * @return int
 */
function get_down_vote( $suggestion, $field_name, $request = '') {
    $up_vote = get_post_meta( $suggestion['id'], $field_name, true );
    $up_vote = $up_vote ? $up_vote : 0;

    return $up_vote;
}


/**
 * Update down vote by adding 1 to current value
 *
 * @param string $value - the new value to be saved
 * @param array $suggestion - the object to be updated
 * @param string $field_name - name of the field to retrieve 
 * @return int 
 */
function set_down_vote( $value, $suggestion, $field_name ) {
    $up_vote = get_down_vote( $suggestion, $field_name ) + 1; // OR + $value
    return update_post_meta( $suggestion['id'], $field_name, $up_vote );
}

/**
 * Check permissions
 *
 * @param WP_Rest_Request $request
 * @return bool
 */
function permission_check( $request ) {
    return true;
}

/**
 * Get some custom data not in the default wordpress tables
 * It could be from a custom table or completely outside of WordPress database
 *
 * @param WP_Rest_Request $request
 * @return WP_Rest_Response
 */
function get_the_things( $request ) {
    // get params from request.
    // get data from custom table using $wpdb

    $things_from_database = array(
        array( 'id' => 1, 'name' => 'Thing name'),
        array( 'id' => 2, 'name' => 'Thing name two'),
        array( 'id' => 3, 'name' => 'Thing name three'),
    );

    if ( $things_from_database ) {
        return new WP_Rest_Response ( $things_from_database, 200 );
    }

    return new WP_Rest_Response( array( 'Nothing found' ), 404 );
    
}


/**
 * Get some custom data not in the default wordpress tables
 * It could be from a custom table or completely outside of WordPress database
 *
 * @param WP_Rest_Request $request
 * @return WP_Rest_Response
 */
function get_one_thing( $request ) {
    // get params from request.
    // get data from custom table using $wpdb
    // get item whose id is $request['id']
    
    $thing_from_database = array( 'id' => 1, 'name' => 'Thing name');

    if ( $thing_from_database ) {
        return new WP_Rest_Response ( $thing_from_database, 200 );
    }

    return new WP_Rest_Response( array( 'Nothing found' ), 404 );
    
}

































// General get and set functions


/**
 * Get value of a rest field stored in post meta
 *
 * @param string $object the object type
 * @param string $field_name name of the field to retrieve
 * @param WP_Rest_Request $request
 * @return string
 */
function get_rest_field_count( $object,  $field_name, $request ) {
    $thumbs = get_post_meta( $object['id'], $field_name, true );
    $thumbs = ! empty( $thumbs ) ? $thumbs : 0;
    return $thumbs;
}

/**
 * Increment the field value stored in post meta
 *
 * @param string $value - the new value to be saved
 * @param string $field_name - name of the field to retrieve
 * @param WP_Rest_Request $request - the current rest request object
 * @return string
 */
function set_rest_field_count( $value, $object, $field_name ) {
    $thumbs_up = get_rest_field_count( $object ) + $value;
    return update_post_meta( $object['id'], $field_name, $thumbs_up );
}

/**
 * Get custom rest field from post meta
 *
 * @param string $object the object type
 * @param string $field_name name of the field to retrieve
 * @param WP_Rest_Request $request
 * @return string
 */
function get_rest_field_string( $object,  $field_name, $request ) {
    $thumbs = get_post_meta( $object['id'], $field_name, true );
    $thumbs = ! empty( $thumbs ) ? $thumbs : 0;
    return $thumbs;
}

/**
 * Update custom rest field in post meta
 *
 * @param string $value - the new value to be saved
 * @param string $field_name - name of the field to retrieve
 * @param WP_Rest_Request $request - the current rest request object
 * @return string
 */
function set_rest_field_string( $value, $object, $field_name ) {
    $thumbs_up = get_rest_field_count( $object ) + $value;

    return update_post_meta( $object['id'], $field_name, $thumbs_up );
}

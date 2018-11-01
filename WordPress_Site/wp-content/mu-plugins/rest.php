<?php
//add_action( 'rest_api_init',  'register_custom_fields' );

function register_custom_fields() {

    // Register post attachment url field
    register_rest_field( 'post', 'attachment_url',
    //register_rest_field( array('post', 'suggestion' ), 'attachment_url',
        array(
            'get_callback'          => 'function_to_retrieve_the_field_value' ,
            'update_callback'       => 'function_to_update_the_field_value' ,
            'show_in_rest'          => true,
            'auth_callback'	        => 'function_to_check_for_permissions',
        )
    );
}
<?php
/**
 * Plugin Name: Gaucho Booking
 * Description: Custom move booking form built with React.
 * Version: 0.0.1
 * Derion Williams
 */

if (!defined('ABSPATH')){
    exit;
}

function gaucho_enqueue_assets(){
    $plugin_url = plugin_dir_url(__FILE__);

    wp_enqueue_style(
        'gaucho-css', 
        $plugin_url . 'build/assets/index-D1ZyB1tY.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/assets/index-DeL3I0Jf.css')
    );

    wp_enqueue_script(
        'gaucho-js',
        $plugin_url . 'build/assets/index-DO4XbefH.js',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/assets/index-BVaJcT09.js'),
        true
    );
}

// add_action('wp_enqueue_scripts', 'gaucho_enqueue_assets');

function gaucho_render_booking_form(){
    return '<div id="gaucho-root"></div>';
}
add_shortcode('gaucho_booking', 'gaucho_render_booking_form');

function gaucho_conditional_enqueue() {
    global $post;
    if (isset($post->post_content) &&has_shortcode($post->post_content, 'gaucho_booking')){
        gaucho_enqueue_assets();
    }
}

add_action('wp_enqueue_scripts', 'gaucho_conditional_enqueue');

// add_action('admin_menu', function() {
//   add_menu_page('Gaucho Booking', 'Gaucho Booking', 'manage_options', 'gaucho-booking', function() {
//     echo '<div id="gaucho-booking-root"></div>';
//   });
// });
//
// add_action('admin_enqueue_scripts', function() {
//   $asset_path = plugin_dir_url(__FILE__) . 'build/assets/';
//   wp_enqueue_script('gaucho-booking-script', $asset_path . 'index.js', [], null, true);
//   wp_enqueue_style('gaucho-booking-style', $asset_path . 'index.css');
// });
//

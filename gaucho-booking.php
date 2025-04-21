<?php
/**
 * Plugin Name: Gaucho Booking
 * Description: Custom move booking form built with React.
 * Version: 1.0
 */

add_action('admin_menu', function() {
  add_menu_page('Gaucho Booking', 'Gaucho Booking', 'manage_options', 'gaucho-booking', function() {
    echo '<div id="gaucho-booking-root"></div>';
  });
});

add_action('admin_enqueue_scripts', function() {
  $asset_path = plugin_dir_url(__FILE__) . 'build/assets/';
  wp_enqueue_script('gaucho-booking-script', $asset_path . 'index.js', [], null, true);
  wp_enqueue_style('gaucho-booking-style', $asset_path . 'index.css');
});


<?php
/**
 * Plugin Name: Gosign - Posts Slider Block
 * Plugin URI: https://www.gosign.de/plugins/gosign-posts-slider-block
 * Description: Gosign - Posts Slider Block — is a Gutenberg plugin created by Gosign. This plugin contains Posts block that shows posts as Slider.
 * Author: Gosign.de
 * Author URI: https://www.gosign.de/wordpress-agentur/
 * Version: 1.1.0
 * License: GPL3+
 * License URI: https://www.gnu.org/licenses/gpl.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

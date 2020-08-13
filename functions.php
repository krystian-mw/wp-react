<?php

add_theme_support('menus');
add_theme_support('post-thumbnails');

# remove the random emojis wp adds
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

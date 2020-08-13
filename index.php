<?php

if (!defined(WP_HOME)) {
    define(WP_HOME, get_home_url());
}

$is_admin = user_can($current_user, 'administrator');
$page = get_post();
$is_404 = is_404();
$nav_menu =  wp_get_nav_menu_items('primary');

foreach ($nav_menu as $nav_menu_item_key => $nav_menu_item_value) {
    $nav_menu[$nav_menu_item_key] = [
        'url' => str_replace(WP_HOME, '', $nav_menu[$nav_menu_item_key]->url),
        'title' => $nav_menu_item_value->title,
        'id' => $nav_menu_item_value->ID,
        'parent' =>  intval($nav_menu_item_value->menu_item_parent),
    ];
}

$data = [
    '_NAV' => $nav_menu,
    '_IS_404' => ($is_404 ? true : false)
];

if (!$is_404) {
    $data['_POST_TYPE'] = $page->post_type;
    $data['_SLUG'] = $page->post_name;
    $data['_POST'] = [
        'title' => $page->post_title,
        'content' => apply_filters('the_content', get_the_content(null, null, $page->ID)),
        'thumbnail' => get_the_post_thumbnail_url($page->ID, 'full'),
        'date' => $page->post_date_gmt,
        'author' => get_the_author_meta('display_name')
    ];
}

$data['_POSTS'] = is_home() ? get_posts() : [];

foreach ($data['_POSTS'] as $_post_key => $_post_value) {
    $data['_POSTS'][$_post_key] = [
        'link' => str_replace(WP_HOME, '', get_permalink($_post_value->ID)),
        'title' => $_post_value->post_title,
        'content' => apply_filters('the_content', wp_trim_words(get_the_content(null, true, $_post_value->ID))),
        'date' => $_post_value->post_date_gmt,
        'thumbnail' => get_the_post_thumbnail_url($_post_value->ID)
    ];
}

if (isset($_GET['data-only'])) {
    header('content-type: application/json');
    echo json_encode($data);
    exit();
}

?>
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <?php if ($is_admin) {
    ?>
        <script crossorigin src="https://cdn.jsdelivr.net/npm/react@16/umd/react.development.js"></script>
        <script crossorigin src="https://cdn.jsdelivr.net/npm/react-dom@16/umd/react-dom.development.js"></script>

    <?php
    } else {
    ?>
        <script crossorigin src="https://cdn.jsdelivr.net/npm/react@16/umd/react.production.min.js"></script>
        <script crossorigin src="https://cdn.jsdelivr.net/npm/react-dom@16/umd/react-dom.production.min.js"></script>
    <?php
    } ?>
</head>

<body>
    <div id="root"></div>
    <script src="<?php echo get_template_directory_uri() ?>/build/bundle.js"></script>
    <?php wp_footer() ?>
</body>

</html>
<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'p4ssw0rd!');

/** MySQL hostname */
define('DB_HOST', 'wprestdb:3306');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '00a43d0c554657d0396e1ff65be5421243c0b748');
define('SECURE_AUTH_KEY',  '2fb22193d134d8ef1813357c3ae563642ee57b1a');
define('LOGGED_IN_KEY',    'bdb05d71d4099305527e3ad9a866443f1e4e894c');
define('NONCE_KEY',        '87efa126742801b9d43706bf94f6b95218816ed3');
define('AUTH_SALT',        '835a52ce9ffc568f494402616cf50820f275167a');
define('SECURE_AUTH_SALT', '02c7f0ebbaed7a47b838bb78e8a29dc2fad77ee6');
define('LOGGED_IN_SALT',   '3c6bc8099695ef109e2b142be4951b88e19c5a24');
define('NONCE_SALT',       'ca5a8809de4547c6d60e3401a365b08005caa06a');

# JWT
define('JWT_AUTH_SECRET_KEY', 'kTDBEB-gk5b-Uq-Aav;/!N58IS)PBEpT)00W/ol6Yr&@%Mg_-&8<Gk!{cY:e|.zo');
define('JWT_AUTH_CORS_ENABLE', true);

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', true);
define( 'WP_DEBUG_DISPLAY', false);
define( 'WP_DEBUG_LOG', true);
@ini_set('display_errors',0);

// If we're behind a proxy server and using HTTPS, we need to alert Wordpress of that fact
// see also http://codex.wordpress.org/Administration_Over_SSL#Using_a_Reverse_Proxy
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
	$_SERVER['HTTPS'] = 'on';
}


/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

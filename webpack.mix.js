const mix = require('laravel-mix');
require('mix-env-file');

mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

// Copy into dist folder for production
if (mix.inProduction()) {
    mix.env(process.env.ENV_FILE);

	// App
	mix.copyDirectory('app', 'dist/zcms/app');
    mix.copyDirectory('bootstrap', 'dist/zcms/bootstrap');
	mix.copyDirectory('config', 'dist/zcms/config');
	mix.copyDirectory('database', 'dist/zcms/database');
	mix.copyDirectory('resources', 'dist/zcms/resources');
	mix.copyDirectory('routes', 'dist/zcms/routes');
    // mix.copyDirectory('storage', 'dist/zcms/storage');
	mix.copyDirectory('tests', 'dist/zcms/tests');

	// Public
	mix.copyDirectory('public/css', 'dist/zcms.angelin.dev/css');
	mix.copyDirectory('public/js', 'dist/zcms.angelin.dev/js');
}
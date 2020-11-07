const mix = require('laravel-mix');
require('mix-env-file');

// Copy into dist folder for production
if (mix.inProduction()) {
    mix.env(process.env.ENV_FILE);

	// App
	mix.copyDirectory('app', 'dist/tph/app');
    mix.copyDirectory('bootstrap', 'dist/tph/bootstrap');
	mix.copyDirectory('config', 'dist/tph/config');
	mix.copyDirectory('database', 'dist/tph/database');
	mix.copyDirectory('resources', 'dist/tph/resources');
	mix.copyDirectory('routes', 'dist/tph/routes');
    // mix.copyDirectory('storage', 'dist/tph/storage');
	mix.copyDirectory('tests', 'dist/tph/tests');

	// Public
	mix.copyDirectory('public/css', 'dist/tph.angelin.dev/css');
	mix.copyDirectory('public/js', 'dist/tph.angelin.dev/js');
}

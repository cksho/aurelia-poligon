/*
 * Init Browsersync static files server
 * http://www.browsersync.io/
 */

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var modRewrite = require('connect-modrewrite');


gulp.task('startBrowserSync', function () {
    return browserSync.init({
        server: {
            baseDir: global.path.src,
            index:"index.html",
            middleware:[modRewrite(['^[^\\.]*$ /index.html [L]'])],
            routes: {
                '/jspm_packages': './jspm_packages',
                '/jspm_packages/': './jspm_packages/',
                '/vendor': './',
            },
        },
        directory: false,
        port: 9000,
        notify: false,
    });
});

gulp.task('serve', gulpSequence('html', 'sass', 'watch', 'startBrowserSync'));

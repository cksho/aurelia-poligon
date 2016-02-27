/*
 * Init Browsersync static files server
 * http://www.browsersync.io/
 */

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('startBrowserSync', function () {
    return browserSync.init({
        server: {
            baseDir: global.path.src,
            routes: {
                '/jspm_packages': './jspm_packages',
                '/jspm_packages/': './jspm_packages/',
                '/vendor': './'
            },
        },
        directory: true,
        port: 9000,
        notify: true
    });
});

gulp.task('serve', gulpSequence('html', 'sass', 'watch', 'startBrowserSync'));

/*
 * Gulp watch task
 * https://github.com/gulpjs/gulp/blob/master/docs/API.md
 */

var gulp = require('gulp');

gulp.task('watch', function () {
    // watch tasks
    gulp.watch(global.path.html, ['html', browserSync.reload]);
    gulp.watch(global.path.scss, ['sass']);
    gulp.watch(global.path.js, browserSync.reload);
    gulp.watch(global.path.schema, ['jsonschema', 'html', browserSync.reload]);
});
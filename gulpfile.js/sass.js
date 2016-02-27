/*
 * Generate CSS from SASS
 * https://github.com/dlmanning/gulp-sass
 */

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var handleErrors = require('./lib/errors');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// Compile SASS into CSS
gulp.task('sass', function () {
    return gulp.src(global.path.scss)
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(global.path.css))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

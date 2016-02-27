/*
 * Build task
 *
 */

var gulp = require('gulp');
var exec = require('child_process').execSync;
var plumber = require('gulp-plumber');
var path = require('path');
var fs = require('fs');
var handleErrors = require('./lib/errors');

var nunjucks = require('gulp-nunjucks-html');
var frontMatter = require('gulp-front-matter');
var data = require('gulp-data');
var rename = require("gulp-rename");
var gulpSequence = require('gulp-sequence');
var del = require('del');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var nunjucksOpts = {
    searchPaths: [global.path.src],
    locals: { enviroment: 'production' }
};

gulp.task('cleanDist', function () {
  return del([
    'dist/**/*',
  ]);
});

gulp.task('copyImages', function() {
    gulp.src('./src/images/**/*')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('copyFonts', function() {
    gulp.src('./src/fonts/**/*')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copyFavicon', function () {
    gulp.src('./src/*.ico')
        .pipe(gulp.dest('./dist/'))
});

// Build SASS into CSS
gulp.task('buildcss', function () {
    return gulp.src(global.path.scss)
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css'));
});

// Build JS for distribution.
gulp.task('buildjs', function () {
    exec('jspm bundle-sfx src/_app/app.js dist/scripts/app.min.js --minify --skip-source-maps', function (err, stdout, stderr) {
        if (err) {
            throw err;
        }
        else {
            console.log(stdout);
        }
    });
});

// Nunjucks to HTML template
gulp.task('buildhtml', function () {
    return gulp.src('src/_pages/*.html.twig')
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(data(function (file) {
            var jsonFile = global.path.json + path.basename(file.path, '.html.twig') + '.json';
            if (fs.existsSync(jsonFile)) {
                return JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
            } else {
                return {}
            }
        }))
        .pipe(frontMatter({
            property: 'frontMatter',
            remove: true
        }))
        .pipe(nunjucks(nunjucksOpts))
        .pipe(rename({
            extname: ''
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', gulpSequence('cleanDist', 'copyImages', 'copyFonts', 'copyFavicon',  ['buildhtml', 'buildjs', 'buildcss']));

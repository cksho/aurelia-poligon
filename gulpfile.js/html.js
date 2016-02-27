/*
 * Generate html files from nunjucks templates
 * https://mozilla.github.io/nunjucks/
 */

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var path = require('path');
var fs = require('fs');
var handleErrors = require('./lib/errors');

var nunjucks = require('gulp-nunjucks-html');
var frontMatter = require('gulp-front-matter');
var data = require('gulp-data');
var rename = require("gulp-rename");

var nunjucksOpts = {
    searchPaths: [global.path.src],
    setUp: function(env) {
      env.addFilter('greet', function(name) {
        return 'Hello ' + name;
      });
      return env;

}}

// Nunjucks to HTML template
gulp.task('html', function () {
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
        .pipe(gulp.dest('src'))
        .pipe(browserSync.stream());
});

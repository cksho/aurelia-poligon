/*
 * Generate json files from json schemas
 * https://www.npmjs.com/package/json-schema-faker
 * http://jsonschema.net/#/
 */

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var jsf = require('json-schema-faker');
var data = require('gulp-data');

jsf.extend('faker', function () {
    var faker = require('faker/locale/pl');
    return faker;
});

gulp.task('jsonschema', function () {
    return gulp.src('src/_schema/*.json')
        .pipe(data(function (file) {
            var filename = path.basename(file.path, '.json');
            var schemaConfig = JSON.parse(file.contents);
            fs.writeFileSync(global.path.json + filename + '.json', JSON.stringify(jsf(schemaConfig)));
        }))
        .pipe(browserSync.stream());
});

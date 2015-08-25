// ## Build and development tasks


var docco = require('gulp-docco');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');


// Files to include in the test suite.
var TEST_FILES = ['tests/*.js'];


// Source files to watch for changes (e.g. for regenerating documentation).
var SOURCE_FILES = ['gulpfile.js', 'src/*.js'];


// Files to generate documentation from.
var DOCUMENTATION_SOURCES = SOURCE_FILES.concat(TEST_FILES);


// These tasks are performed whenever gulp is executed without arguments.
gulp.task('default', [
  'regenerate-docs',
  'test',
]);


// Automatically regenerate documentation when the sources change.
gulp.task('regenerate-docs', function () {
  gulp.src(DOCUMENTATION_SOURCES)
    .pipe(docco())
    .pipe(gulp.dest('./docs'));

  watch(DOCUMENTATION_SOURCES)
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});


// Run the test suite.
gulp.task('test', function () {
  gulp.src(TEST_FILES, { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

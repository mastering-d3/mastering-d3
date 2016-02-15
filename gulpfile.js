// Gulpfile

// Include the required packages
var path       = require('path');
var del        = require('del');
var gulp       = require('gulp');
var stylus     = require('gulp-stylus');
var Metalsmith = require('metalsmith');
var layouts    = require('metalsmith-layouts');
var markdown   = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');

// Tasks
// -----

// Compile the styles
gulp.task('stylus', ['clean'], function() {
  return gulp.src('./src/stylus/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./html/css'));
});

// Compile the content
gulp.task('metalsmith', ['clean'], function() {
  Metalsmith(__dirname)
    .source('src')
    .destination('html')
    .ignore([
      'templates',
      'stylus'
    ])
    .use(markdown())
    .use(layouts({
      engine: 'handlebars',
      directory: './src/templates'
    }))
    .use(permalinks(''))
    .build(function(err) {
      if (err) { throw err; }
    });
});

// Delete the compiled assets
gulp.task('clean', function() {
  return del(['html']);
});

gulp.task('build', ['stylus', 'metalsmith']);

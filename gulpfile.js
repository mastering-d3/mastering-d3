// Gulpfile

var gulp       = require('gulp');
var plugin     = require('gulp-load-plugins')();
var stylish    = require('jshint-stylish');
var Metalsmith = require('metalsmith');
var layouts    = require('metalsmith-layouts');
var markdown   = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');


gulp.task('clean', plugin.shell.task([
  'rm -rf html/'
]));


gulp.task('jshint', function() {
  gulp.src(['src/**/*.js'])
    .pipe(plugin.watch('src/**/*.js'))
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter(stylish));
});


gulp.task('stylus', ['clean'], function() {
  gulp.src('./src/stylus/main.styl')
    .pipe(plugin.plumber())
    .pipe(plugin.stylus())
    .pipe(gulp.dest('./html/css'));
});


gulp.task('metalsmith', ['clean'], function() {
  Metalsmith(__dirname)
    .source('src')
    .destination('html')
    .ignore(['templates', 'stylus'])
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


gulp.task('default', ['build']);
gulp.task('build', ['stylus', 'metalsmith']);

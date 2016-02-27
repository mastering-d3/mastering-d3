// Gulpfile

var gulp       = require('gulp');
var plugin     = require('gulp-load-plugins')();
var stylish    = require('jshint-stylish');
var Metalsmith = require('metalsmith');
var layouts    = require('metalsmith-layouts');
var markdown   = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');


gulp.task('clean', ['clean:html', 'clean:css', 'clean:js']);

gulp.task('clean:html', plugin.shell.task([
  'rm -rf html/chapters/**',
  'rm -rf html/index.html'
]));

gulp.task('clean:css', plugin.shell.task([
  'rm -rf html/css/'
]));

gulp.task('clean:js', plugin.shell.task([
  'rm -rf html/js/'
]));

gulp.task('jshint', function() {
  gulp.src(['src/**/*.js'])
    .pipe(plugin.watch('src/**/*.js'))
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter(stylish));
});


gulp.task('stylus', ['clean:css'], function() {
  gulp.src('./src/stylus/main.styl')
    .pipe(plugin.plumber())
    .pipe(plugin.stylus())
    .pipe(gulp.dest('./html/css'));
});


gulp.task('metalsmith', ['clean:html'], function() {
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

gulp.task('copy:js', function() {
  gulp.src('node_modules/d3/d3.js')
    .pipe(plugin.copy('html/js', {prefix: 2}));
});

gulp.task('copy:css', function() {
  gulp.src('node_modules/skeleton-css/css/*.css')
    .pipe(plugin.copy('html/css', {prefix: 3}));
});


gulp.task('watch', function() {
  plugin.livereload.listen({start: true});
  gulp.watch('src/**/*.md', ['metalsmith']);
});


gulp.task('default', ['build']);
gulp.task('build', ['stylus', 'metalsmith', 'copy:js', 'copy:css']);

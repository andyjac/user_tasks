var gulp = require('gulp');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');

gulp.task('lint:server', function() {
  return gulp.src(['./app.js', './gulpfile.js'])
    .pipe(plumber())
    .pipe(jshint({ node: true }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('nodemon', ['lint:server'], function() {
  return nodemon({
    script: './app.js',
    ignore: ['./public/**/']
  })
    .on('restart', function() {
      console.log('server restarting...');
    });
});

gulp.task('watch', function() {
  gulp.watch('./app.js', ['lint:server']);
});

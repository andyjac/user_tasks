var gulp = require('gulp');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');
var merge = require('merge-stream');
var webpack = require('gulp-webpack');

gulp.task('lint:server', function() {
  return gulp.src(['./app.js', './gulpfile.js'])
    .pipe(plumber())
    .pipe(jshint({ node: true }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('nodemon', ['lint:server'], function() {
  return nodemon({
    script: 'app.js',
    ext: 'js'
  })
    .on('restart', function() {
      console.log('server restarting...');
    });
});

gulp.task('client', function() {
  var html = gulp.src('./public/**/*.html')
      .pipe(gulp.dest('./dist'));

  var css = gulp.src('./public/**/*.css')
      .pipe(gulp.dest('./dist'));

  var build = gulp.src('./public/js/index.js')
      .pipe(webpack({
        module: {
          loaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
              presets: ['es2015', 'react']
            }
          }]
        },
        output: {
          filename: 'bundle.js'
        }
      }))
      .pipe(gulp.dest('./dist'));


  merge(html, css, build);
});

gulp.task('watch', function() {
  gulp.watch('./app.js', ['lint:server']);
  gulp.watch('./public/**/*', ['client']);
});

gulp.task('default', ['client', 'watch']);

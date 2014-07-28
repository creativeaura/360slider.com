var gulp = require('gulp')

var less = require('gulp-less');
var path = require('path');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8000
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('less', function () {
  gulp.src('./app/css/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});

gulp.task('lint', function() {
  return gulp.src('./app/js/**/*.js')
  	.pipe(jshint())
  	.pipe(jshint.reporter('default'));
});


// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('app/css/**/*.less', ['less']);
  gulp.watch('app/js/**/*.js', ['lint']);
  gulp.watch(['./app/*.html'], ['html']);
});

// Default Task
gulp.task('default', ['connect', 'watch']);
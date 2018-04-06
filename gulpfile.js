'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
maps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer');

gulp.task('compileSass', function() {
  return gulp.src('sass/style.scss')
  .pipe(maps.init())
  .pipe(sass())
  .pipe(autoprefixer( 'last 2 versions' ))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('css'));
});


gulp.task('watch', function(){
  gulp.watch('sass/*.scss', { interval: 750 }, ['compileSass']);
});

gulp.task('default',['watch']);

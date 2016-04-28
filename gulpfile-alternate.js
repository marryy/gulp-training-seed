'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    config = require('./gulp/config'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    refresh = require('gulp-livereload'),
    lr = require('tiny-lr'),
    browserify = require('gulp-browserify'),
    embedlr = require('gulp-embedlr'),
    server = lr(),
    inlineSource = require('gulp-inline-source'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    paths = {
      js: ['app/js/**/*.js', '!bower_components/**', '!node_modules/**', '!app/js/less.js', '!app/js/**/*.json', '!app/js/app.js'],
      html: ['app/partials/**/*.html', 'app/templates/*.html',],
      less: ['app/styles/**/*.less']
    };

gulp.task('styles', function() {
  gulp.src(paths.less)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(concat('styles.less'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(refresh(server))
});

gulp.task('scripts', function() {
  gulp.src(paths.js)
    .pipe(browserify())
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(refresh(server))
});

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(embedlr())
    .pipe(gulp.dest('dist/html'))
    .pipe(refresh(server));
})

gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('inlineSource', function () {
  return gulp.src('app/**/*.html')
    .pipe(inlineSource())
    .pipe(gulp.dest('./dist/html'));
});

gulp.task('ngAnnotate', function () {
	return gulp.src('app/js/app.js')
		.pipe(ngAnnotate())
    .pipe(browserify())
    .pipe(uglify())
    .pipe(concat('scripts.js'))
		.pipe(gulp.dest('dist/scripts'));
});

gulp.task('build', function() {
  gulp.run('styles', 'scripts', 'html', 'inlineSource', 'ngAnnotate');

  gulp.watch(paths.js, function(event) {
    gulp.run('scripts');
  })

  gulp.watch(paths.less, function(event) {
    gulp.run('styles');
  })

  gulp.watch(paths.html, function(event) {
    gulp.run('html');
  })
});

gulp.task('default', ['build'])

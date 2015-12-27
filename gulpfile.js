var gulp = require("gulp");
var watch = require('gulp-watch');
var sass = require("gulp-sass");
var uglify = require('gulp-uglify');
var spritesmith = require('gulp.spritesmith');
var webpack = require('webpack-stream');
var config = require('./webpack.config');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('es6', function() {
  return gulp.src("src/es6/*.js")
    .pipe(webpack(config))
    .pipe(gulp.dest("dist"))
    .pipe(reload({stream: true}));
});

gulp.task('sass', function() {
  return gulp.src("src/scss/main.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist"))
    .pipe(reload({stream: true}));
});

gulp.task('sprite', function () {
  return gulp.src('src/image/*.png')
    .pipe(spritesmith({ imgName: 'sprite.png', cssName: 'sprite.css' }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', ['es6', 'sass', 'sprite'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("src/image/*.png", ['sprite']);
  gulp.watch("src/**/*.js", ['es6']);
  gulp.watch("src/**/*.scss", ['sass']);
  gulp.watch("*.html").on('change', reload);
});

gulp.task("default", ['serve']);

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Компіляція SCSS і перенесення в папку css
function styles() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

// Об'єднання і мініфікація JavaScript
function scripts() {
  return gulp.src('src/js/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

// Оптимізація зображень
function images() {
  return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
}

// Сервер для автоматичного оновлення браузера
function serve() {
  browserSync.init({
    server: "./"
  });
  gulp.watch("src/scss/*.scss", styles);
  gulp.watch("src/js/*.js", scripts);
  gulp.watch("src/img/*", images).on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.serve = serve;
exports.build = gulp.series(styles, scripts, images);
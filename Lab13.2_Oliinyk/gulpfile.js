const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Компіляція SCSS
function styles() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

// Сервер для автоматичного оновлення браузера
function serve() {
  browserSync.init({
    server: "./"
  });
  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch("*.html").on('change', browserSync.reload);
}

exports.styles = styles;
exports.serve = serve;
exports.build = gulp.series(styles);
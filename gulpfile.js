const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

gulp.task('pug', () => {
  gulp.src('src/views')
    .pipe(pug())
    .dist('dist');
});

gulp.task('sass', () => {
  gulp.src('src/scss')
    .pipe(sass())
    .dist('dist/css');
});

gulp.task('default', () => {
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
  gulp.watch(['src/views/index.pug'], ['pug']);
});

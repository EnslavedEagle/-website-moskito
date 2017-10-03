const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const pug = require('gulp-pug');

gulp.task('pug', () => {
  gulp.src('src/views/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', () => {
  gulp.src('src/sass/index.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', () => {
  gulp.run('pug');
  gulp.run('sass');
  gulp.watch(['./src/scss/index.scss'], ['sass']);
  gulp.watch(['./src/views/index.pug'], ['pug']);
});

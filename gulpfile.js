const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const copy = require('gulp-copy');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const connect = require('gulp-connect');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

const imageExtensions = '{png,gif,jpg,jpeg}';
const fontExtensions = '{eot,svg,ttf,otf,woff,woff2}';

gulp.task('pug', () => {
  gulp.src('src/views/{index,oferta,historia,kontakt}.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('sass', () => {
  gulp.src('src/sass/index.scss')
    .pipe(sass({
      outputStyle: 'pretty'
    }))
    .pipe(rename('style.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('images', () => {
  return gulp.src(`dist/assets/img/**/*.${imageExtensions}`)
    .pipe(clean({ force: true }))
    .on('end', () => {
      gulp.src(`src/img/**/*.${imageExtensions}`)
        .pipe(imagemin([
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 })
        ]))
        .pipe(gulp.dest('./dist/assets/img'))
        .pipe(connect.reload());
  });
});

gulp.task('javascript', () => {
  gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('fonts', () => {
  gulp.src(`src/fonts/**/*.${fontExtensions}`)
    .pipe(copy('dist/assets/fonts', { prefix: 2 }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('webserver', () => {
  connect.server({
    port: 3006,
    livereload: true
  });
  console.log('Server started.');
});

gulp.task('watch', () => {
  gulp.watch(['./src/sass/**/*.scss'], ['sass']);
  gulp.watch(['./src/views/**/*.pug'], ['pug']);
  gulp.watch([`./src/fonts/**/*.${fontExtensions}`], ['fonts']);
  gulp.watch(['./src/js/**/*.js'], ['javascript']);
  gulp.watch([`src/img/**/*.${imageExtensions}`], ['images']);
});

gulp.task('build', ['pug', 'sass', 'fonts', 'javascript', 'images']);
gulp.task('default', ['build', 'webserver', 'watch']);

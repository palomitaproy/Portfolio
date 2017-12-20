
const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const nodemon = require('gulp-nodemon')

const PORT = 3000

gulp.task('serve', ['nodemon', 'sass'], () => {

    browserSync.init({
      proxy: {
        target: "localhost:3000",
        proxyReq: [
          function(proxyReq) {
            proxyReq.setHeader('X-Forwarded-Host', 'localhost:8000');
          }
        ],
      },
      port: 8000,
      open: false,
      ui: {
        port: 8001
      },

    });

  gulp.watch(`./views/**/**/*.pug`).on('change', browserSync.reload);
  gulp.watch(`./public/**/**/*.sass`, ['sass']);
});

gulp.task('sass', () => {
  return gulp.src(`./public/stylesheets/style.sass`)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(`./public/stylesheets/`))
    .pipe(browserSync.stream());
});

gulp.task('nodemon', () => {
  nodemon({
    script: './bin/www',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default', ['serve']);

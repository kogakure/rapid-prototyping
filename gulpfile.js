var gulp         = require('gulp');
var browsersync  = require('browser-sync');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
var precss       = require('precss');
var sourcemaps   = require('gulp-sourcemaps');
var stylelint    = require('stylelint');
var reporter     = require('postcss-reporter');

var lost         = require('lost');
var hexRGBA      = require('postcss-hexrgba');
var autoprefixer = require('autoprefixer');
var mqpacker     = require('css-mqpacker');

var processors = [
  precss(),
  lost(),
  hexRGBA(),
  autoprefixer({
    browsers: [
      'last 2 versions',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ],
    cascade: true
  }),
  mqpacker(),
];

function onError(err) {
  console.log(err);
  this.emit('end');
}

/**
 * Start watch task
 */
gulp.task('default', ['watch']);

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch', ['browsersync'], function() {
  gulp.watch('postcss/**/*.css', ['lint-styles']);
});


/**
 * Run the build task and start a server with BrowserSync
 */
gulp.task('browsersync', function() {
  browsersync({
    server: {
      baseDir: ['./templates/', './css/', './postcss/']
    },
    port: 9898,
    open: false,
    files: ['css/*.css', 'templates/*.html']
  });
});


/**
 * Rund CSS through PostCSS and it's plugins
 * Build sourcemaps
 */
gulp.task('styles', function() {
  browsersync.notify('Transforming CSS with PostCSS');

  return gulp.src('postcss/*.css')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css/'));
});


/**
 * Lint PostCSS
 */
gulp.task('lint-styles', ['styles'], function() {
  return gulp.src([
    './postcss/**/*.css',
    '!./postcss/vendor/*.css' // Don't lint files in a vendor/ folder
  ])
  .pipe(postcss([
    stylelint(),
    reporter({ clearMessages: true })
  ]));
});

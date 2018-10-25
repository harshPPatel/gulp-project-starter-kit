var gulp          = require('gulp'),
    htmlmin       = require('gulp-htmlmin'),
    cleanCSS      = require('gulp-clean-css'),
    uglify        = require('gulp-uglify'),
    pump          = require('pump'),
    concat        = require('gulp-concat'),
    sass          = require('gulp-sass'),
    imagemin      = require('gulp-imagemin'),
    autoprefixer  = require('gulp-autoprefixer'),
    plumber       = require('gulp-plumber'),
    browserSync   = require('browser-sync');

var htmlSource = 'source/*.html',
    htmlDestination = 'build/',
    cssVendorSource = 'source/css/*.css',
    sassSource = 'source/sass/**/*.sass',
    cssDestination = 'build/assets/css/',
    jsVendorSource = 'source/js/vendors/*.js'
    jsAppSource = 'source/js/*.js'
    jsDestination = 'build/assets/js/'
    imgSource = 'source/img/*',
    imgDestination = 'build/assets/img/',
    faviconSource = 'source/favicon/*',
    faviconDestination = 'build/assets/favicon/';


// html minify and copy to build folder
gulp.task('html', function() {
  gulp.src(htmlSource)
    .pipe(plumber())
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(htmlDestination))
})

//Minify Vendor Css and Concat them
gulp.task('minify-css', () => {
  return gulp.src(cssVendorSource)
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: ["cover 99.5%"]
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest(cssDestination));
})

//sass
gulp.task('sass', function() {
  return gulp.src(sassSource)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(cssDestination))
})

//vendor js
gulp.task('vendorjs', function (cb) {
  pump([
        gulp.src(jsVendorSource),
        plumber(),
        concat('vendors.js'),
        uglify(),
        gulp.dest(jsDestination)
    ],
    cb
  );
});

//app js
gulp.task('appjs', function (cb) {
  pump([
        gulp.src(jsAppSource),
        plumber(),
        uglify(),
        gulp.dest(jsDestination)
      ],
    cb
  );
});

//image minify
gulp.task('img-minify', () => {
  gulp.src(imgSource)
    .pipe(imagemin())
    .pipe(plumber())
    .pipe(gulp.dest(imgDestination));
})

//favicon minify
gulp.task('favicon', () => {
  gulp.src(faviconSource)
    .pipe(imagemin())
    .pipe(plumber())
    .pipe(gulp.dest(faviconDestination));
})

//watch task
gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './build'
    },
    notify: false
  });

  gulp.watch(htmlSource, ['html']);
  gulp.watch(cssVendorSource, ['minify-css']);
  gulp.watch(jsVendorSource, ['vendorjs']);
  gulp.watch(jsAppSource, ['appjs']);
  gulp.watch(imgSource, ['img-minify']);
  gulp.watch(faviconSource, ['favicon']);
  gulp.watch(sassSource, ['sass']);
  gulp.watch([
    'build/*.html',
    'build/assets/css/*.css',
    'build/assets/js/*.js',
    'build/assets/img/*',
    'build/assets/favicon/*',
  ]).on('change', browserSync.reload);
})


// Gulp Default Task
gulp.task('default', ['html', 'minify-css', 'vendorjs', 'appjs', 'img-minify', 'favicon', 'sass', 'watch']);

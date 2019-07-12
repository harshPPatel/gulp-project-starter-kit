const {
  series,
  src,
  dest,
  watch
} = require('gulp');

// htmlmin = require('gulp-htmlmin'),
// cleanCSS = require('gulp-clean-css'),
// uglify = require('gulp-uglify'),
// pump = require('pump'),
// concat = require('gulp-concat'),
// sass = require('gulp-sass'),
// imagemin = require('gulp-imagemin'),
// autoprefixer = require('gulp-autoprefixer'),
// plumber = require('gulp-plumber'),
// browserSync = require('browser-sync'),
// pug = require('gulp-pug');

// var pugSource = 'source/pug/*.pug',
//   sassSource = 'source/sass/**/*.sass',
//   jsVendorSource = 'source/js/vendors/*.js'
// jsMainSource = 'source/js/*.js'
// imageSource = 'source/img/*'
// faviconSource = 'source/favicon/*',
//   jsonSource = 'source/json/*.json';

// var htmlDestination = 'build/',
//   cssDestination = 'build/assets/css/',
//   jsDestination = 'build/assets/js/'
// imageDestination = 'build/assets/img/'
// faviconDestination = 'build/assets/favicon/',
//   jsonDestination = 'build/assets/json/';


const htmlSource = './source/*.html';
const imageSource = './source/images/*';

const htmlDestination = './public/';
const imageDestination = './public/assets/images/';

const htmlTask = (cb) => {
  return src(htmlSource)
    .pipe(dest(htmlDestination));
  cb();
};

const imageTask = (cb) => {
  return src(imageSource)
    .pipe(dest(imageDestination));
  cb();
};

exports.default = series(htmlTask, imageTask);
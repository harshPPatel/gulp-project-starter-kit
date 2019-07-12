const {
  series,
  src,
  dest,
  watch
} = require('gulp');

const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

const htmlSource = './source/*.html';
const imageSource = './source/images/*';
const javaScriptSource = './source/js/*.js';

const htmlDestination = './public/';
const imageDestination = './public/images/';
const javaScriptDestination = './public/js/';

const htmlTask = (cb) => {
  return src(htmlSource)
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      collapseInlineTagWhitespace: true,
    }))
    .pipe(dest(htmlDestination));
  cb();
}

const imageTask = (cb) => {
  return src(imageSource)
    .pipe(imagemin())
    .pipe(dest(imageDestination));
  cb();
};

const javaScriptTask = (cb) => {
  return src(javaScriptSource)
    .pipe(concat('app.min.js'))
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(sourcemaps.init())
    .pipe(terser({
      keep_fnames: false,
      keep_classnames: false,
      mangle: true,
      ie8: true,
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(javaScriptDestination));
  cb();
}

exports.build = series(htmlTask, imageTask, javaScriptTask);
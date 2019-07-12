const {
  series,
  src,
  dest,
  watch
} = require('gulp');

const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

const htmlSource = './source/*.html';
const imageSource = './source/images/*';

const htmlDestination = './public/';
const imageDestination = './public/assets/images/';

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

exports.build = series(htmlTask, imageTask);
const {
  series,
  src,
  dest,
  watch
} = require('gulp');
const htmlmin = require('gulp-htmlmin');

const htmlSource = './source/*.html';

const htmlDestination = './public/';

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

exports.build = series(htmlTask);
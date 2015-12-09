'use strict';

const gulp = require('gulp'),
      path = require('path'),
      inject = require('gulp-inject'),
      htmlmin = require('gulp-html-minifier'),
      config = require('../config');

gulp.task('inject-html', ['compile-js', 'compile-css', 'copy-libs'], () => {
    const sourceFiles = gulp.src(config.src.css.libs.map(filePath => path.join(config.folderNames.outputLibs, filePath.replace(config.folderNames.bower, '')))
                                               .concat(config.fileNames.outputJs)
                                               .concat(path.join(config.folderNames.outputCss, '*.css'))
                                               .map(filePath => path.join(config.baseDir.dest, filePath)), {read: false});

    return gulp.src(config.src.html.main)
               .pipe(inject(sourceFiles, {relative: true, ignorePath: `../${config.baseDir.dest}`}))
               .pipe(htmlmin(config.htmlMinifyConfig))
               .pipe(gulp.dest(config.baseDir.dest));
});
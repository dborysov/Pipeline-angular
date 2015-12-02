'use strict';

const gulp = require('gulp'),
      path = require('path'),
      sass = require('gulp-sass'),
      uglifycss = require('gulp-uglifycss'),
      config = require('../../config');

gulp.task('compile-css', ['del-dist'], () =>
    gulp.src(config.src.sass.custom)
        .pipe(sass())
        .pipe(uglifycss())
        .pipe(gulp.dest(path.join(config.baseDir.dest, config.folderNames.outputCss))));
'use strict';

const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const config = require('../../config');

gulp.task('compile-css', ['del-dist'], () =>
    gulp.src(config.src.sass.custom)
        .pipe(sass())
        .pipe(uglifycss())
        .pipe(gulp.dest(path.join(config.baseDir.dest, config.folderNames.outputCss))));
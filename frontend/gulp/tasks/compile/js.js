'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const config = require('../../config');

gulp.task('compile-js', ['del-dist'], () =>
    browserify(config.src.ts.mainFile, { debug: true })
        .plugin(tsify)
        .bundle()
        .pipe(source(config.fileNames.outputJs))
        .pipe(streamify(sourcemaps.init({ loadMaps: true })))
            .pipe(streamify(uglify()))
        .pipe(streamify(sourcemaps.write('.')))
        .pipe(gulp.dest(config.baseDir.dest))
    );
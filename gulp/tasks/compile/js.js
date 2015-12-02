'use strict';

const gulp = require('gulp'),
      browserify = require('browserify'),
      tsify = require('tsify'),
      source = require('vinyl-source-stream'),
      streamify = require('gulp-streamify'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
      config = require('../../config');

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
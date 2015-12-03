'use strict';

const gulp = require('gulp'),
      path = require('path'),
      config = require('../../config');

gulp.task('copy-npm-libs', ['del-dist'], () => {
    const libs = config.src.npmLibs.map(filePath => `${config.folderNames.npm}/${filePath}`),
          dest = path.join(config.baseDir.dest, config.folderNames.outputLibs);

    return gulp.src(libs, { base: config.folderNames.npm })
               .pipe(gulp.dest(dest))
});
'use strict';

const gulp = require('gulp'),
      path = require('path'),
      config = require('../../config');

gulp.task('copy-libs', ['bower-install', 'del-dist'], () => {
    const libs = config.src.css.libs,
          dest = path.join(config.baseDir.dest, config.folderNames.outputLibs);

    return gulp.src(libs, { base: config.folderNames.bower })
               .pipe(gulp.dest(dest));
});
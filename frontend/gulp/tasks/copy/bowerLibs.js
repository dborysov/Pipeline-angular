'use strict';

const gulp = require('gulp'),
      path = require('path'),
      config = require('../../config');

gulp.task('copy-bower-libs', ['del-dist'], () => {
    const libs = config.src.bowerLibs.map(filePath => `${config.folderNames.bower}/${filePath}`),
          dest = path.join(config.baseDir.dest, config.folderNames.outputLibs);

    return gulp.src(libs, { base: config.folderNames.bower })
               .pipe(gulp.dest(dest))
});
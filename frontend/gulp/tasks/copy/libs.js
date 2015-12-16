'use strict';

const gulp = require('gulp');
const path = require('path');
const config = require('../../config');

gulp.task('copy-libs', ['del-dist'], () => {
    const libs = config.src.css.libs.map(lib => path.join(config.folderNames.nodeModules, lib));
    const dest = path.join(config.baseDir.dest, config.folderNames.outputLibs);

    return gulp.src(libs, { base: config.folderNames.nodeModules })
               .pipe(gulp.dest(dest));
});
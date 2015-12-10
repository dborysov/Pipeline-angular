'use strict';

const gulp = require('gulp');
const path = require('path');
const config = require('../../config');

gulp.task('copy-libs', ['bower-install', 'del-dist'], () => {
    const libs = config.src.css.libs;
    const dest = path.join(config.baseDir.dest, config.folderNames.outputLibs);

    return gulp.src(libs, { base: config.folderNames.bower })
               .pipe(gulp.dest(dest));
});
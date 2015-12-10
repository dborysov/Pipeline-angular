'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp/tasks', { recurse: true });

gulp.task('default', ['inject-html']);
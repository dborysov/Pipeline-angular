'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');

gulp.task('connect', () => connect.server({
    root: 'dist'
}));
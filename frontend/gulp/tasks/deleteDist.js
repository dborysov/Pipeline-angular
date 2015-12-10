'use strict';

const gulp = require('gulp');
const del = require('del');
const config = require('../config');

gulp.task('del-dist', () => del(config.baseDir.dest));
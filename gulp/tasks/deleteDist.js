'use strict';

const gulp = require('gulp'),
      del = require('del'),
      config = require('../config');

gulp.task('del-dist', () => del(config.baseDir.dest));
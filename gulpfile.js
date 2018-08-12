'use strict'

let gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    requireDir  = require('require-dir');

requireDir('./lib/gulp/tasks', { recurse: true });

global.isProduction = false;
// global.isProduction = process.env.NODE_ENV === 'production';

gulp.task('dev', gulp.series('clean', 'server', 'watch'));
gulp.task('build', gulp.series('clean', 'styles', 'scripts', 'images', 'html'));

gulp.task('default', gulp.series('dev'));

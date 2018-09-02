'use strict'

let gulp            = require('gulp'),
    notify          = require('gulp-notify'),
    gulpif          = require('gulp-if'),
    browserSync     = require('browser-sync'),
    config          = require('../config');

gulp.task('watch', gulp.parallel('styles', 'scripts', 'images', 'html', 'copy', (done) => {
    gulp.watch(config.path.watch.all, gulp.series('clean', 'styles', 'scripts', 'images', 'html', 'copy'));
    done();
}));

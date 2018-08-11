'use strict'

let syntax = 'sass';

let gulp            = require('gulp'),
    notify          = require('gulp-notify'),
    gulpif          = require('gulp-if'),
    browserSync     = require('browser-sync'),
    config          = require('../config');


gulp.task('watch', gulp.parallel('styles', 'scripts', 'images', 'html', (done) => {
    // TODO : отслеживание изменений в исходниках
    done();
}));

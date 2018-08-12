'use strict'

let gulp    = require('gulp'),
    notify  = require('gulp-notify'),
    cache   = require('gulp-cache'),
    clean   = require('gulp-clean'),
    config  = require('../config');

gulp.task('clean', (done) => {
    return gulp.src(config.path.dist, { read: false })
        .pipe(clean());

    done();
});

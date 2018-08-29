'use strict'

let gulp            = require('gulp'),
    notify          = require('gulp-notify'),
    gulpif          = require('gulp-if'),
    imagemin        = require('gulp-imagemin'),
    cache           = require('gulp-cache'),
    browserSync     = require('browser-sync'),
    config          = require('../config');

gulp.task('images', (done) => {
    return gulp.src([
            config.path.src.img + '/**/*'
        ])
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(config.path.dist + 'img/'))
        .pipe(browserSync.stream());

    done();
});

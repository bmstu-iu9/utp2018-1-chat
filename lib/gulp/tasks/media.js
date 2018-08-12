'use strict'

let gulp            = require('gulp'),
    notify          = require('gulp-notify'),
    browserSync     = require('browser-sync'),
    config          = require('../config');

gulp.task('media', (done) => {
    gulp.src(config.path.src.media + '*')
        .pipe(gulp.dest(config.path.dist + 'media/'))
        .pipe(browserSync.reload({
            stream: true
        }));

    done();
});

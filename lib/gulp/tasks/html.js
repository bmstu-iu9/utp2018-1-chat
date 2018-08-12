'use strict'

let gulp            = require('gulp'),
    notify          = require('gulp-notify'),
    gulpif          = require('gulp-if'),
    browserSync     = require('browser-sync'),
    htmlmin         = require('gulp-htmlmin'),
    config          = require('../config');

gulp.task('html', (done) => {
    gulp.src(config.path.src.html + '*.html')
        .pipe(gulpif(isProduction, htmlmin( { collapseWhitespace: true } )))
        .pipe(gulp.dest(config.path.dist + 'pages/'))
        .pipe(browserSync.reload({
            stream: true
        }));

    done();
});

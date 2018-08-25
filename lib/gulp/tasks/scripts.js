'use strict'

let gulp            = require('gulp'),
    notify          = require('gulp-notify'),
    gulpif          = require('gulp-if'),
    concat          = require('gulp-concat'),
    browserSync     = require('browser-sync'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    config          = require('../config');

gulp.task('scripts', (done) => {
    return gulp.src([
            config.path.src.js + 'css-classes.js',
            config.path.src.js + 'common.js',
            config.path.src.js + 'inputs.js',
            config.path.src.js + 'notify.js',
            config.path.src.js + 'chat.js'
        ])
        .pipe(concat('scripts.min.js'))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulp.dest(config.path.dist + 'js/'))
        .pipe(browserSync.reload({
            stream: true
        }));

    done();
});

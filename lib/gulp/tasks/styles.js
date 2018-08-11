'use strict'

let gulp            = require('gulp'),
    notify          = require('gulp-notify'),
    gulpif          = require('gulp-if'),
    sass            = require('gulp-sass'),
    cleancss        = require('gulp-clean-css'),
    concat          = require('gulp-concat'),
    autoprefixer    = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync'),
    rename          = require('gulp-rename'),
    config          = require('../config');

gulp.task('styles', (done) => {
    return gulp.src('client/sass/**/*.sass')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer(['> 1%', 'last 5 versions']))
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
        .pipe(gulp.dest(config.path.dist + 'css/'))
        .pipe(browserSync.stream());

    done();
});

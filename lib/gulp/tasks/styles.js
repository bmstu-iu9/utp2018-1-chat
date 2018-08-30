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
    gulp.src('client/scss/pages/auth.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer(['> 1%', 'last 5 versions']))
        .pipe(cleancss( {
            level: {
                1: {
                    removeEmpty: true,
                    specialComments: 0
                },
                2: {
                    mergeAdjacentRules: true,
                    mergeIntoShorthands: true,
                    mergeSemantically : true,
                    restructureRules: true,
                    removeDuplicateRules: true,
                }
            }
        }))
        .pipe(gulp.dest(config.path.dist + 'css/'))
        .pipe(browserSync.stream());

    gulp.src('client/scss/main.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer(['> 1%', 'last 5 versions']))
        .pipe(cleancss( {
            level: {
                1: {
                    removeEmpty: true,
                    specialComments: 0
                },
                2: {
                    mergeAdjacentRules: true,
                    mergeIntoShorthands: true,
                    mergeSemantically : true,
                    restructureRules: true,
                    removeDuplicateRules: true,
                }
            }
        }))
        .pipe(gulp.dest(config.path.dist + 'css/'))
        .pipe(browserSync.stream());

    gulp.src('client/scss/themes/dark.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer(['> 1%', 'last 5 versions']))
        .pipe(cleancss( {
            level: {
                1: {
                    removeEmpty: true,
                    specialComments: 0
                },
                2: {
                    mergeAdjacentRules: true,
                    mergeIntoShorthands: true,
                    mergeSemantically : true,
                    restructureRules: true,
                    removeDuplicateRules: true,
                }
            }
        }))
        .pipe(gulp.dest(config.path.dist + 'css/'))
        .pipe(browserSync.stream());

    gulp.src('client/scss/themes/dark-blue.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer(['> 1%', 'last 5 versions']))
        .pipe(cleancss( {
            level: {
                1: {
                    removeEmpty: true,
                    specialComments: 0
                },
                2: {
                    mergeAdjacentRules: true,
                    mergeIntoShorthands: true,
                    mergeSemantically : true,
                    restructureRules: true,
                    removeDuplicateRules: true,
                }
            }
        }))
        .pipe(gulp.dest(config.path.dist + 'css/'))
        .pipe(browserSync.stream());

    done();
});

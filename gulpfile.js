let gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require("gulp-notify"),
    browserSync = require('browser-sync');

gulp.task('styles', function() {
    return gulp.src('client/sass/**/*.sass')
    .pipe(sass({
        outputStyle: 'expanded'
    }).on("error", notify.onError()))
    .pipe(rename({ suffix: '.min', prefix : '' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleancss({
        level: { 1: { specialComments: 0 } }
    }))
    .pipe(gulp.dest('app/public/css'))
    .pipe(browserSync.stream())
});

gulp.task('js', function() {
    return gulp.src([
        'client/js/common.js',
    ])
    .pipe(concat('scripts.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('app/public/js'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('bsync', function() {
    browserSync({
        server: {
            baseDir: 'client'
        },
        notify: true,
        open: false,
        online: false,
        // tunnel: true,
        // tunnel: "gist"
    })
});

gulp.task('watch', ['styles', 'js', 'bsync'], function() {
    gulp.watch('client/sass/**/*.sass', ['styles']);
    gulp.watch(['client/js/common.js'], ['js']);
    gulp.watch('client/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);

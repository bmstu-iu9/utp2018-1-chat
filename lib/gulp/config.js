'use strict'

let path = {
    dist: './application/public/',
    src: {
        html: './client/pages/',
        styles: './client/sass/',
        js: './client/js/',
        img: './client/img/',
        media: './client/media/',
        fonts: './client/fonts/'
    },
    watch: {
        all: './client/**/*',
        html: './client/**/*.html',
        js: './client/js/**/*.js',
        styles: './client/scss/**/*.scss',
        img: './client/img/**/*.*'
    }
};

module.exports = {
    path
};

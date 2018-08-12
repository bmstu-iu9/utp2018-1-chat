'use strict'

let gulp          = require('gulp'),
    browserSync   = require('browser-sync'),
    notify        = require('gulp-notify'),
    nodemon       = require('gulp-nodemon');

gulp.task('nodemon', (done) => {
    var started = false;

    return nodemon({
        script: 'application/server.js'
    }).on('start', () => {
        if (!started) {
            done();
            started = true;
        }
    });

    done();
});

gulp.task('server', gulp.series('nodemon', (done) => {
    browserSync.init(null, {
        proxy: 'http://localhost:8080',
        files: ['application/public/**/*.*'],
        port: 8081,
        // open: true,      // Раскоментировать для автоматического открытия сайта в браузере
        // online: true,    // Раскоментировать эти три строчки для
        // tunnel: true,    // трансляции локального
        // tunnel: 'gist'   // сервера в web
	});

    done();
}));

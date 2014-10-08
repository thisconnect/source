'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var map = require('vinyl-map');

var base = __dirname + '/../';

gulp.task('sync:browser', ['script'], function(){

    browserSync({
        files: [base + 'index.html', base + 'build/*.css'],
        proxy: {
            host: 'http://localhost:8004'
        },
        port: 8003,
        ghostMode: {
            clicks: false,
            location: true,
            forms: false,
            scroll: true
        },
        logLevel: 'debug',
        logConnections: true,
        online: false,
        notify: false,
        injectChanges: true
    });

});

gulp.task('sync:reload', ['script'], function(){
    browserSync.reload();
});

gulp.task('sync:inject', ['style'], function(){
    var inject = map(function (buff, filename){
        console.log(filename);
        // browserSync.reload('../build/styles.min.css');
    });

    return gulp.src(['build/styles.min.css'], {
            'cwd': base
        })
        .pipe(inject);
});

gulp.task('sync:watch', function(){
    gulp.watch('scripts/*', { 'cwd': base }, ['script', 'sync:reload']);
    gulp.watch('styles/*', { 'cwd': base }, ['style', 'sync:inject']);
});

gulp.task('sync', ['sync:browser', 'sync:watch']);

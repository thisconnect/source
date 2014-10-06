'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');

gulp.task('script:build', function(){

     return gulp.src([
            'widget.js', 'controller.js', 'controller.object.js',
            'controller.array.js', 'controller.collection.js',
            'controller.boolean.js', 'controller.number.js',
            'controller.float.js', 'controller.string.js',
            'controller.enum.js', 'socket.js', 'schema.js',
            'interface.js', 'monitor.js'
        ], {
            'cwd': __dirname + '/../scripts/'
        })
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build', {
            'cwd': __dirname + '/../'
        }))
        .pipe(notify({
            'message': 'build complete'
        }));

});

gulp.task('script:compress', ['script:build'], function(){

    return gulp.src('main.js', {
            'cwd': __dirname + '/../build/'
        })
        .pipe(uglify({
            compress:{
                'drop_console': true
            }
        }))
        .pipe(rename({ 'extname': '.min.js' }))
        .pipe(gulp.dest('build', {
            'cwd': __dirname + '/../'
        }));

});

gulp.task('script', ['script:build', 'script:compress']);

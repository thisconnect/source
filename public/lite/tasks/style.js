'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var CleanCSS = require('clean-css');
var map = require('vinyl-map');

var base = __dirname + '/../';

gulp.task('style:build', function(){

    return gulp.src(['normalize.css', 'lite.css'], {
            'cwd': base + 'styles/'
        })
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('build', {
            'cwd': base
        }));
});

gulp.task('style:compress', ['style:build'], function(){
    var minify = map(function (buff, filename){
        return new CleanCSS({
            'keepBreaks': true
        }).minify(buff.toString());
    });

    return gulp.src(['styles.css'], {
            'cwd': base + 'build/'
        })
        .pipe(minify)
        .pipe(rename({
            'extname': '.min.css'
        }))
        .pipe(gulp.dest('build', {
            'cwd': base
        }));
});

gulp.task('style', ['style:build', 'style:compress']);

'use strict';

var gulp = require('gulp'),
    del = require('del');

gulp.task('clean', function(done){
    del(__dirname + '/../build/', done);
});

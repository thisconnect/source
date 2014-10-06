var gulp = require('gulp');

require('./tasks/clean');
require('./tasks/script');
require('./tasks/style');
require('./tasks/sync');

gulp.task('done', ['clean', 'style', 'script'], function(done){
    done();
});

gulp.task('default', ['clean', 'style', 'script', 'sync']);

module.exports = gulp;

var gulp = require('gulp');

require('./tasks/server');

require('./public/lite/gulpfile');

gulp.task('default', ['server', 'style', 'script', 'sync']);

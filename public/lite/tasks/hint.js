var gulp = require('gulp');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');

gulp.task('hint', function(){

    return gulp.src('scripts/*.js', {
            'cwd': __dirname + '/../'
        })
        .pipe(jshint(__dirname + '/../.jshintrc'))
        .pipe(notify(function(file){
            if (file.jshint.success) return false;

            var errors = file.jshint.results.map(function(data){
                if (data.error) return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
            });

            return file.relative + ' (' + errors.length + ' errors)\n' + errors.join('\n');
        }));

});

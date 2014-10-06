var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('server', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        ignore: ['.git', 'node_modules', 'public', 'test'],
        env: {
            NODE_ENV: 'development'
        }
    })
    .on('start', function(){
        console.log('nodemon started!!');
    })
//    .on('change', ['hint'])
    .on('restart', function(){
        console.log('restarted YEAH!__!!_');
    });
});

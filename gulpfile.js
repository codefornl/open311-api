var gulp = require('gulp'),
  dependencies = require('gulp-dependency-install');

var dirs = {
    serverbuild: "./build",
    serversrc: "./src"
};

gulp.task('build',function(){
    gulp.src(dirs.serversrc+'/**/*')
        .pipe(gulp.dest(dirs.serverbuild+'/'));
    return dependencies.install([dirs.serverbuild]);
});

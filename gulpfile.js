var gulp = require('gulp');
var less = require('gulp-less');
var include = require("gulp-include");
var install = require("gulp-install");

var spawn = require('child_process').spawn;
var path = require('path');

var node;

var dirs = {
    clientbuild: "./build/public",
    clientsrc: "./src/client",
    serverbuild: "./build",
    serversrc: "./src/server"
};


/*High level tasks*/
gulp.task('default', ['run']);
gulp.task('build', ['client', 'server']);

//automagically re-build and run
gulp.task('develop', function() {
    gulp.start(['build','run']);
    gulp.watch(dirs.serversrc + '/**/*', ['server', 'run']);
    gulp.watch(dirs.clientsrc + '/**/*', ['client']);
});

//run node, if it's already running
gulp.task('run', function() {
    if (node) node.kill();
    node = spawn('node', [dirs.serverbuild+'/index.js'], {stdio: 'inherit'});
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

//kill node on exit
process.on('exit', function() {
    if (node) node.kill();
});

/*Build server*/
gulp.task('server', ['copy_server' ,'install_npm']);

gulp.task('copy_server',function(){
    return gulp.src(dirs.serversrc+'/**/*')
        .pipe(gulp.dest(dirs.serverbuild+'/'));
});

gulp.task('install_npm',function(){
    return gulp.src([dirs.serverbuild+'/package.json'])
        .pipe(install());
});

/* Build client */
gulp.task('client', ['js', 'less', 'html', 'static']);
//concatenate all js files into one
gulp.task('js', function(){
    return gulp.src(dirs.clientsrc+'/js/**/*.js')
        .pipe(gulp.dest(dirs.clientbuild+'/js'));
});
// gulp.task('js', function(){
//     return gulp.src(dirs.clientsrc+'/js/App.js')
//         .pipe(include())
//             .on('error', console.log)
//         .pipe(gulp.dest(dirs.clientbuild+'/js'));
// });

//compile Less files to Css
gulp.task('less', function () {
    return gulp.src(dirs.clientsrc+'/style/style.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(dirs.clientbuild+'/style'));
});

//simply copy html and static files
gulp.task('html', function(){
    return gulp.src(dirs.clientsrc+'/*.html')
        .pipe(gulp.dest(dirs.clientbuild+'/'));
});

gulp.task('static', function(){
    return gulp.src(dirs.clientsrc+'/static/*')
        .pipe(gulp.dest(dirs.clientbuild+'/static'));
});

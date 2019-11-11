const { src, dest, watch } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass'); 
const inject = require('gulp-inject');

function buildTasks(cb){
    copyFile();
    concatJs();
    injectInHtml();
    compileSass();

    cb();
}

function copyFile() {
    src('src/index.html')
        .pipe(dest('dist/'));
}

function concatJs(){
    src('src/js/*.js')
        .pipe(concat('index.js'))
        .pipe(dest('dist/'));
}

function compileSass() {
    src('src/assets/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/'));
}

function injectInHtml(){
    src('src/index.html')
        .pipe(inject(src(['./dist/index.js', './dist/main.css'], {read:false})))
        .pipe(dest('dist/'));
}

function watchChanges() {
    watch('src/**/*.*', {}, function (cb){
        copyFile();
        concatJs();        
        compileSass();
        injectInHtml();

        cb();
    })
}


module.exports.build = buildTasks;
module.exports.dev = watchChanges;